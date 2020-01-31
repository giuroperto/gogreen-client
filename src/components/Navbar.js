import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchButtons from "./SearchButtons";
import FilterRender from "./FilterRender";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFilterRender: false,
      loggedInUser: null
    };
    this.filterRender = this.filterRender.bind(this);
  }

  filterRender() {
    this.setState({
      showFilterRender: !this.state.showFilterRender
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.loggedInUser !== prevProps.loggedInUser) {
      this.setState({ loggedInUser: this.props.loggedInUser });
    }
  }

  render() {
    console.log("yesss");
    return (
      <div className="nav-container">
        <nav className="navbar navbar-expand-lg navbar-light my-1">
          <a className="navbar-brand" href="/">
            GoGreen
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
            <div className='d-flex flex-direction-start'>
              <a className="nav-navbar nav-link" href="/login">
                Why GoGreen?
              </a>
              <a className="nav-navbar nav-link" href="/login">
                About Us
              </a>
            </div>

            <div className='d-flex flex-direction-end'>
              <a className="nav-navbar nav-link" href="/signup">
                Sign Up
              </a>
              <a className="nav-navbar nav-link" href="/login">
                Login
              </a>
            </div>
          </div>
        </nav>

        <div className="split-container d-flex justify-content-center">
          <div className="split-bar"></div>
        </div>

        <nav className="navbar navbar-light second-navbar d-flex justify-content-start align-items-center mt-1">
          <div className="second-nav-icon-div d-flex align-items-center">
            <a href="/allrecipes" className="nav-icon-container">
              <img src="./images/cook-book.png" alt="book-icon" />
              <p>All Recipes</p>
            </a>

            <a href="#" className="nav-icon-container">
              <img src="./images/vegetables-icon.png" alt="vegetables-icon" />
              <p>Vegan</p>
            </a>

            <a href="#" className="nav-icon-container">
              <img src="./images/vegetarian-icon.png" alt="vegetarian-icon" />
              <p>Vegetarian</p>
            </a>

            <SearchButtons showFilter={this.filterRender} />
          </div>
        </nav>
        <div>
          {this.state.showFilterRender && (
            <FilterRender allData={this.props.allData} />
          )}
        </div>
      </div>
    );
  }
}

export default Navbar;
