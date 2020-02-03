import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import SearchButtons from "./SearchButtons";
import FilterRender from "./FilterRender";
import AuthService from "./auth/auth-services";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilterRender: false,
      loggedInUser: null,
      showLoginAndSignupButtons: true,
      showLogoutAndOtherButtons: false,
      loader: true,
    };
    this.service = new AuthService();
    this.filterRender = this.filterRender.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }
  filterRender() {
    this.setState({
      showFilterRender: !this.state.showFilterRender
    });
  }
  logoutUser() {
    console.log('logging out')
    this.setState({
      loader: true,
    })
    this.service
      .logout()
      .then(() => {
        this.setState({
          loggedInUser: null,
          loader: false,
        });
        this.props.getUser(null);
      })
      .catch(err => console.log(err));
  }
  componentDidUpdate(prevProps) {
    if (this.props.allData.loggedInUser !== prevProps.allData.loggedInUser) {
      console.log('fernando vacilao');
      console.log('fernando vacilao');
      console.log('fernando vacilao');
      console.log('fernando vacilao');
      console.log('fernando vacilao');
      console.log('fernando vacilao');
      this.props.allData.loggedInUser ? this.setState({ loggedInUser: this.props.allData.loggedInUser, showLoginAndSignupButtons: false, showLogoutAndOtherButtons: true, }) : this.setState({ loggedInUser: this.props.allData.loggedInUser, showLoginAndSignupButtons: true, showLogoutAndOtherButtons: false,  })
    }
  }
  render() {
    console.log(this.state)
    return (
      <div className="nav-container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <NavLink className="navbar-brand" to="/">
            GoGreen
          </NavLink>
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
            <div className="d-md-flex flex-direction-start nav-buttons navbar-list">
              <NavLink className="nav-navbar nav-link" to="/aboutus">
                Why GoGreen?
              </NavLink>
            </div>
            <div className="d-flex flex-direction-between navbar-list">
              {
                this.state.loggedInUser && 
              <>
              <div className="nav-navbar nav-link d-flex align-items-center mr-3 logged-in-welcome">
              Welcome, {this.state.loggedInUser.username.charAt(0).toUpperCase() + this.state.loggedInUser.username.slice(1)} ! 
              </div>
              </>
              }
              {this.state.showLoginAndSignupButtons && (
                <>
                  <NavLink
                    className="nav-navbar nav-link d-flex align-items-center mr-3 nav-icon-container"
                    to="/signup"
                  >
                    <img src="images/recipe.png" alt="recipe-icon" />
                    <p>Sign Up</p>
                  </NavLink>
                  <NavLink
                    className="nav-navbar nav-link d-flex align-items-center nav-icon-container"
                    to="/login"
                  >
                    <img src="images/chef.png" alt="chef-icon" />
                    <p>Login</p>
                  </NavLink>
                </>
              )}
              
              {
                this.state.loggedInUser && this.state.showLogoutAndOtherButtons && 
                <>
              <NavLink
                className="nav-navbar nav-link d-flex align-items-center nav-icon-container"
                to="/addrecipe"
              >
                <img className="mr-1" src="images/add.png" alt="add-icon" />
                <p>Add Recipe</p>
              </NavLink>
              <NavLink
                className="nav-navbar nav-link d-flex align-items-center nav-icon-container"
                to={`/user/${this.state.loggedInUser.username}`}
              >
                <img src="images/kitchen.png" alt="profile-icon" />
                <p>My Profile</p>
              </NavLink>
              <NavLink
                className="nav-navbar nav-link d-flex align-items-center nav-icon-container"
                onClick={this.logoutUser}
                to="/"
              >
                <img src="images/logout.png" alt="chef-icon" />
                <p>Logout</p>
              </NavLink>
                </>
              }
            </div>
          </div>
        </nav>
        <div className="split-container d-flex justify-content-center">
          <div className="split-bar"></div>
        </div>
        <nav className="navbar navbar-light second-navbar d-flex align-items-center mt-1 navbar-list">
          <div className="second-nav-icon-div d-flex align-items-center ml-2">
            <NavLink
              className="nav-navbar nav-link d-flex align-items-center nav-icon-container"
              to="/allrecipes"
            >
              <img src="images/cook-book.png" alt="book-icon" />
              <p>All Recipes</p>
            </NavLink>
            <NavLink
              className="nav-navbar nav-link d-flex align-items-center nav-icon-container"
              to="/"
            >
              <img src="images/vegetables-icon.png" alt="vegetables-icon" />
              <p>Vegan</p>
            </NavLink>
            <NavLink
              className="nav-navbar nav-link d-flex align-items-center nav-icon-container"
              to="/"
            >
              <img src="images/vegetarian-icon.png" alt="vegetarian-icon" />
              <p>Vegetarian</p>
            </NavLink>
          </div>
          <div className="mr-3">
            <SearchButtons
              showFilter={this.filterRender}
              getSearchWord={this.props.getSearchWord}
            />
          </div>
        </nav>
        <div>
          {this.state.showFilterRender && (
            <FilterRender
              allData={this.props.allData}
              getFilters={this.props.getFilters}
            />
          )}
        </div>
      </div>
    );
  }
}
export default Navbar;