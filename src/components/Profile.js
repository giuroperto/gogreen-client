import React, { Component } from 'react';
import RecipeCard from '../components/RecipeCard';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueUser: {recipes: []},
      recipesToShow: []
    }
    this.favoritesToggle = this.favoritesToggle.bind(this);
    this.myRecipesToggle = this.myRecipesToggle.bind(this);
  }

  componentDidMount() {
    const {username} = this.props.match.params;
    // axios.get(`/user/${username}`)
    // .then(response => this.setState({
    //   uniqueUser: response.data,
    //   recipesToShow: response.data.recipes
    // }))
    // .catch(error => console.log(error));
  }

  favoritesToggle() {
    this.setState({
      recipesToShow: this.uniqueUser.favorites
    })
  }

  myRecipesToggle() {
    this.setState({
      recipesToShow: this.uniqueUser.recipes
    })
  }

  render() {
    const {uniqueUser} = this.state;
    return(
      <div className="profile-page">
        <div className="user-info d-flex">
          <div className="profile-picture">
            <img src={uniqueUser.picture} alt="Profile picture"/>
          </div>
          <div className="infos">
            <h2>{uniqueUser.username}</h2>
            <p class="name">{uniqueUser.firstName} {uniqueUser.lastName}</p>
            <p>User since {uniqueUser.createdAt}</p>
            <p>Has contributed {uniqueUser.recipes.length} recipes</p>
          </div>
        </div>
        <div className="user-recipes">
          <div className="links">
            <a href='#' onClick={this.myRecipesToggle}>Recipes</a>
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