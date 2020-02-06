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
      veganToggle: false,
    };
    this.service = new AuthService();
    this.filterRender = this.filterRender.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.veganTrue = this.veganTrue.bind(this);
    this.veganFalse = this.veganFalse.bind(this);
  }
  filterRender() {
    this.setState({
      showFilterRender: !this.state.showFilterRender
    });
  }
  veganTrue() {
    this.setState({
      veganToggle: true
    });
    this.props.getVeganState(true);
  }
  veganFalse() {
    this.setState({
      veganToggle: false
    });
    this.props.getVeganState(false);
  }

  logoutUser() {
    console.log('Log out')
    this.setState({
      loader: true,
    })
    this.service
      .logout()
      .then(response => {
        this.setState({
          loggedInUser: null,
          loader: false,
        });
        this.props.getUser(null);
        this.props.getMessage(response.status, response.data.message);
      })
      .catch(err => console.log(err));
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.allData.loggedInUser !== prevProps.allData.loggedInUser) {
      this.props.allData.loggedInUser ? this.setState({ loggedInUser: this.props.allData.loggedInUser, showLoginAndSignupButtons: false, showLogoutAndOtherButtons: true, }) : this.setState({ loggedInUser: this.props.allData.loggedInUser, showLoginAndSignupButtons: true, showLogoutAndOtherButtons: false,  })
    }
  }
  render() {
    console.log(this.state)
    let vegetarianString = '';
    let veganString = '';
    if (this.state.veganToggle){
      vegetarianString = "https://res.cloudinary.com/dxatyucj2/image/upload/v1580900040/go-green/vegetarian-off_liw02r.png"; 
      veganString = "https://res.cloudinary.com/dxatyucj2/image/upload/v1580900039/go-green/vegan-on_nn6xrl.png"
    } else {
        vegetarianString = "https://res.cloudinary.com/dxatyucj2/image/upload/v1580900040/go-green/vegetarian-on_dfi1b5.png"; 
        veganString = "https://res.cloudinary.com/dxatyucj2/image/upload/v1580900039/go-green/vegan-off_yrfdh4.png"
      };
    return (
      <div className="nav-container">
        <nav className="navbar navbar-expand-lg navbar-light nav-main">
          <NavLink className="navbar-brand" to="/">
          <img className='nav-logo ml-1' src="https://res.cloudinary.com/dxatyucj2/image/upload/v1580900039/go-green/logo_sbjwg4.png" alt="logo"/>
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
            className="collapse navbar-collapse justify-content-between"
            id="navbarSupportedContent"
          >
            <div className="d-md-flex flex-direction-start nav-buttons navbar-list">
              <NavLink className="nav-navbar nav-link px-0" to="/aboutus">
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
                    className="nav-navbar nav-link d-flex align-items-center nav-icon-container px-0"
                    to="/signup"
                  >
                    <img src="https://res.cloudinary.com/dxatyucj2/image/upload/v1580900039/go-green/mobile-phone_qkzglz.png" alt="recipe-icon" />
                    <p className="text-nowrap">Sign Up</p>
                  </NavLink>
                  <NavLink
                    className="nav-navbar nav-link d-flex align-items-center nav-icon-container px-0"
                    to="/login"
                  >
                    <img src="https://res.cloudinary.com/dxatyucj2/image/upload/v1580900039/go-green/recipe2_owkbb1.png" alt="chef-icon" />
                    <p className="text-nowrap">Login</p>
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
                <img className="mr-1" src="images/plus.png" alt="add-icon" />
                <p>Add Recipe</p>
              </NavLink>
              <NavLink
                className="nav-navbar nav-link d-flex align-items-center nav-icon-container"
                to={`/user/${this.state.loggedInUser.username}`}
              >
                <img src="https://res.cloudinary.com/dxatyucj2/image/upload/v1580900039/go-green/kitchen-pack_zlb5av.png" alt="profile-icon" />
                <p>My Profile</p>
              </NavLink>
              <NavLink
                className="nav-navbar nav-link d-flex align-items-center nav-icon-container"
                onClick={this.logoutUser}
                to="/"
              >
                <img src="https://res.cloudinary.com/dxatyucj2/image/upload/v1580900039/go-green/logout2_t3jix7.png" alt="chef-icon" />
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
        <nav className="navbar navbar-light second-navbar d-flex align-items-center navbar-list">
          <div className="second-nav-icon-div d-flex align-items-center">
            <NavLink
              className="nav-navbar nav-link d-flex align-items-center nav-icon-container"
              to="/allrecipes" onClick={this.veganFalse}
            >
              <img className="mr-2" src="https://res.cloudinary.com/dxatyucj2/image/upload/v1580900036/go-green/book2_t5vazt.png" alt="book-icon" />
              <p className="text-nowrap">All Recipes</p>
            </NavLink>
            
            
            <NavLink className="nav-navbar nav-link d-flex align-items-center nav-icon-container" to="/allrecipes" onClick={this.veganFalse}>
              <img className="mr-2" src={vegetarianString} alt="vegetarian-icon" />
              <p className="text-nowrap">Vegetarian</p>
            </NavLink>

            <NavLink className="nav-navbar nav-link d-flex align-items-center nav-icon-container" to="/allrecipes" onClick={this.veganTrue}>
              <img src={veganString} className="mr-2" alt="vegetables-icon" />
              <p className="text-nowrap">Vegan</p>
            </NavLink>

          </div>
          <div className="second-navbar-search">
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