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
      <div className="search-button">
        <form className="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            onClick={this.clickOnFilter}
          >
            +
          </button>
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            onClick={this.clickOnSearchButton}
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default SearchButtons;
