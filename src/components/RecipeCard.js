import React from "react";
import { Link, Switch, Route } from 'react-router-dom';

const RecipeCard = props => {
    return (
<div id="individual-recipe" className="container-fluid" style={{width: '85%'}}>
    
    <div className="row">
        <Link to={props.link}>
        <div id="individual-left" className="col-sm">
            <img src={props.image} alt="Recipe-Text"></img>
        </div>
        </Link>
        <div id="individual-right" className="col-sm">
            <div className="row">
            <Link to={props.link}>
                <h3>{props.name}</h3>
            </Link>
            </div>
            <div className="row">
                <h4>{props.description}</h4>
            </div>
            <div className="row">
                <p><b>Created by: </b>{props.owner}</p> 
            </div>
            <div className="row">
                <p><b>Prep time: </b>{props.time} minutes</p> 
            </div>
            <div className="row">
                <p><b>Dish type: </b>{props.dishTypes}</p> 
            </div>              
        </div>
    </div>
    <hr />    
</div>
    )
} 

export default RecipeCard;


