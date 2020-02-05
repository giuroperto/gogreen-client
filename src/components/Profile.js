import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProfileRecipeCard from "../components/ProfileRecipeCard";
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
        }, this.getUserRecipes);
      })
      .catch(err => console.log(err));

    //FIXME username undefined
    // this.getUserRecipes();
  }

  getUserRecipes() {
    const { username } = this.props.match.params;
    let filteredRecipes = this.props.allRecipes.filter(
      recipe => recipe.owner && recipe.owner.username === username
    );
    console.log('my filtered recipes:', filteredRecipes)
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
    return (
      <div className="profile-page">
        {this.props.message && (
          <Message
            successMessage={this.props.successMessage}
            message={this.props.message}
          />
        )}

        <div className="container">
          <div className="row profile-container align-items-center justify-content-center">
            <div className="col-sm profile-img-container mt-4">
              {this.state.userAccount && this.state.userAccount.picture && (
                <img
                  src={this.state.userAccount.picture}
                  alt="profile-picture"
                />
              )}
            </div>

            <div className="col-sm profile-infos mt-5">
              <h3 className="name">
                Hello,{" "}
                {this.state.userAccount && this.state.userAccount.firstName}{" "}
                {this.state.userAccount && this.state.userAccount.lastName}
              </h3>
              <p>
                @{this.state.userAccount && this.state.userAccount.username}
              </p>

              <div className="infos">
                <p>
                  User since{" "}
                  {this.state.userAccount && (`${new Date(this.state.userAccount.created_at).getDate()} / ${new Date(this.state.userAccount.created_at).getMonth() + 1} / ${new Date(this.state.userAccount.created_at).getFullYear()}`)}
                </p>
                {this.state.userRecipes.length > 0 ? (
                  <p>Has contributed {this.state.userRecipes.length} recipes</p>
                ) : (
                  <p> Has not started contributing just yet! </p>
                )}
              </div>
              
              
              <div className="d-flex justify-content-center mb-5">
                <div className="edit-button mr-3">
                  {this.props.match.params.username ===
                    this.props.loggedInUser.username && (
                    <button type="button" class="btn btn-secondary">
                      <Link
                        to={`/user/${this.props.loggedInUser.username}/edit`}
                      >
                        Edit Profile
                      </Link>
                    </button>
                  )}
                </div>
                <div className="delete-button ml-3">
                  <button type="button" class="btn btn-danger">
                    <Link
                      to={`/user/${this.props.loggedInUser.username}/delete`}
                    >
                      {" "}
                      Delete Profile{" "}
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="recipes-favourites-container">
            <div className="toggle-buttons">
              <div className="user-recipes">
                <div
                  className="links btn-group btn-group-toggle"
                  data-toggle="buttons"
                >
                  {/* adjust styling when clicked the other should be unselected */}
                  <label className="btn btn-success active">
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
                  <label className="btn btn-info">
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
                <div className="recipes-cards-container py-5" style={{minHeight: '30vh'}}>
                  {this.state.showFavourites
                    ? this.state.userAccount.favourites.map(recipe => (
                        <ProfileRecipeCard {...recipe}/>
                      ))
                    : this.state.userRecipes.map(recipe => (
                        <ProfileRecipeCard {...recipe}/>
                      ))}
                  {/* //TODO add text to when there are no favs and recipes */}
                </div>
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
