import React, { Component } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import APIAccess from '../api/api-access'

//TODO add picture

class MasterForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentStep: 1,
      name: '',
      description: '',
      dishTypes: '',
      cuisines: '',
      servings: 0,
      ingredients: [],
      instructions: [],
      vegan: false,
      picture: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.receiveArray = this.receiveArray.bind(this)
    this._next = this._next.bind(this)
    this._prev = this._prev.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.apiEndpoints = new APIAccess();
  }

  capitalizeData(str) {
    let arr = str.split(" ");
    for (let i = 0; i < arr.length; i += 1) {
        arr[i] = arr[i][0].toUpperCase() + arr[i].substr(1);
    }
    return arr.join(" ");
  }

  // componentDidMount() {
  //   if (this.props.recipe !== null && this.props.recipe !== undefined) {
  //     let {name, description, dishTypes, cuisines, servings, ingredients, instructions, vegan} = this.props.recipe;
      
  //     // normalize dishTypes and cuisines string to uppercase initials
  //     if (typeof (dishTypes) === 'object' && dishTypes.length !== 0) {
  //       let firstDishType = dishTypes[0];
  //       dishTypes = this.capitalizeData(firstDishType);
  //     }
  //     if (typeof (cuisines) === 'object' && cuisines.length !== 0) {
  //       let firstCuisine = cuisines[0];
  //       cuisines = this.capitalizeData(firstCuisine);
  //     }
  //     this.setState({currentStep: 1, name, description, dishTypes, cuisines, servings, ingredients, instructions, vegan}, () => console.log('meu log', this.state));
  //   }
  // }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  receiveArray(obj) {
    const {name, values} = obj
    this.setState({
      [name]: values
    })
  }
  
  handleSubmit (event) {
    event.preventDefault();
    const { name, description, dishTypes, cuisines, servings, ingredients, instructions, vegan, picture } = this.state;
    let totalTimeMinutes = ingredients.reduce((acc, item) => acc + item.timeMinutes, 0);
    let owner = this.props.allData.loggedInUser._id;

    this.apiEndpoints.addNewRecipe(owner, name, description, ingredients, dishTypes, vegan, cuisines, totalTimeMinutes, servings, instructions, picture)
    .then(response => {
      console.log(response);
      this.props.history.push(`/recipe/${response.newRecipe._id}`)
    })
    .catch(err => console.log(err));

  }

  handleFileUpload (event) {
    const uploadData = new FormData();
    uploadData.append("imageUrl", event.target.files[0]);
    console.log('hi!', event.target.files)
    this.apiEndpoints.handleUpload(uploadData)
    .then(response => {
        this.setState({ picture: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }

  _next() {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 3 ? 4 : currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }
    
  _prev() {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1 ? 1 : currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

  // The "next" and "previous" button functions
  get previousButton(){
    let currentStep = this.state.currentStep;
    if(currentStep !== 1){
      return (
        <button 
          className="btn btn-secondary" 
          type="button" onClick={this._prev}>
        Previous
        </button>
      )
    }
    return null;
  }

  get nextButton(){
    let currentStep = this.state.currentStep;
    if(currentStep < 4){
      return (
        <button 
          className="btn btn-primary float-right" 
          type="button" onClick={this._next}>
        Next
        </button>        
      )
    }
    return null;
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <Step1 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          name={this.state.name}
          description={this.state.description}
        />
        <Step2 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          dishTypes={this.state.dishTypes}
          cuisines={this.state.cuisines}
          servings={this.state.servings}
          allData={this.props.allData}
        />
        <Step3 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          passIngredients={this.receiveArray}
          ingredients={this.state.ingredients}
          vegan={this.state.vegan}
        />
        <Step4
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          passInstructions={this.receiveArray}
          instructions={this.state.instructions}
          picture={this.state.picture}
          handleFileUpload={this.handleFileUpload}
        />
        {this.previousButton}
        {this.nextButton}
        {this.state.currentStep === 4 && <button type="submit" className="btn btn-primary">Submit Recipe</button>}
      </form>
    )
  }
}

export default MasterForm;