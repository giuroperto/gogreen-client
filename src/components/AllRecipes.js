import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard.js'
import axios from 'axios';
const recipesCleanTestAlex = require('./AlexInput.js');

let fullRecipeDatabase = recipesCleanTestAlex;
let displayedRecipeDatabase = fullRecipeDatabase;

class AllRecipes extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {

    // if (this.props.allData.searchWord != '') {
    //   displayedRecipeDatabase = displayedRecipeDatabase.filter(e => {
    //     let givenSearchWord = this.props.allData.searchWord.toUpperCase();
    //     return (e.ingredients.toUpperCase().includes(givenSearchWord) || e.name.toUpperCase().includes(givenSearchWord) || e.description.toUpperCase().includes(givenSearchWord))
    //   })
    // }

    // if (this.props.allData.searchDishType != '') {
    //   displayedRecipeDatabase = displayedRecipeDatabase.filter(e => {
    //     return (e.dishTypes.includes(this.props.allData.searchDishType))
    //   })
    // }

    // if (this.props.allData.searchCuisine != '') {
    //   displayedRecipeDatabase = displayedRecipeDatabase.filter(e => {
    //     return (e.cuisines.includes(this.props.allData.searchCuisine))
    //   })
    // }

    // Difficulty TBD
    // if (this.props.allData.searchCookingLevel != '') {
    //   displayedRecipeDatabase = displayedRecipeDatabase.filter(e => {
    //     return (e.dishTypes.includes(this.props.allData.searchCookingLevel))
    //   })
    // }

  }




  // PREVIOUS
  //       <input type="text" name="searchWord" id="searchWord" value={this.state.searchWord} placeholder="Search recipe..." onChange={this.handleChange} />
  //       {
  //         this.props.allData.recipes.filter(recipe => recipe.name.toLowerCase().includes(this.state.searchWord.toLowerCase())).map(recipe => <Link to="/main" className="recipes-link">{recipe.name} </Link>)

  // this.props.allData.allRecipes

render(){
  console.log(this.props.allData.searchWord);
    return(
      <div className='all-recipes-full-list'>
          <div className='all-recipes-each-listed'>
            {displayedRecipeDatabase && displayedRecipeDatabase.map(element => {
              
                let determinedOwner = '';
                if (element.owner === undefined){
                  determinedOwner = element.ownerAPI
                } else {
                  determinedOwner = element.owner.replace(element.owner)
                }

                let cleanDishType = '';
                if (element.dishTypes[0] === undefined) {
                  cleanDishType = "N/A"
                } else {
                  cleanDishType = (element.dishTypes[0]).slice(0,1).toUpperCase()+(element.dishTypes[0]).slice(1,(element.dishTypes[0]).length)
                }
               
                let cleanLink = "/recipe/"+ element._id

                return (<RecipeCard name={element.name} image={element.picture} description={element.description} owner={determinedOwner} link={cleanLink} time={element.totalTimeMinutes} vegan={element.vegan} cuisines={element.cuisines} dishTypes={cleanDishType} allRecipes = {this.props.allData.allRecipes}/>);

            })}  
          </div>
          <a href="/">
            <button>Return home</button>
          </a>
      </div>
    )
  }

}

export default AllRecipes;


//TODO adjust dishtype and cleanlink to work properly + maybe load only 10 in ten, so add a button of LOAD MORE