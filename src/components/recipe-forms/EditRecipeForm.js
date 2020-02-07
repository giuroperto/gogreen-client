import React, { Component } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import APIAccess from '../api/api-access'
import {Link} from 'react-router-dom';

class EditRecipeForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      description: '',
      dishTypes: '',
      cuisines: '',
      servings: 0,
      ingredients: [],
      instructions: [
        {
          step: 1,
          text: '',
          stepTimeMinutes: 0,
        },
        {
          step: 2,
          text: '',
          stepTimeMinutes: 0,
        },
        {
          step: 3,
          text: '',
          stepTimeMinutes: 0,
        }],
      vegan: false,
      picture: '',
      pictureName: '',
      ingredientsInputs: 1,
      instructionsInputs: 3,
      loader: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.apiEndpoints = new APIAccess();
    this.renderIngredientsInputs = this.renderIngredientsInputs.bind(this);
    this.renderInstructionsInputs = this.renderInstructionsInputs.bind(this);
    this.addInput = this.addInput.bind(this);
    this.handleInstructionsChange = this.handleInstructionsChange.bind(this);
  }

  capitalizeData(str) {
    let arr = str.split(" ");
    for (let i = 0; i < arr.length; i += 1) {
        arr[i] = arr[i][0].toUpperCase() + arr[i].substr(1);
    }
    return arr.join(" ");
  }

  componentDidMount() {
    if (this.props.recipe !== null && this.props.recipe !== undefined) {
      let {name, description, dishTypes, cuisines, servings, ingredients, instructions, vegan, picture} = this.props.recipe;

      let givenIngredients = [];
      if (ingredients === undefined){
      } else if (ingredients.length === 1) {
        givenIngredients = ingredients[0].split("\n");
        let removed = givenIngredients.splice(givenIngredients.length -1 ,1);
      } else {
        givenIngredients = ingredients
      }


      let ingredientsInputs = givenIngredients.length;
      let instructionsInputs = instructions.length;

      // normalize dishTypes and cuisines string to uppercase initials
      if (typeof (dishTypes) === 'object' && dishTypes.length !== 0) {
        let firstDishType = dishTypes[0];
        dishTypes = this.capitalizeData(firstDishType);
      }
      if (typeof (cuisines) === 'object' && cuisines.length !== 0) {
        let firstCuisine = cuisines[0];
        cuisines = this.capitalizeData(firstCuisine);
      }
      this.setState({name, description, dishTypes, cuisines, servings, ingredients: givenIngredients, instructions, vegan, ingredientsInputs, instructionsInputs, picture}, () => console.log('Inputs Set'));
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (name.includes('ingredient')) {
      const myKey = event.target.dataset.key;
      let ingredientsCopy = [...this.state.ingredients];
      ingredientsCopy[myKey] = value;
      this.setState({
        ingredients: ingredientsCopy
      })
    } else {
      this.setState({
        [name]: value
      });
    }
  }

  
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({loader: true});
    const { name, description, dishTypes, cuisines, servings, ingredients, instructions, vegan, picture } = this.state;
    let totalstepTimeMinutes = instructions.reduce((acc, item) => acc + parseInt(item.stepTimeMinutes), 0);
    instructions.map(item => item.stepTimeMinutes = parseInt(item.stepTimeMinutes))
    let owner = this.props.allData.loggedInUser._id;
    let recipeID = this.props.recipe._id;
    let dishTypesArr = [dishTypes];
    let cuisinesArr = [cuisines];

    this.apiEndpoints.editRecipe(recipeID, name, description, ingredients, dishTypesArr, vegan, cuisinesArr, totalstepTimeMinutes, servings, instructions, picture)
    .then(() => {
      this.props.history.push(`/recipe/${recipeID}`);
      this.setState({
        loader: false,
      })
    })
    .catch(err => console.log(err));
  }

  renderIngredientsInputs() {
    let inputs = [];
    for (let i = 0; i < this.state.ingredientsInputs; i += 1) {
      let inputName = 'ingredient' + i;
      inputs.push({ key: i, name: inputName })
    }
    return inputs;
  }

  renderInstructionsInputs() {
    let inputs = [];
    for (let i = 0; i < this.state.instructionsInputs; i += 1) {
      inputs.push({ key: i, textName: 'instruction' + i, timeName: 'stepTimeMinutes' + i })
    }
    return inputs;
  }

  addInput(field) {
    if (field === "ing") {
      this.setState({
        ingredientsInputs: this.state.ingredientsInputs + 1
      })
    } else if (field === "inst") {
      let newNumber = this.state.instructionsInputs + 1
      let index = this.state.instructionsInputs;
      let instructionsCopy = [...this.state.instructions];
      
      instructionsCopy[index] = {
        step: index,
        text: '',
        stepTimeMinutes: 0,
      };

      this.setState({
        instructions: instructionsCopy,
        instructionsInputs: newNumber,
      })
    } 
  }

  handleInstructionsChange(event) {
    const { value, name } = event.target;
    const myKey = event.target.dataset.key;
    let instructionsValuesCopy = [...this.state.instructions];
    instructionsValuesCopy[myKey] = {...instructionsValuesCopy[myKey]}

    if (name.includes('instruction')) {
      instructionsValuesCopy[myKey].text = value;
      this.setState({
        instructions: instructionsValuesCopy
      });
    } else if (name.includes('step')) {
      instructionsValuesCopy[myKey].stepTimeMinutes = value;
      this.setState({
        instructions: instructionsValuesCopy
      });
    }
  }

  handleFileUpload (event) {
    const uploadData = new FormData();
    let { name } = event.target.files[0];
    uploadData.append("imageUrl", event.target.files[0]);
    this.apiEndpoints.handleUpload(uploadData)
    .then(response => {
        this.setState({ picture: response.data.secure_url, pictureName: name });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }


  render() {
    return(
      <form onSubmit={this.handleSubmit} className="edit-recipe-form mb-5">
        <h3 className="pb-2 title-edit-profile">Edit Recipe</h3>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            id="name"
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            className="form-control"
            id="description"
            name="description"
            type="text"
            value={this.state.description}
            onChange={this.handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="file">Replace picture</label>
          <div className="input-group d-flex flex-column">
            <div className="custom-file">
              <input type="file" className="form-control-file custom-file-input" id="file" name="file" onChange={this.handleFileUpload}/>
              <label className="custom-file-label img-name" forHtml="file"> {this.state.pictureName ? this.state.pictureName : 'Choose file...'} </label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="dishTypes">Dish Type</label>
          <select value={this.state.dishTypes} name="dishTypes" onChange={this.handleChange} multiple={false} className="custom-select">
            <option value=''>Choose a dish type</option>
            {this.props.allData.dishTypesArr.map((dishType, idx) => <option key={idx} value={dishType}>{dishType}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="cuisines">Cuisine</label>
          <select value={this.state.cuisines} name="cuisines" onChange={this.handleChange} multiple={false} className="custom-select">
            <option value=''>Choose a cuisine</option>
            {this.props.allData.cuisinesArr.map((cuisine, idx) => <option key={idx} value={cuisine}>{cuisine}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="servings">Servings</label>
          <input className="form-control" type="number" name="servings" required value={this.state.servings} min="1" onChange={this.handleChange}/>
        </div>
        
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients</label>
          {this.renderIngredientsInputs().map(input => {
          if (input.key === this.state.ingredientsInputs -1) {
            return (
            <div class="input-group mb-3">
              <input
            key={input.key}
            data-key={input.key}
            className="form-control"
            type="text"
            name={input.inputName}
            value={this.state.ingredients[input.key]}
            onChange={this.handleChange}/>
              <div class="input-group-append">
              <button 
                className="btn btn-secondary"
                type="button" onClick={() => this.addInput('ing')}>+</button>
              </div>
            </div>)
          }
          return (<input
            key={input.key}
            data-key={input.key}
            className="form-control mb-3"
            type="text"
            name={input.inputName}
            value={this.state.ingredients[input.key]}
            onChange={this.handleChange}/>)
        })}
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="vegan"
            checked={this.state.vegan}
            name="vegan"
            onChange={this.handleChange}/>
          <label className="form-check-label" htmlFor="vegan">This is a vegan recipe</label>
        </div>
       
        <div className="form-group d-flex flex-column">
          <label htmlFor="instructions">Instructions</label>
          {this.renderInstructionsInputs().map(input => (
            <div key={input.key} className="form-row">
              <div className="col-md-9 mb-3">
                <label>Step {input.key + 1}</label>
                <input key={input.key} data-key={input.key} required className="form-control" type="text" name={input.textName} value={this.state.instructions[input.key].text} onChange={this.handleInstructionsChange}/>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="time">Time (minutes)</label>
                <input key={input.key} data-key={input.key} className="form-control" type="number" min="0" name={input.timeName} value={this.state.instructions[input.key].stepTimeMinutes} onChange={this.handleInstructionsChange}/>
              </div>
            </div>
          ))}
          <div className="align-self-end">
            <button 
              className="btn btn-secondary"
              type="button" onClick={() => this.addInput('inst')}>+</button>
          </div>
        </div>

        <div className='d-flex justify-content-between mt-5'>
          <div className="delete-button">
              <Link to={`/recipe/${this.props.match.params.recipeID}/delete`}>
                <button type="button" class="btn btn-danger">
                    Delete Recipe
                </button>
              </Link>
          </div>
          <div className="submit-button">
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
          <div className="cancel-button">
              <Link to={`/recipe/${this.props.match.params.recipeID}`}>
                <button type="button" class="btn btn-warning">
                    Cancel
                </button>
              </Link>
          </div>
        </div>
      </form>
    )
  }
}

export default EditRecipeForm;