import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProfileRecipeCard from "../components/ProfileRecipeCard";
import Message from "../components/Message";
import APIAccess from "./api/api-access";
import Loader from "react-loader-spinner";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userAccount: null,
      showFavourites: false,
      userRecipes: [],
      dateMonth: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      loader: true,
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
          userAccount: response.data,
          loader: false,
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

  showFavourites(event) {
    console.log('show favs');
    this.setState({
      showFavourites: true
    });
  }

  showRecipes(event) {
    console.log('show recipes');
    this.setState({
      showFavourites: false
    });
  }

  render() {
    this.state.userAccount && console.log(this.state.userAccount)
    return (
      <div>
          { this.state.loader ? (
            <div className='d-flex align-items-center justify-content-center' style={{ height:'80vh'}}>
              <Loader type="Puff" color="#76ff03" height={200} width={200} />
            </div>
          ) : (
        <div className="profile-page">
          {this.props.message && (
            <Message
              successMessage={this.props.successMessage}
              message={this.props.message}
            />
          )}
          <div className="container">
            <div className="row profile-container align-items-center justify-content-center">
              <div className="col-sm-4 profile-img-container mt-4">
                {this.state.userAccount && this.state.userAccount.picture && (
                  <img
                    src={this.state.userAccount.picture}
                    alt="profile-picture"
                  />
                )}
              </div>
  
              <div className='bar vl'>
              </div>
  
              <div className="col-sm-4 profile-infos mt-5">
                <h3 className="name">
                  Hello,{" "}
                  {this.state.userAccount && this.state.userAccount.firstName}{" "}
                  {this.state.userAccount && this.state.userAccount.lastName}
                </h3>
                <p>
                <i className="fas fa-user"></i>
                  @{this.state.userAccount && this.state.userAccount.username}
                </p>
  
                <div className="infos">
                  <p>
                  <i className="fas fa-calendar-alt"></i>
                    User since{" "}
                    {this.state.userAccount && (`${new Date(this.state.userAccount.created_at).getDate()} ${this.state.dateMonth[new Date(this.state.userAccount.created_at).getMonth()]} ${new Date(this.state.userAccount.created_at).getFullYear()}`)}
                  </p>
                  {this.state.userRecipes.length > 0 ? (
                    <p><i className="fas fa-list-alt"></i>Has contributed {this.state.userRecipes.length} recipes</p>
                  ) : (
                    <p> <i className="fas fa-minus-circle"></i>Has not started contributing just yet! </p>
                  )}
                </div>
                
                
                <div className="d-flex justify-content-start mb-5">
                  <div className="edit-button mr-3">
                    {this.props.match.params.username ===
                      this.props.loggedInUser.username && (
                      <button type="button" className="btn btn-secondary">
                        <Link
                          to={`/user/${this.props.loggedInUser.username}/edit`}
                        >
                          <i className="fas fa-edit mr-2"></i>Edit Profile
                        </Link>
                      </button>
                    )}
                  </div>
                  <div className="delete-button ml-3">
                    <button type="button" className="btn btn-danger">
                      <Link
                        to={`/user/${this.props.loggedInUser.username}/delete`}
                      >
                        
                        {" "}
                        <i className="fas fa-trash mr-2"></i>Delete Profile{" "}
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
                    className="container d-flex justify-content-between links btn-group btn-group-toggle py-4"
                  >
                    <div style={{width: '2%'}}></div>
                    <label className="profile-btn btn btn-success">
                    <span className="d-flex justify-content-center align-items-center">
                      <input
                        type="radio"
                        name="recipes"
                        value="recipes"
                        id="recipes"
                        autoComplete="off"
                        checked={!this.state.showFavourites}
                        onClick={this.showRecipes}
                      />{" "}
                        <i className="fas fa-list-alt"></i> <span className="ml-2">Recipes</span> 
                      </span>
                    </label>
                    <div style={{width: '5%'}}></div>
                    <label className="profile-btn btn btn-info">
                      <span className="d-flex justify-content-center align-items-center">
                        <input
                          type="radio"
                          name="favourites"
                          value="favourites"
                          id="favourites"
                          autoComplete="off"
                          checked={this.state.showFavourites}
                          onClick={this.showFavourites}
                        />{" "}
                        <i className="fas fa-star"></i> <span className="ml-2">Favourites</span>
                      </span>
                    </label>
                    <div style={{width: '2%'}}></div>
                  </div>
                  <div className="recipes-cards-container py-5" style={{minHeight: '30vh'}}>
                    {this.state.userAccount && (
                      this.state.showFavourites
                      ? (this.state.userAccount.favourites.length > 0 ? this.state.userAccount.favourites.map((recipe, idx) => <ProfileRecipeCard key={idx} {...recipe}/>) : <div><h4>You haven't favourited any recipe yet! <i class="far fa-sad-tear"></i></h4><h4>Click <Link to="/allrecipes">here</Link> and I'm certain you'll find something you like!</h4></div>)
                      : (this.state.userRecipes.length > 0 ? this.state.userRecipes.map((recipe, idx) => <ProfileRecipeCard key={idx} {...recipe}/> ) : <div><h4>You haven't started contributing yet!</h4><h4>Click <Link to='/addrecipe'>here</Link> to create your first recipe! <i class="far fa-grin-wink"></i></h4></div>)
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
      }
      </div>
    );
  }
}

export default Profile;

//TODO adjust image and add another case when there is no fav and no recipe to show
