import React, { Component } from "react";
import { Link} from 'react-router-dom';

class SearchButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchWord: '',
    }

    this.clickOnFilter = this.clickOnFilter.bind(this);
    this.handleChange = this.handleChange.bind(this);

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

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="search-bar-container">
        {/* created form to deal with submit */}
          <form className="search-bar-container" onSubmit={this.handleSubmit}>
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
            <Link to="/allrecipes">
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchButtons;
