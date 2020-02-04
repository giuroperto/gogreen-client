import React, { Component } from "react";

class FilterRender extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchDishType: '',
      searchCuisine: '',
      searchCookingLevel: '',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });

    this.props.getFilters(name, value);
  }

  render() {

    return (
      <div className="filter-render">
        <div>
          <h2>Advanced Filters</h2>
          <div class="container">
            <div class="row">
              <div class="col-sm">
                <h3>By Dish Type</h3>
                <select name="searchDishType" className='form-control' onChange={this.handleChange}>
                  <option selected="selected"></option>
                  {this.props.allData.dishTypesArr.sort().map(dishType => {
                    return <option value={dishType}> {dishType} </option>;
                  })}
                </select>
              </div>

              <div class="col-sm">
                <h3>By Cousine</h3>
                <select name="searchCuisine" className='form-control' onChange={this.handleChange}>
                  <option selected="selected"></option>
                  {this.props.allData.cuisinesArr.sort().map(cuisinesType => {
                    return <option value={cuisinesType}> {cuisinesType} </option>;
                  })}
                </select>
              </div>

              <div class="col-sm">
                <h3>Cooking Level</h3>
                <select name="searchCookingLevel" className='form-control' onChange={this.handleChange}>
                  <option selected="selected"></option>
                  {this.props.allData.difficultLevelArr.map(level => {
                    return <option value={level}> {level} </option>;
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FilterRender;

//TODO handle changes, so when we select an option from the list it will be saved in the state and we can render the AllRecipes page using this filter -> APP.js