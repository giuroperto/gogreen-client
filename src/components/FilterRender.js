import React, { Component } from "react";

class FilterRender extends Component {
  constructor(props) {
    super(props);
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
                <select className='form-control'>
                  <option selected="selected"></option>
                  {this.props.allData.dishTypesArr.sort().map(dishType => {
                    return <option> {dishType} </option>;
                  })}
                </select>
              </div>

              <div class="col-sm">
                <h3>By Cousine</h3>
                <select className='form-control'>
                  <option selected="selected"></option>
                  {this.props.allData.cuisinesArr.sort().map(cuisinesType => {
                    return <option> {cuisinesType} </option>;
                  })}
                </select>
              </div>

              <div class="col-sm">
                <h3>Cooking Level</h3>
                <select className='form-control'>
                  <option selected="selected"></option>
                  {this.props.allData.difficultLevelArr.map(level => {
                    return <option> {level} </option>;
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
