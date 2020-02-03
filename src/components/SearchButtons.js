import React, { Component } from "react";


class SearchButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchWord: '',
    }

    this.clickOnSearchButton = this.clickOnSearchButton.bind(this);
    this.clickOnFilter = this.clickOnFilter.bind(this);
    this.handleChange = this.handleChange.bind(this);

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

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
    this.props.getSearchWord(value);
  }

  render() {
    console.log(this.state)
    return (
      <div>

        <div className="search-bar-container">
        {/* created form to deal with submit */}
          <form className="search-bar-container">
            <input 
              type="search"
              name="searchWord"
              placeholder='Search by recipe or ingredient'
              value={this.state.searchWord}
              onChange={this.handleChange}
            />
            <button onClick={this.clickOnFilter}>
              <i className="fas fa-filter"></i>
            </button>
            <button type="submit" onClick={this.clickOnSearchButton}>
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>

      </div>
    );
  }
}

export default SearchButtons;
