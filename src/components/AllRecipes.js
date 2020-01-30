import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import recipeCard from './RecipeCard.js'
import axios from 'axios';
const recipesCleanTestAlex = require('./AlexTestInput.js');


class AllRecipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: recipesCleanTestAlex,
      searchWord: '',
    };

    this.handleChange = this.handleChange.bind(this);
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
                  determinedOwner = element.owner
                }
                return (<RecipeCard name={element.name} picture={element.picture} description={element.description} owner={determinedOwner} link={element._id} />);
            })}  
          </div>
      </div>
    )
  }

}

export default AllRecipes;