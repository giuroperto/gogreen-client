import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import APIAccess from './api/api-access';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userAccount: null,
      showFavourites: false,
      userRecipes: [],
    };

    this.apiEndpoints = new APIAccess();
    // this.favoritesToggle = this.favoritesToggle.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount() {
  //   this.setState({
  //     loggedInUser: this.props.loggedInUser,
  //   })

  componentDidMount() {
    const { username } = this.props.match.params;
    this.apiEndpoints.getOneUser(username)
      .then(response => {
        this.setState({
          userAccount: response,
        })
      })
      .catch(err => console.log(err));
  }

  // favoritesToggle() {
  //   this.setState({
  //     showFavourites: !this.state.showFavourites,
  //   })
  // }

  showFavourites() {
    // const { username } = this.props.match.params;
  }

  render() {
    return(
      <div className="profile-page">
        <div className="user-info d-flex">
          <div className="profile-picture">
          //TODO add Usermodel picture
          {/* {
            this.state.userAccount.picture && <img src={this.state.userAccount.picture} alt="Profile picture"/>
          } */}
          </div>
          <div className="infos">
            <h2>{this.state.userAccount && this.state.userAccount.username}</h2>
            <p className="name">{this.state.userAccount && this.state.userAccount.firstName} {this.state.userAccount && this.state.userAccount.lastName}</p>
            <p>User since {this.state.userAccount && this.state.userAccount.created_at}</p>
            {/* <p>Has contributed {this.state.userAccount && this.state.userAccount.recipes.length} recipes</p> */}
          </div>
        </div>
        <div className="user-recipes">
          <div className="links btn-group btn-group-toggle" data-toggle="buttons">
            {/* <a href='#' onClick={this.favouritesToggle}>Recipes</a>
            <a href='#' onClick={this.favoritesToggle}>Favorites</a> */}
            <label className="btn btn-secondary active">
              <input type="radio" name="recipes" id="recipes" autocomplete="off" checked onClick={() => this.showRecipes} /> Recipes
            </label>
            <label className="btn btn-secondary">
              <input type="radio" name="favourites" id="favourites" autocomplete="off" onClick={() => this.showFavourites} /> Favourites
            </label>
          </div>
          <div className="recipes-cards-container">
            {/* {this.state.recipesToShow === {} && <p>No recipes to show!</p> }
            {this.state.recipesToShow.map(recipe => <RecipeCard {...recipe}/>)} */}
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
