import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Message from '../components/Message';
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
          userAccount: response.data,
        })
      })
      .catch(err => console.log(err));

      //FIXME username undefined
    // this.getUserRecipes();
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
    console.log('username params', this.props.match.params);
    console.log('username loggedin', this.props.loggedInUser.username);
    console.log((this.props.match.params === this.props.loggedInUser.username))
    return(
      <div className="profile-page">
      {
        this.props.message && <Message message={this.props.message}/>
      }
        <div className="user-info d-flex">
          <div className="profile-picture">
          {
            this.state.userAccount && this.state.userAccount.picture && <img src={this.state.userAccount.picture} alt="Profile picture"/>
          }
          </div>
          <div className="infos">
            <h2>{this.state.userAccount && this.state.userAccount.username}</h2>
            <p className="name">{this.state.userAccount && this.state.userAccount.firstName} {this.state.userAccount && this.state.userAccount.lastName}</p>
            <p>User since {this.state.userAccount && this.state.userAccount.created_at}</p>
            {
              this.state.userRecipes.length > 0 ? <p>Has contributed { this.state.userRecipes.length } recipes</p> : <p> Has not started contributing just yet! </p>
            }
          </div>
          <div className="edit-button">
          {
            (this.props.match.params.username === this.props.loggedInUser.username) && <Link to={`/user/${this.props.loggedInUser.username}/edit`}>Edit Profile</Link>
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
