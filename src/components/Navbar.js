import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchButtons from "./SearchButtons";
import FilterRender from "./FilterRender";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFilterRender: false
    };
    this.filterRender = this.filterRender.bind(this);
  }

  filterRender() {
    this.setState({
      showFilterRender: !this.state.showFilterRender
    });
  }

  render() {
    console.log("yesss");
    return (
      <div className="nav-container">
        <nav className="navbar navbar-expand-lg navbar-light my-1">
          <a className="navbar-brand" href="#">
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

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Why GoGreen?
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About Us
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">
                  Login
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">
                  Sign Up
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <div className="split-container d-flex justify-content-center">
          <div className="split-bar"></div>
        </div>

        <nav className="navbar navbar-light second-navbar d-flex justify-content-start align-items-center mt-1">
          <div className="second-nav-icon-div d-flex align-items-center">
            <a href="#" className="nav-icon-container">
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
        <div>{this.state.showFilterRender && <FilterRender allData={this.props.allData}/>}</div>
      </div>
    );
  }
}

export default Navbar;
