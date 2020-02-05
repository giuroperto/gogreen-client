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
      <div className="filter-render text-white">
        <div className="mt-2 mb-2">
          <p><b>Advanced Filters</b></p>
            <div className="container-fluid row d-flex flex-row align-content-center m-0 p-0">
              <div className="col-xs-4 col-sm-4 d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-center align-items-center nav-icon-container mb-2">
                  <img className="mr-2" src="https://res.cloudinary.com/dxatyucj2/image/upload/v1580900036/go-green/book2_t5vazt.png" alt="book-icon" />
                  <p className="text-nowrap">By Dish Type</p>
                </div>
                <div>
                  <select name="searchDishType" className='form-control' onChange={this.handleChange}>
                    <option selected="selected"></option>
                    {this.props.allData.dishTypesArr.sort().map(dishType => {
                      return <option value={dishType}> {dishType} </option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="col-xs-4 col-sm-4 d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-center align-items-center nav-icon-container mb-2">
                  <img className="mr-2" src="https://res.cloudinary.com/dxatyucj2/image/upload/v1580900036/go-green/book2_t5vazt.png" alt="book-icon" />
                  <p className="text-nowrap">By Cuisine</p>
                </div>
                <div>
                  <select name="searchCuisine" className='form-control' onChange={this.handleChange}>
                    <option selected="selected"></option>
                    {this.props.allData.cuisinesArr.sort().map(cuisinesType => {
                      return <option value={cuisinesType}> {cuisinesType} </option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="col-xs-4 col-sm-4 d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-center align-items-center nav-icon-container mb-2">
                  <img className="mr-2" src="https://res.cloudinary.com/dxatyucj2/image/upload/v1580900036/go-green/book2_t5vazt.png" alt="book-icon" />
                  <p className="text-nowrap">By Difficulty</p>
                </div>
                <div>
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