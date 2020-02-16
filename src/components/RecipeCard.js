import React, { Component } from "react";
import { Link } from "react-router-dom";
import APIAccess from "./api/api-access";

class RecipeCard extends Component {
  constructor(props) {
    super(props);

    this.state ={
      isFavourite: false,
    };
    this.apiEndpoints = new APIAccess();
    this.isFavourite = this.isFavourite.bind(this);
    this.checkFavourites = this.checkFavourites.bind(this);
  }

  isFavourite() {
    if (this.state.isFavourite) {
      this.unfavourite();
    } else {
      this.favourite();
    }
    this.setState({
      isFavourite: !this.state.isFavourite,
    })
  }

  componentDidMount() {
    this.checkFavourites();
  }

  checkFavourites() {
    const { username } = this.props.loggedInUser;

    this.apiEndpoints
      .getOneUser(username)
      .then((response) => {
        let { recipeID } = this.props;
        if (response.data.favourites.length > 0 && response.data.favourites.filter((e) => e._id === recipeID).length > 0) {
          this.setState({
            isFavourite: true,
          });
        }

      })
      .catch(err => console.log(err));
  }

  favourite() {
    this.apiEndpoints
      .favourite(this.props.loggedInUser, this.props.recipeID)
      .then(response => {
        console.log('favoritando');
      })
      .catch(err => console.log(err));
  }
    
  unfavourite() {
    this.apiEndpoints
      .unfavourite(this.props.loggedInUser, this.props.recipeID)
      .then(response => {
        console.log('desfavoritando');
    })
      .catch(err => console.log(err));
  }

  render () {
    return (
      <div id="individual-recipe" className="container-fluid" style={{ width: "85%" }} >
        <div className="row">
          <div id="individual-left" className="col-md-6 min-vh-40">
            <Link to={this.props.link}>
              <img className='recipe-img' src={this.props.image} alt="Recipe-Text"></img>
            </Link>
          </div>
  
          <div
            id="individual-right"
            className="recipe-card-infos col-md-6 d-flex flex-column align-items-start"
          >
            <div className="mt-3 d-flex align-items-center">
              <Link to={this.props.link}>
                <h3>{this.props.name}</h3>
              </Link>
              {
                this.props.loggedInUser && (
                    this.state.isFavourite ? <div onClick={this.isFavourite} style={{cursor:'pointer'}}><i className="fas fa-heart ml-3 fav-button h3 heart"></i></div> : <div onClick={this.isFavourite} style={{cursor:'pointer'}}><i className="far fa-heart ml-3 fav-button h3"></i></div>
                )
              }
            </div>
            <div>
              <h4>{this.props.description}</h4>
            </div>
            <div>
              <p>
                <img className='recipe-card-img' src="https://res.cloudinary.com/dxatyucj2/image/upload/v1581042983/go-green/hat-icon_txapif.png" alt="chef" />
                <b>Created by:  </b>
                {this.props.owner}
              </p>
            </div>
            <div>
              <p>
                <img className='recipe-card-img' src="https://res.cloudinary.com/dxatyucj2/image/upload/v1581042982/go-green/clock_quyo32.png" alt="clock" />
                <b>Prep time: </b>
                {this.props.time} minutes
              </p>
            </div>
            <div>
              <p>
                <img className='recipe-card-img' src="https://res.cloudinary.com/dxatyucj2/image/upload/v1581042996/go-green/food2_qfzdzm.png" alt="plate" />
                <b>Dish type: </b>
                {this.props.dishTypes}
              </p>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
};

export default RecipeCard;
