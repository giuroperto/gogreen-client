import React, { Component } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

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
      difficulty: '',
      isVegan: false,
      // picture: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.receiveArray = this.receiveArray.bind(this)
    this._next = this._next.bind(this)
    this._prev = this._prev.bind(this)
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
  
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    const { name, description, dishTypes, cuisines, servings, ingredients, instructions, isVegan } = this.state;
    //TODO axios post
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
          isVegan={this.state.isVegan}
        />
        <Step4
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          passInstructions={this.receiveArray}
          instructions={this.state.instructions}
          difficulty={this.state.difficulty}
        />
        {this.previousButton}
        {this.nextButton}
        {this.state.currentStep === 4 && <button type="submit">Submit Recipe</button>}
      </form>
    )
  }
}

export default MasterForm;