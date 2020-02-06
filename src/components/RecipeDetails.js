import React, { Component } from 'react';
import Message from './Message';
import {Link} from 'react-router-dom';
import APIAccess from "./api/api-access";

class RecipeDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchWord: '',
      uniqueRecipe: {},
      determinedOwner: '',
      cleanDishType: '',
      ingredients: '',
      count: 0
    };
    this.apiEndpoints = new APIAccess();
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    this.apiEndpoints.getOneRecipe(this.props.match.params.recipeID)
    .then(response => {
      console.log('im in')
      let givenUniqueRecipe = response.data;
      let givenDeterminedOwner = '';
      if (givenUniqueRecipe.owner === undefined){
        givenDeterminedOwner = givenUniqueRecipe.ownerAPI
      } else {
        givenDeterminedOwner = givenUniqueRecipe.owner.username
      }
      let givenCleanDishType = (givenUniqueRecipe.dishTypes[0]).slice(0,1).toUpperCase()+(givenUniqueRecipe.dishTypes[0]).slice(1,(givenUniqueRecipe.dishTypes[0]).length);
      let givenCuisine = '';
        if (givenUniqueRecipe.cuisines[0] === undefined){
          givenCuisine = "Not specified"
        } else {
          givenCuisine = givenUniqueRecipe.cuisines[0]
        }
      let givenIngredients = [];
        if (givenUniqueRecipe.ingredients[0] === undefined){
        } else if (givenUniqueRecipe.ingredients.length === 1) {
          givenIngredients = givenUniqueRecipe.ingredients[0].split("\n");
          let removed = givenIngredients.splice(givenIngredients.length -1 ,1);
        } else {
          givenIngredients = givenUniqueRecipe.ingredients
        }
      
      this.setState({
        uniqueRecipe: givenUniqueRecipe,
        determinedOwner: givenDeterminedOwner,
        cleanDishType: givenCleanDishType,
        cuisine: givenCuisine,
        ingredients: givenIngredients
      })
    })
    .catch(err => console.log(err))
  }


  //TODO add fork button for logged users


  render() {
    let stepCount = 0;
    return(
      <>
      {this.state.uniqueRecipe.ingredients ? (

        <div id="detailed-recipe" className="container-fluid mb-3" style={{width: '85%'}}>
          {
          this.props.message && <Message successMessage={this.props.successMessage} message={this.props.message}/>
          }
          <div className="row d-flex flex-column justify-content-center align-items-center mb-2 mt-4">
            <div className="recipe-details-picture">
                <img src={this.state.uniqueRecipe.picture} alt={this.state.uniqueRecipe.name}></img>
            </div>
            <div className="recipe-details-name">
               <h3>{this.state.uniqueRecipe.name}</h3>
            </div>
            <div>
              <span className="recipe-description">{this.state.uniqueRecipe.description}</span>
            </div>         
          </div>
            <div className="row recipe-details-general-info">
              <div className="col-sm d-flex recipe-details-general-info-col">
                <div className="individual-detail">
                  <img className='recipe-details-icon' src="../images/hat-icon.png" alt="Contributed by" />
                  <p>{this.state.determinedOwner}</p> 
                </div>
                <div className="individual-detail">
                  <img className='recipe-details-icon' src="../images/clock.png" alt="Prep time" />
                  <p>{this.state.uniqueRecipe.totalTimeMinutes} minutes</p> 
                </div>
              </div>
              <div className="col-sm d-flex recipe-details-general-info-col">
                <div className="individual-detail">
                  <img className='recipe-details-icon' src="../images/food2.png" alt="Dish type" />
                  <p>{this.state.cleanDishType}</p> 
                </div>       
                <div className="individual-detail">
                  <img className='recipe-details-icon' src="../images/cuisine-icon.png" alt="Cuisine" />
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
                  <ul>
                  {this.state.ingredients.map((i, idx) => {
                      return <li key={idx}>{i}</li>;
                  })}
                  </ul>
                </div>
              </div>
            </div>

                <div className='d-flex justify-content-center text-container2'>
                <h4 className="mb-4 mt-4">Instructions</h4>
                </div>
            <div className="row d-flex justify-content-center instructions-div">
                


              {(this.state.uniqueRecipe.instructions.length > 0) ?
              this.state.uniqueRecipe.instructions.map(i => {
                stepCount += 1;
                let timeRendered = "";
                i.stepTimeMinutes ? (timeRendered = `${i.stepTimeMinutes} minutes`) : (timeRendered = "");
                return (
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-xs-6 col-sm-3 d-flex flex-column justify-content-center">
                        <div><p className="step mb-0"><b>Step {stepCount}</b></p></div>
                        <div><p className="step mb-0"><i>{timeRendered}</i></p></div>
                      </div>
                      <div className="col-xs-6 col-xs-mt-2 col-sm-9 text-left">{i.text}</div>
                    </div>
                    <hr /> 
                  </div>

                )
              })
              : 
              <div className="container-fluid">
                <div className="d-flex flex-column justify-content-center">
                  <p className="mb-0">Instructions not provided.</p>
                  <hr /> 
                </div>
              </div>
              }



            </div>

            
            <div className='d-flex justify-content-center'>
              <div className="edit-button mb-3">
                {this.props.loggedInUser && this.state.uniqueRecipe.owner && this.state.uniqueRecipe.owner.username ===
                  this.props.loggedInUser.username && (
                  <Link to={`/recipe/${this.props.match.params.recipeID}/edit`}>
                    <button type="button" class="btn btn-secondary">
                      Edit Recipe
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

          <Link to="/allrecipes">
            <button type="button" className="btn btn-success">Return to all recipes</button>
          </Link>
        </div>
      ) : (
      <h1>Loading!!!</h1>)
      //Loader
    }
    </>
    )
  }
}

export default RecipeDetails;