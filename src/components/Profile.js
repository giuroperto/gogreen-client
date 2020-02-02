import React, { Component } from 'react';
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
    this.showRecipes = this.showRecipes.bind(this);
    this.showFavourites = this.showFavourites.bind(this);
    this.getUserRecipes = this.getUserRecipes.bind(this);
  }

  componentDidMount() {
    const { username } = this.props.match.params;

    this.apiEndpoints.getOneUser(username)
      .then(response => {
        this.setState({
          userAccount: response,
        })
      })
      .catch(err => console.log(err));

    this.getUserRecipes();
  }

  getUserRecipes() {
    const { username } = this.props.match.params;
    let filteredRecipes = this.props.allRecipes.filter(recipe => recipe.owner.username === username);
    this.setState({
      userRecipes: filteredRecipes,
    });
  }

  showFavourites() {
    this.setState({
      showFavourites: true,
    });
  }

  showRecipes() {
    this.setState({
      showFavourites: false,
    });
  }

  render() {
    console.log(this.state);
    return(
      <div className="profile-page">
        <div className="user-info d-flex">
          <div className="profile-picture">
          {/* //TODO add Usermodel picture */}
          {/* {
            this.state.userAccount.picture && <img src={this.state.userAccount.picture} alt="Profile picture"/>
          } */}
          </div>
          <div className="infos">
            <h2>{this.state.userAccount && this.state.userAccount.username}</h2>
            <p className="name">{this.state.userAccount && this.state.userAccount.firstName} {this.state.userAccount && this.state.userAccount.lastName}</p>
            <p>User since {this.state.userAccount && this.state.userAccount.created_at}</p>
            {
              this.state.userRecipes.length > 0 ? <p>Has contributed { this.state.userRecipes.length } recipes</p> : <p> Has not started contributing just yet! </p>
            }
          </div>
        </div>
        <div className="user-recipes">
          <div className="links btn-group btn-group-toggle" data-toggle="buttons">
          {/* adjust styling when clicked the other should be unselected */}
            <label className="btn btn-secondary active">
              <input type="radio" name="recipes" id="recipes" autocomplete="off" checked onClick={ this.showRecipes } /> Recipes
            </label>
            <label className="btn btn-secondary">
              <input type="radio" name="favourites" id="favourites" autocomplete="off" onClick={this.showFavourites} /> Favourites
            </label>
          </div>
          <div className="recipes-cards-container">
          {
            this.state.showFavourites ? this.state.userAccount.favourites.map(recipe => <RecipeCard {...recipe}/>) : this.state.userRecipes.map(recipe => <RecipeCard {...recipe}/>)
          }
          {/* //TODO add text to when there are no favs and recipes */}
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;

//TODO adjust image, crete recipes and favourites to test, adjust button styling and add another case when there is no fav and no recipe to show

// last version

// this.state = {
//   uniqueUser: {},
//   recipesToShow: []
// }
// this.favoritesToggle = this.favoritesToggle.bind(this);
// this.myRecipesToggle = this.myRecipesToggle.bind(this);
// }

// componentDidMount() {
// const {username} = this.props.match.params;
// axios.get(`/user/${username}`)
// .then(response => this.setState({
//   uniqueUser: response.data,
//   recipesToShow: response.data.recipes
// }))
// .catch(error => console.log(error));
// }

// favoritesToggle() {
// this.setState({
//   recipesToShow: this.uniqueUser.favorites
// })
// }

// myRecipesToggle() {
// this.setState({
//   recipesToShow: this.uniqueUser.recipes
// })

// const {uniqueUser} = this.state;
//     return(
//       <div className="profile-page">
//         <div className="user-info d-flex">
//           <div className="profile-picture">
//             <img src={uniqueUser.picture} alt="Profile picture"/>
//           </div>
//           <div className="infos">
//             <h2>{uniqueUser.username}</h2>
//             <p class="name">{uniqueUser.firstName} {uniqueUser.lastName}</p>
//             <p>User since {uniqueUser.createdAt}</p>
//             <p>Has contributed {uniqueUser.recipes.length} recipes</p>
//           </div>
//         </div>
//         <div className="user-recipes">
//           <div className="links">
//             <a href='#' onClick={this.myRecipesToggle}>Recipes</a>
//             <a href='#' onClick={this.favoritesToggle}>Favorites</a>
//           </div>
//           <div className="recipes-cards-container">
//             {this.state.recipesToShow === {} && <p>No recipes to show!</p> }
//             {this.state.recipesToShow.map(recipe => <RecipeCard {...recipe}/>)}
//           </div>
//         </div>
//       </div>
//     )