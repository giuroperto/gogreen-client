import React, { Component } from "react";


class SearchButtons extends Component {
  constructor(props) {
    super(props);

    this.clickOnSearchButton = this.clickOnSearchButton.bind(this);
    this.clickOnFilter = this.clickOnFilter.bind(this);

  }

  //Click on Search button to Search
  clickOnSearchButton(event) {
    event.preventDefault();
    console.log("Search Clicked");
  }

  //Click on Filter button to open filters
  clickOnFilter(event){
    event.preventDefault();
    console.log('Filter Clicked')
    this.props.showFilter();
  }

  render() {
    return (
      <div>

  <div className="search-bar-container">
   <input 
    type="search"
    placeholder='Search by recipe or ingredient'
   />
   <button type="submit" onClick={this.clickOnFilter}>
    <i className="fas fa-filter"></i>
   </button>
   <button type="submit" onClick={this.clickOnSearchButton}>
    <i className="fas fa-search"></i>
   </button>
  </div>

      </div>
    );
  }
}

export default SearchButtons;
