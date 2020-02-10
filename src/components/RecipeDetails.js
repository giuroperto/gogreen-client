import React, { Component } from "react";
import Message from "./Message";
import AddReview from "../components/AddReview";
import { Link } from "react-router-dom";
import APIAccess from "./api/api-access";
import Loader from "react-loader-spinner";

class RecipeDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchWord: "",
      uniqueRecipe: {},
      determinedOwner: "",
      cleanDishType: "",
      ingredients: "",
      count: 0,
      allReviews: [],
    };
    this.apiEndpoints = new APIAccess();
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    this.apiEndpoints
      .getOneRecipe(this.props.match.params.recipeID)
      .then(response => {

        let givenUniqueRecipe = response.data;
        let givenDeterminedOwner = "";
        if (givenUniqueRecipe.owner === undefined) {
          givenDeterminedOwner = givenUniqueRecipe.ownerAPI;
        } else {
          givenDeterminedOwner = givenUniqueRecipe.owner.username;
        }
        let givenCleanDishType =
          givenUniqueRecipe.dishTypes[0].slice(0, 1).toUpperCase() +
          givenUniqueRecipe.dishTypes[0].slice(
            1,
            givenUniqueRecipe.dishTypes[0].length
          );
        let givenCuisine = "";
        if (givenUniqueRecipe.cuisines[0] === undefined) {
          givenCuisine = "Not specified";
        } else {
          givenCuisine = givenUniqueRecipe.cuisines[0];
        }
        let givenIngredients = [];
        if (givenUniqueRecipe.ingredients[0] === undefined) {
        } else if (givenUniqueRecipe.ingredients.length === 1) {
          givenIngredients = givenUniqueRecipe.ingredients[0].split("\n");
          let removed = givenIngredients.splice(givenIngredients.length - 1, 1);
        } else {
          givenIngredients = givenUniqueRecipe.ingredients;
        }

        this.setState({
          uniqueRecipe: givenUniqueRecipe,
          determinedOwner: givenDeterminedOwner,
          cleanDishType: givenCleanDishType,
          cuisine: givenCuisine,
          ingredients: givenIngredients,
          allReviews: response.data.reviews,
        });
      })
      .catch(err => console.log(err));
  }

  //TODO add fork button for logged users

  render() {
    let stepCount = 0;
    return (
      <>
        {this.props.message && (
          <Message
            successMessage={this.props.successMessage}
            message={this.props.message}
          />
        )}
        {this.state.uniqueRecipe.ingredients ? (
          <div
            id="detailed-recipe"
            className="container-fluid mb-3"
            style={{ width: "85%" }}
          >
            <div className="row d-flex flex-column justify-content-center align-items-center mb-2 mt-4">
              <div className="recipe-details-picture">
                <img
                  src={this.state.uniqueRecipe.picture}
                  alt={this.state.uniqueRecipe.name}
                ></img>
              </div>
              <div className="mt-4">
                <div className="recipe-details-name d-flex justify-content-center align-items-center">
                  <h3>{this.state.uniqueRecipe.name}</h3>
                  <div className="edit-button ml-3 mb-3">
                    {this.props.loggedInUser &&
                      this.state.uniqueRecipe.owner &&
                      this.state.uniqueRecipe.owner.username ===
                        this.props.loggedInUser.username && (
                        <Link
                          to={`/recipe/${this.props.match.params.recipeID}/edit`}
                        >
                          <button type="button" className="btn2">
                            <i className="fa fa-edit  "></i>
                          </button>
                        </Link>
                      )}
                  </div>
                  {/* <div className="edit-button ml-3">
                {this.props.loggedInUser && (
                  <Link to={``}>
                    <button type="button" class="btn btn-secondary">
                      Fork this Recipe
                    </button>
                  </Link>
                )}
              </div> */}
                </div>
              </div>
              <div>
                <span className="recipe-description">
                  {this.state.uniqueRecipe.description}
                </span>
              </div>
            </div>
            <div className="row recipe-details-general-info">
              <div className="col-sm d-flex recipe-details-general-info-col">
                <div className="individual-detail mr-3">
                  <img
                    className="recipe-details-icon"
                    src="../images/hat-icon.png"
                    alt="Contributed by"
                  />
                  <p>@ {this.state.determinedOwner}</p>
                </div>
                <div className="individual-detail mr-3">
                  <img
                    className="recipe-details-icon"
                    src="../images/clock.png"
                    alt="Prep time"
                  />
                  <p>{this.state.uniqueRecipe.totalTimeMinutes} minutes</p>
                </div>
              </div>
              <div className="col-sm d-flex recipe-details-general-info-col">
                <div className="individual-detail mr-3">
                  <img
                    className="recipe-details-icon"
                    src="../images/food2.png"
                    alt="Dish type"
                  />
                  <p>{this.state.cleanDishType}</p>
                </div>
                <div className="individual-detail">
                  <img
                    className="recipe-details-icon"
                    src="../images/cuisine-icon.png"
                    alt="Cuisine"
                  />
                  <p>{this.state.cuisine}</p>
                </div>
              </div>
            </div>
            <div className="align-center">
              <div className="row d-flex justify-content-center text-container">
                <h4 className="mb-4 mt-4">Ingredients</h4>
              </div>
              <div className="row d-flex justify-content-center mr-1 ml-1">
                <div className="text-left">
                  <ul className='page-details'>
                    {this.state.ingredients.map((i, idx) => {
                      return <li key={idx}>{i}</li>;
                    })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center text-container2">
              <h4 className="mb-4 mt-4">Instructions</h4>
            </div>
            <div className="row d-flex justify-content-center instructions-div">
              {this.state.uniqueRecipe.instructions.length > 0 ? (
                this.state.uniqueRecipe.instructions.map(i => {
                  stepCount += 1;
                  let timeRendered = "";
                  i.stepTimeMinutes
                    ? (timeRendered = `${i.stepTimeMinutes} minutes`)
                    : (timeRendered = "");
                  return (
                    <div className="container-fluid">
                      <div className="row page-details">
                        <div className="col-xs-6 col-sm-3 d-flex flex-column justify-content-center">
                          <div>
                            <p className="page-step mb-0">
                              <b>Step {stepCount}</b>
                            </p>
                          </div>
                          <div>
                            <p className="step mb-0">
                              <i>{timeRendered}</i>
                            </p>
                          </div>
                        </div>
                        <div className="col-xs-6 col-xs-mt-2 col-sm-9 text-left">
                          <p>{i.text}</p>
                        </div>
                      </div>
                      <hr />
                    </div>
                  );
                })
              ) : (
                <div className="container-fluid">
                  <div className="d-flex flex-column justify-content-center">
                    <p className="mb-0">Instructions not provided.</p>
                    <hr />
                  </div>
                </div>
              )}
              <div className="d-flex flex-column">
                <div>
                  <Link className="my-3" to="/allrecipes">
                    <button type="button" className="btn btn-success">
                      Return to all recipes
                    </button>
                  </Link>
                </div>
                <div>
                  {
                    this.state.allReviews && this.state.allReviews.length > 0 && this.state.allReviews.map(review => (
                        <div>
                          <h3>User: {review.owner}</h3>
                          <div>Score: {review.score}</div>
                          <div>Difficulty: {review.difficulty}</div>
                          <p>Comments: {review.comment}</p>
                        </div>
                      ))
                  }
                </div>
                {
                  this.props.loggedInUser && (
                    <div className="mt-5">
                      <AddReview loggedInUser={this.props.loggedInUser} getMessage={this.props.getMessage} successMessage={this.props.successMessage} difficulty={this.props.difficulty} message={this.props.message} {...this.props} />
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        ) : (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "80vh" }}
          >
            <Loader type="Puff" color="#76ff03" height={200} width={200} />
          </div>
        )}
      </>
    );
  }
}

export default RecipeDetails;
