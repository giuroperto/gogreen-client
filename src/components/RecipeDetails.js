import React, { Component } from 'react';
import Message from './Message';
import {Link} from 'react-router-dom';

class RecipeDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchWord: '',
      uniqueRecipe: {},
      determinedOwner: '',
      cleanDishType: '',
      ingredients: '',
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    // ao adicionar receita, redirecionamos pra cá
    // o que dá um erro
    //TODO resolver esse problema

    let recipesDB = this.props.allRecipes;
    // NOTE: IF DATABASE CUTS givenUniqueRecipe WILL NOT BE DEFINED, AS SUCH givenUniqueRecipe.owner CAUSES ERROR
    // Review -> Potential unique error message catch based on defined?
    const givenUniqueRecipe = recipesDB.find(x => x._id === this.props.match.params.recipeID)
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

  }


  //TODO add fork button for logged users


  render() {
    return(
      <>
      {this.state.uniqueRecipe.ingredients ? (

        <div id="detailed-recipe" className="container-fluid" style={{width: '85%'}}>
          {
          this.props.message && <Message successMessage={this.props.successMessage} message={this.props.message}/>
          }
          <div className="row d-flex flex-column justify-content-center mb-4 mt-4">
             <div><h3><b>{this.state.uniqueRecipe.name}</b></h3></div>
             <div><span className="recipe-description">{this.state.uniqueRecipe.description}</span></div>         
          </div>

            <div className="row ">
                <div id="individual-left" className="col-sm">
                    <img src={this.state.uniqueRecipe.picture} alt="Recipe-Text" style={{maxWidth: '30vw', height: '100%'}}></img>
                </div>
                <div id="individual-right" className="col-sm d-flex flex-column justify-content-center align-items-start">
                    <div>
                        <p><b>Created by: </b>{this.state.determinedOwner}</p> 
                    </div>
                    <div>
                        <p><b>Prep time: </b>{this.state.uniqueRecipe.totalTimeMinutes} minutes</p> 
                    </div>
                    <div>
                        <p><b>Dish type: </b>{this.state.cleanDishType}</p> 
                    </div>       
                    <div>
                        <p><b>Cuisine: </b>{this.state.cuisine}</p> 
                    </div>          
                </div>
            </div>
            <div className="align-center">
              <div className="row d-flex justify-content-center">
                <h4 className="mb-4 mt-4">Ingredients</h4>
              </div>
              <div className="row d-flex justify-content-center mr-1 ml-1">
                <div className="row text-left">
                  <ul>
                  {this.state.ingredients.map((i, idx) => {
                      return <li key={idx}>{i}</li>;
                  })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="row d-flex justify-content-center">
              <h4 className="mb-4 mt-4">Instructions</h4>
              {this.state.uniqueRecipe.instructions.map(i => {
                let timeRendered = "";
                i.stepTimeMinutes ? (timeRendered = `${i.stepTimeMinutes} minutes`) : (timeRendered = "");
                return (
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-xs-6 col-sm-3 d-flex flex-column justify-content-center">
                        <div><p className="step mb-0"><b>Step {i.step}</b></p></div>
                        <div><p className="step mb-0"><i>{timeRendered}</i></p></div>
                      </div>
                      <div className="col-xs-6 col-xs-mt-2 col-sm-9 text-left">{i.text}</div>
                    </div>
                    <hr /> 
                  </div>

                )
              })}
            </div>

            
            <div className='d-flex justify-content-center'>
              <div className="edit-button mr-3">
                {this.props.loggedInUser && this.state.uniqueRecipe.owner.username ===
                  this.props.loggedInUser.username && (
                  <button type="button" class="btn btn-secondary">
                    <Link to={`/recipe/${this.props.match.params.recipeID}/edit`}>
                      Edit Recipe
                    </Link>
                  </button>
                )}
              </div>
              <div className="edit-button ml-3">
                {this.props.loggedInUser && (
                  <button type="button" class="btn btn-secondary">
                    <Link to={``}>
                      Fork this Recipe
                    </Link>
                  </button>
                )}
              </div>
            </div>

          <a href="/allrecipes">
            <button type="button" class="btn btn-secondary">Return to all recipes</button>
          </a>
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