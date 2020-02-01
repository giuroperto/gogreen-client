import React, { Component } from 'react';
import RecipeCard from '../components/RecipeCard';
import APIAccess from './api/api-access';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueUser: null,
      recipes: [],
      showFavourites: false,
    }

    this.apiEndpoints = new APIAccess();
    this.favoritesToggle = this.favoritesToggle.bind(this);
    this.myRecipesToggle = this.myRecipesToggle.bind(this);
  }

  componentDidMount() {
    const {username} = this.props.match.params;
    this.apiEndpoints.getOneUser(username)
      .then(response => this.setState({
          uniqueUser: response.data,
          // change line below, only for saving
          recipesToShow: null,
        }))
      .catch(err => console.log(err));
  }

  favoritesToggle() {
    this.setState({
      showFavourites: !this.state.showFavourites,
    })
  }

  render() {
    const {uniqueUser} = this.state;
    console.log(uniqueUser);
    console.log(this.state);
    return(
      <div className="profile-page">
        <div className="user-info d-flex">
          <div className="profile-picture">
            <img src={uniqueUser.picture} alt="Profile picture"/>
          </div>
          <div className="infos">
            <h2>{uniqueUser.username}</h2>
            <p className="name">{uniqueUser.firstName} {uniqueUser.lastName}</p>
            <p>User since {uniqueUser.createdAt}</p>
            <p>Has contributed {uniqueUser.recipes.length} recipes</p>
          </div>
        </div>
        <div className="user-recipes">
          <div className="links">
            <a href='#' onClick={this.favouritesToggle}>Recipes</a>
            <a href='#' onClick={this.favoritesToggle}>Favorites</a>
          </div>
          <div className="recipes-cards-container">
            {this.state.recipesToShow === {} && <p>No recipes to show!</p> }
            {this.state.recipesToShow.map(recipe => <RecipeCard {...recipe}/>)}
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;