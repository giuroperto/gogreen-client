import React from "react";
import { Link, Switch, Route } from 'react-router-dom';

const RecipeCard = props => {
    return (
<div id="individual-recipe">
    <Link to={props.link}>
        <div id="individual-left">
            <img src={props.image} alt="Recipe-Text"></img>
        </div>
        <div id="individual-right">
            <h1>{props.name}</h1>
            <h2>{props.description}</h2>
            <p><b>Created by: </b>{props.owner}</p>
            <hr />                
        </div>
    </Link>
</div>
    )
} 

export default RecipeCard;


