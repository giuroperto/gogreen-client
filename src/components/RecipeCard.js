import React, { Component } from "react";
import { Link } from "react-router-dom";
import APIAccess from "./api/api-access";

class RecipeCard extends Component {
  constructor(props) {
    super(props);

    this.state ={
      isFavourite: false,
      difficulty: '',
      imgDifficulty: '',
      score: 0,
      nOfReviews: 0,
    };
    this.apiEndpoints = new APIAccess();
    this.isFavourite = this.isFavourite.bind(this);
    this.checkFavourites = this.checkFavourites.bind(this);
    this.checkDifficulty = this.checkDifficulty.bind(this);
    this.checkScore = this.checkScore.bind(this);
    this.getDifficultyImg = this.getDifficultyImg.bind(this);
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
    this.checkScore();
    this.checkDifficulty();
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

  checkDifficulty() {
    this.apiEndpoints
      .getOneRecipe(this.props.recipeID)
      .then(response => {
        if (response.data.reviews.length > 0) {
          let numberEasy = response.data.reviews.filter((review) => review.difficulty === 'Easy').length;
          let numberMedium = response.data.reviews.filter((review) => review.difficulty === 'Medium').length;
          let numberHard = response.data.reviews.filter((review) => review.difficulty === 'Hard').length;

          if (numberEasy > numberMedium && numberEasy > numberHard) {
            this.setState({
              difficulty: 'Easy',
            });
          } else if (numberMedium > numberEasy && numberMedium > numberHard) {
            this.setState({
              difficulty: 'Medium',
            });
          } else {
            this.setState({
              difficulty: 'Hard',
            });
          }
          this.getDifficultyImg();
          this.setState({
            nOfReviews: response.data.reviews.length,
          });
        }
      })
      .catch(err => console.log(err));
  }

  getDifficultyImg() {
    if (this.state.difficulty === 'Easy') {
      this.setState({
        imgDifficulty: 'https://res.cloudinary.com/dxatyucj2/image/upload/v1581899404/go-green/easy_nztpqt.png',
      });
    } else if (this.state.difficulty === 'Medium') {
      this.setState({
        imgDifficulty: 'https://res.cloudinary.com/dxatyucj2/image/upload/v1581899404/go-green/medium_ydl6ei.png',
      });
    } else if (this.state.difficulty === 'Hard') {
      this.setState({
        imgDifficulty: 'https://res.cloudinary.com/dxatyucj2/image/upload/v1581899404/go-green/hard_rclonl.png',
      });
    }
  }

  checkScore() {
    this.apiEndpoints
      .getOneRecipe(this.props.recipeID)
      .then(response => {
        if (response.data.reviews.length > 0) {
          let sumScore = response.data.reviews.reduce((total, next) => total + next.score, 0);
          let numbScore = response.data.reviews.length;
          let avgScore = (sumScore/numbScore).toFixed(2);
          this.setState({
            score: avgScore,
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

  renderStars() {
    return <i className="fas fa-star"></i>
  }

  render () {
    let stars = [];
    for (let i = 1; i < 6; i++) {
      if (this.state.score / i >= 1) {
        stars.push(i);
      }
    }
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
            <div>
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
                { this.state.score ? stars.map(this.renderStars) : '' }
                <span className="ml-3">{this.state.nOfReviews > 0 && this.state.nOfReviews}</span>
              </div>
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
            <div>
              {this.state.difficulty ? <img className='recipe-card-lvl' src={this.state.imgDifficulty} alt={this.state.difficulty} /> : "No ratings yet!" }
              
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
};

export default RecipeCard;
