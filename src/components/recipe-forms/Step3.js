import React, {Component} from 'react';

// ingredients + is vegan?

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputNumber: 3,
      ingredients: {
        name: "ingredients",
        values: []
      }
    }
    this.addInput = this.addInput.bind(this);
    // this.removeInput = this.removeInput.bind(this);
    this.renderInputs = this.renderInputs.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.ingredients.length !== 0) {
      this.setState({
        inputNumber: 3,
        ingredients: {
          name: "ingredients",
          values: this.props.ingredients
      }
      })
    }
  }

  addInput() {
    this.setState({
      inputNumber: this.state.inputNumber + 1
    })
  }

  renderInputs() {
    let inputs = [];
    for (let i = 0; i < this.state.inputNumber; i += 1) {
      let inputName = 'ingredient' + i;
      inputs.push({ key: i, name: inputName })
    }
    return inputs;
  }

  handleChange(event) {
    const { value } = event.target;
    const myKey = event.target.dataset.key;
    let ingredientsCopy = [...this.state.ingredients.values];
    ingredientsCopy[myKey] = value;
    this.setState({
      ingredients: {
        name: 'ingredients',
        values: ingredientsCopy
      }
    }, this.handleIngredients)
  }

  handleIngredients() {
    this.props.passIngredients(this.state.ingredients);
  }

  render() {
    if (this.props.currentStep !== 3) {
      return null;
    }
    
    return(
      <>
      <div className="form-group">
        <label htmlFor="ingredients">What <strong>ingredients</strong> will be used?</label>
        {this.renderInputs().map(input => {
          if (input.key === this.state.inputNumber -1) {
            return (
            <div class="input-group mb-3">
              <input
            key={input.key}
            data-key={input.key}
            className="form-control"
            type="text"
            name={input.inputName}
            value={this.state.ingredients.values[input.key]}
            onChange={this.handleChange}/>
              <div class="input-group-append">
              <button 
                className="btn btn-secondary"
                type="button" onClick={this.addInput}>+</button>
              </div>
            </div>)
          }
          return (<input
            key={input.key}
            data-key={input.key}
            className="form-control mb-3"
            type="text"
            name={input.inputName}
            value={this.state.ingredients.values[input.key]}
            onChange={this.handleChange}/>)
        })}
      </div>
      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="vegan"
          checked={this.props.vegan}
          name="vegan"
          onChange={this.props.handleChange}/>
        <label className="form-check-label" htmlFor="vegan">This is a <strong>vegan</strong> recipe</label>
      </div>
      </>
    )
  }
}

export default Step3;