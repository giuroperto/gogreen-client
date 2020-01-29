import React, {Component} from 'react';

// dish types + cuisines + servings


class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishTypesArr: ["Main Course", "Side Dish", "Dessert", "Appetizer", "Salad", "Bread", "Breakfast", "Soup", "Beverage", "Sauce", "Marinade", "Fingerfood", "Snack", "Drink"],
      cuisinesArr: ["African", "American", "British", "Cajun", "Caribbean", "Chinese", "Eastern European", "European", "French", "German", "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean", "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"]
    }
  }

  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }
    
    return(
      <>
      <div className="form-group">
        <label htmlFor="dishTypes">What <strong>dish type</strong> is your recipe?</label>
        <select value={this.props.dishTypes} onChange={this.props.handleChange} class="custom-select">
          <option value=''>Choose a dish type</option>
          {this.state.dishTypesArr.map(dishType => <option value={dishType}>{dishType}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="cuisines">Your recipe belongs to which <strong>cuisine</strong>?</label>
        <select value={this.props.cuisine} onChange={this.props.handleChange} class="custom-select">
          <option value=''>Choose a cuisine</option>
          {this.state.cuisinesArr.map(cuisine => <option value={cuisine}>{cuisine}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="servings">How many <strong>servings</strong> is your recipe?</label>
        <input className="form-control" type="number" value={this.props.servings} onChange={this.props.handleChange}/>
      </div>
      </>
    )
  }
}

export default Step2;