import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard.js'
// import axios from 'axios';
const recipesCleanTestAlex = require('./AlexInput.js');


class AllRecipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: recipesCleanTestAlex,
      searchWord: '',
    };

    // this.handleChange = this.handleChange.bind(this);
  }

  // handleChange(event) {
  //   const { value } = event.target;
  //   this.setState({
  //     searchWord: value,
  //   });
  // }

  // PREVIOUS
  // render() {
  //   return(
  //     <div>
  //       <input type="text" name="searchWord" id="searchWord" value={this.state.searchWord} placeholder="Search recipe..." onChange={this.handleChange} />
  //       {
  //         this.props.recipes.filter(recipe => recipe.name.toLowerCase().includes(this.state.searchWord.toLowerCase())).map(recipe => <Link to="/main" className="recipes-link">{recipe.name} </Link>)
  //       }
  //     </div>
  //   )
  // }


render(){
    return(
      <div className='all-recipes-full-list'>
          <div className='all-recipes-each-listed'>
            {this.state.recipes.map(element => {
              
                let determinedOwner = '';
                if (element.owner === undefined){
                  determinedOwner = element.ownerAPI
                } else {
                  determinedOwner = element.owner.replace(element.owner)
                }

                let cleanDishType = (element.dishTypes[0]).slice(0,1).toUpperCase()+(element.dishTypes[0]).slice(1,(element.dishTypes[0]).length);

                return (<RecipeCard name={element.name} image={element.picture} description={element.description} owner={determinedOwner} link={element._id} time={element.totalTimeMinutes} vegan={element.vegan} cuisines={element.cuisines} dishTypes={cleanDishType}/>);
            })}  
          </div>
      </div>
    )
  }

}

export default AllRecipes;