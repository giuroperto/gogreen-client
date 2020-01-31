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
    };
  }

  componentDidMount() {
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
    
    this.setState({
      uniqueRecipe: givenUniqueRecipe,
      determinedOwner: givenDeterminedOwner,
      cleanDishType: givenCleanDishType,
      cuisine: givenCuisine
    })

  }

  render(){
    console.log(this.state.uniqueRecipe.ingredients)
    return(
      <>
      {this.state.uniqueRecipe.ingredients ? (

        <div id="detailed-recipe" className="container-fluid" style={{width: '85%'}}>
          <div className="row">
              <h3>{this.state.uniqueRecipe.name}</h3>
          </div>

            <div className="row">
                <div id="individual-left" className="col-sm">
                    <img src={this.state.uniqueRecipe.picture} alt="Recipe-Text"></img>
                </div>
                <div id="individual-right" className="col-sm">

                    <div className="row">
                        <h4>{this.state.uniqueRecipe.description}</h4>
                    </div>
                    <div className="row">
                        <p><b>Created by: </b>{this.state.determinedOwner}</p> 
                    </div>
                    <div className="row">
                        <p><b>Prep time: </b>{this.state.uniqueRecipe.totalTimeMinutes} minutes</p> 
                    </div>
                    <div className="row">
                        <p><b>Dish type: </b>{this.state.cleanDishType}</p> 
                    </div>       
                    <div className="row">
                        <p><b>Cuisine: </b>{this.state.cuisine}</p> 
                    </div>          
                </div>
            </div>
            <div>
              <div className="row">
                <h3>Ingredients</h3>
              </div>
              <div className="row">
                <div>
                  <ul>
                  {this.state.uniqueRecipe.ingredients[0].split("\n").map(i => {
                      return <li>{i}</li>;
                  })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="row">
              <h3>Instructions</h3>
              {this.state.uniqueRecipe.instructions.map(i => {
                let timeRendered = "";
                i.stepTimeMinutes ? (timeRendered = `${i.stepTimeMinutes} minutes`) : (timeRendered = "");
                return (
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-sm col-4">
                        <div className="row"><b>Step {i.step}</b></div>
                        <div className="row"><i>{timeRendered}</i></div>
                      </div>
                      <div className="col-sm col-8">{i.text}</div>
                    </div>
                    <hr /> 
                  </div>

                )
              })}
            </div>


          <h1>Recipe Details!</h1>
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