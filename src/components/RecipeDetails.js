import React, { Component } from 'react';
const recipesCleanTestAlex = require('./AlexInput.js');

class RecipeDetails extends Component {
  constructor(props) {
    super(props);

  this.state = {
      recipes: recipesCleanTestAlex,
      searchWord: '',
      uniqueRecipe: {},
      determinedOwner: '',
      cleanDishType: '',
      ingredients: '',
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const givenUniqueRecipe = recipesCleanTestAlex.find(x => x._id === this.props.match.params.recipeID)
    let givenDeterminedOwner = '';
      if (givenUniqueRecipe.owner === undefined){
        givenDeterminedOwner = givenUniqueRecipe.ownerAPI
      } else {
        givenDeterminedOwner = givenUniqueRecipe.owner.replace(givenUniqueRecipe.owner)
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
      } else {
        givenIngredients = givenUniqueRecipe.ingredients[0].split("\n");
        let removed = givenIngredients.splice(givenIngredients.length -1 ,1);
      }
    
    this.setState({
      uniqueRecipe: givenUniqueRecipe,
      determinedOwner: givenDeterminedOwner,
      cleanDishType: givenCleanDishType,
      cuisine: givenCuisine,
      ingredients: givenIngredients
    })

  }

  render(){
    console.log(this.state.uniqueRecipe.ingredients)
    return(
      <>
      {this.state.uniqueRecipe.ingredients ? (

        <div id="detailed-recipe" className="container-fluid" style={{width: '85%'}}>
          <div className="row d-flex justify-content-center mb-4 mt-4">
             <div><h3><b>{this.state.uniqueRecipe.name}</b></h3></div>
             <div><h5>{this.state.uniqueRecipe.description}</h5></div>         
          </div>

            <div className="row">
                <div id="individual-left" className="col-sm">
                    <img src={this.state.uniqueRecipe.picture} alt="Recipe-Text"></img>
                </div>
                <div id="individual-right" className="col-sm d-flex flex-column justify-content-around">
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
                  {this.state.ingredients.map(i => {
                      return <li>{i}</li>;
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
                      <div className="col-xs-6 col-sm-9">{i.text}</div>
                    </div>
                    <hr /> 
                  </div>

                )
              })}
            </div>


          <a href="/allrecipes">
            <button>Return to all recipes</button>
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

{/* <p>{this.state.uniqueRecipe.ingredients}</p>  */}



// export default RecipeDetails;

// <div className='one-recipe-detailed'>
      
// {this.state.recipes.map(element => {
  
//     let determinedOwner = '';
//     if (element.owner === undefined){
//       determinedOwner = element.ownerAPI
//     } else {
//       determinedOwner = element.owner.replace(element.owner)
//     }

//     let cleanDishType = (element.dishTypes[0]).slice(0,1).toUpperCase()+(element.dishTypes[0]).slice(1,(element.dishTypes[0]).length);

//     return (<RecipeCard name={element.name} image={element.picture} description={element.description} owner={determinedOwner} link={element._id} time={element.totalTimeMinutes} vegan={element.vegan} cuisines={element.cuisines} dishTypes={cleanDishType}/>);
// })}  
// </div>

export default RecipeDetails;