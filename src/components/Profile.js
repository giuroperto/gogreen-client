import React, { Component } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import Message from "../components/Message";
import APIAccess from "./api/api-access";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userAccount: null,
      showFavourites: false,
      userRecipes: []
    };

    this.apiEndpoints = new APIAccess();
    this.showRecipes = this.showRecipes.bind(this);
    this.showFavourites = this.showFavourites.bind(this);
    this.getUserRecipes = this.getUserRecipes.bind(this);
  }

  componentDidMount() {
    const { username } = this.props.match.params;

    this.apiEndpoints
      .getOneUser(username)
      .then(response => {
        this.setState({
          userAccount: response.data
        });
      })
      .catch(err => console.log(err));

    //FIXME username undefined
    // this.getUserRecipes();
  }

  getUserRecipes() {
    const { username } = this.props.match.params;
    let filteredRecipes = this.props.allRecipes.filter(
      recipe => recipe.owner.username === username
    );
    this.setState({
      userRecipes: filteredRecipes
    });
  }

  showFavourites() {
    this.setState({
      showFavourites: true
    });
  }

  showRecipes() {
    this.setState({
      showFavourites: false
    });
  }

  render() {
    console.log(this.state);
    console.log(this.props);
    // console.log('username params', this.props.match.params);
    // console.log('username loggedin', this.props.loggedInUser.username);
    // console.log((this.props.match.params === this.props.loggedInUser.username))
    return (
      <div className="container profile-page d-flex flex-column justify-content-center align-items-center mt-5">
        {this.props.message && (
          <Message
            successMessage={this.props.successMessage}
            message={this.props.message}
          />
        )}

        <div className="row profile-container d-flex align-items-center justify-content-center">
          <div className="col-sm profile-img-container">
            {this.state.userAccount && this.state.userAccount.picture && (
              <img src={this.state.userAccount.picture} alt="profile-picture" />
            )}
            <img src="/images/diet.png" alt="profile-picture" />
          </div>

          <div className="col-sm profile-infos">
            <h3 className="name">
              Hello,{" "}
              {this.state.userAccount && this.state.userAccount.firstName}{" "}
              {this.state.userAccount && this.state.userAccount.lastName}
            </h3>
            <p>@{this.state.userAccount && this.state.userAccount.username}</p>

            <div className="infos">
              <p>
                User since{" "}
                {this.state.userAccount && this.state.userAccount.created_at}
              </p>
              {this.state.userRecipes.length > 0 ? (
                <p>Has contributed {this.state.userRecipes.length} recipes</p>
              ) : (
                <p> Has not started contributing just yet! </p>
              )}
            </div>

            <div className="col-sm d-flex">
              <div className="edit-button mr-3">
                {this.props.match.params.username ===
                  this.props.loggedInUser.username && (
                  <button type="button" class="btn btn-secondary">
                    <Link to={`/user/${this.props.loggedInUser.username}/edit`}>
                      Edit Profile
                    </Link>
                  </button>
                )}
              </div>
              <div className="delete-button ml-3">
                <button type="button" class="btn btn-danger">
                  <Link to={`/user/${this.props.loggedInUser.username}/delete`}>
                    {" "}
                    Delete Profile{" "}
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="recipes-favourites-container">
          <div className="toggle-buttons mt-5">
            <div className="user-recipes">
              <div
                className="links btn-group btn-group-toggle"
                data-toggle="buttons"
              >
                {/* adjust styling when clicked the other should be unselected */}
                <label className="btn btn-secondary active">
                  <input
                    type="radio"
                    name="recipes"
                    id="recipes"
                    autocomplete="off"
                    checked
                    onClick={this.showRecipes}
                  />{" "}
                  Recipes
                </label>
                <label className="btn btn-secondary">
                  <input
                    type="radio"
                    name="favourites"
                    id="favourites"
                    autocomplete="off"
                    onClick={this.showFavourites}
                  />{" "}
                  Favourites
                </label>
              </div>
              <div className="recipes-cards-container">
                {this.state.showFavourites
                  ? this.state.userAccount.favourites.map(recipe => (
                      <RecipeCard {...recipe} />
                    ))
                  : this.state.userRecipes.map(recipe => (
                      <RecipeCard {...recipe} />
                    ))}
                {/* //TODO add text to when there are no favs and recipes */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

//TODO adjust image, crete recipes and favourites to test, adjust button styling and add another case when there is no fav and no recipe to show
