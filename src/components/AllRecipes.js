import React, { Component } from 'react';
import AOS from "aos";
import { Link } from 'react-router-dom';
import "aos/dist/aos.css";
import RecipeCard from './RecipeCard.js';
import Loader from "react-loader-spinner";
import axios from 'axios';

AOS.init({ offset: 80 });

class AllRecipes extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

render(){
    return(
      <>
      {(this.props.allData.displayedRecipes) ? (

      <div className='all-recipes-full-list mb-3'>
      <div className="all-recipes-header d-flex justify-content-center">
        <h2>Find the Perfect Recipe for Your Next Meal</h2>
      </div>
      <div className='sub-header d-flex justify-content-center'>
      <p>Narrow your filter by <span>cuisine</span>, <span>dish type</span> or <span>cooking level</span></p>
      </div>

          <div className='all-recipes-each-listed'>
            {this.props.allData.displayedRecipes && this.props.allData.displayedRecipes.map(element => {
                let determinedOwner = '';
                if (element.ownerAPI !== undefined){
                  determinedOwner = element.ownerAPI
                } else {
                  determinedOwner = element.owner.username
                }
                let cleanDishType = '';
                if (element.dishTypes[0] === undefined) {
                  cleanDishType = "N/A"
                } else {
                  cleanDishType = (element.dishTypes[0]).slice(0,1).toUpperCase()+(element.dishTypes[0]).slice(1,(element.dishTypes[0]).length)
                }

                let cleanLink = "/recipe/"+ element._id

                return (<div  data-aos="fade-right"><RecipeCard name={element.name} image={element.picture} description={element.description} owner={determinedOwner} link={cleanLink} time={element.totalTimeMinutes} vegan={element.vegan} cuisines={element.cuisines} dishTypes={cleanDishType} allRecipes = {this.props.allData.allRecipes} loggedInUser={this.props.allData.loggedInUser} recipeID={element._id} /></div>);

            })}  
          </div>
          <Link to="/">
            <button type="button" className="btn btn-success">Return home</button>
          </Link>
      </div>
      ) : (
        <div className='d-flex align-items-center justify-content-center' style={{ height:'80vh'}}>
          <Loader type="Puff" color="#76ff03" height={200} width={200} />
        </div>
      )}
      </>
    )
  }
}

export default AllRecipes;
