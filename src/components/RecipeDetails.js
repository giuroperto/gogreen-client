import React, { Component } from 'react';
const recipesCleanTestAlex = require('./AlexInput.js');

class RecipeDetails extends Component {
  constructor(props) {
    super(props);

  this.state = {
      recipes: recipesCleanTestAlex,
      searchWord: '',
      uniqueRecipe: recipesCleanTestAlex.find(x => x._id === ':id')
    };
  }

  render(){
    console.log(this.state.uniqueRecipe)
    return(
      <div>
        <h1>Recipe Details!</h1>
      </div>
    )
  }
}

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