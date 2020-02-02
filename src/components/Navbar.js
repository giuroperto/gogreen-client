import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchButtons from "./SearchButtons";
import FilterRender from "./FilterRender";
import AuthService from './auth/auth-services';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFilterRender: false,
      loggedInUser: null
    };
    this.service = new AuthService();
    this.filterRender = this.filterRender.bind(this);
  }

  filterRender() {
    this.setState({
      showFilterRender: !this.state.showFilterRender
    });
  }

  logoutUser() {
    this.service
      .logout()
      .then(() => {
        this.setState({
          loggedInUser: null
        });
        this.props.getUser(null);
      })
      .catch(err => console.log(err));
  }

  //TODO add conditional rendering according to whether a person is logged in or not

  componentDidUpdate(prevProps) {
    if (this.props.allData.loggedInUser !== prevProps.allData.loggedInUser) {
      this.setState({ loggedInUser: this.props.allData.loggedInUser });
    }
  }

  render() {
    console.log("yesss");
    return (
      <div className="nav-container">
        <nav className="navbar navbar-expand-lg navbar-light">
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

          <div
            className="collapse navbar-collapse d-flex justify-content-between"
            id="navbarSupportedContent"
          >
            <div className="d-flex flex-direction-start nav-buttons">
              <a className="nav-navbar nav-link" href="/">
                Why GoGreen?
              </a>
              <a className="nav-navbar nav-link" href="/aboutus">
                About Us
              </a>
            </div>

            <div className="d-flex flex-direction-between">
                
                <a className="nav-navbar nav-link d-flex align-items-center mr-3 nav-icon-container" href="/signup">
                <img src="./images/recipe.png" alt="recipe-icon" />
                  <p>Sign Up</p>
                </a>

                <a className="nav-navbar nav-link d-flex align-items-center nav-icon-container" href="/login">
                <img src="./images/chef.png" alt="chef-icon" />
                <p>Login</p>
                </a>

                {/* TODO ADJUST - JUST TESTING LOGOUT */}
                <a className="nav-navbar nav-link d-flex align-items-center nav-icon-container" onClick={this.logoutUser} href="/logout">
                {/* <img src="./images/chef.png" alt="chef-icon" /> */}
                <p>Logout</p>
                </a>

            </div>
          </div>
        </nav>

        <div className="split-container d-flex justify-content-center">
          <div className="split-bar"></div>
        </div>

        <nav className="navbar navbar-light second-navbar d-flex align-items-center mt-1">
          <div className="second-nav-icon-div d-flex align-items-center ml-2">
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
          </div>

          <div className="mr-3">
            <SearchButtons showFilter={this.filterRender} getSearchWord={this.props.getSearchWord} />
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
