import React, { Component } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Message from '../Message';
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
      servings: 1,
      ingredients: [],
      instructions: [],
      vegan: false,
      picture: '',
      pictureName: '',
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

  redirectPage(success, recipeID) {
    if (success) {
      this.props.history.push(`/recipe/${recipeID}`);
    }
  }
  
  handleSubmit (event) {
    event.preventDefault();
    const { name, description, dishTypes, cuisines, servings, ingredients, instructions, vegan, picture } = this.state;
    let totalTimeMinutes = instructions.reduce((acc, item) => acc + parseInt(item.stepTimeMinutes), 0);
    instructions.map(item => item.stepTimeMinutes = parseInt(item.stepTimeMinutes))
    let owner = this.props.allData.loggedInUser._id;
    let dishTypesArr = [dishTypes];
    let cuisinesArr = [cuisines];
    this.apiEndpoints.addNewRecipe(owner, name, description, ingredients, dishTypesArr, vegan, cuisinesArr, totalTimeMinutes, servings, instructions, picture)
    .then(response => {
      const recipeID = response.data.newRecipe._id;
      this.props.getMessage(response.status, response.data.message);
      this.redirectPage(this.props.successMessage, recipeID);
    })
    .catch(err => console.log(err));

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
          className="btn btn-secondary float-left" 
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
          className="btn btn-secondary float-right" 
          type="button" onClick={this._next}>
        Next
        </button>        
      )
    }
    return null;
  }

  render() {
    return(
      <div className="w-50 py-5">
      {
        this.props.message && <Message successMessage={this.props.successMessage} message={this.props.message}/>
      }
        <h2 className="mb-4">Add Recipe</h2>
        <form className="my-5" onSubmit={this.handleSubmit}>
          <Step1 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            name={this.state.name}
            description={this.state.description}
            handleFileUpload={this.handleFileUpload}
            picture={this.state.picture}
            pictureName={this.state.pictureName}
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
          />
          {this.previousButton}
          {this.nextButton}
          {this.state.currentStep === 4 && <button type="submit" className="btn btn-primary float-right">Submit Recipe</button>}
        </form>
      </div>
    )
  }
}

export default MasterForm;