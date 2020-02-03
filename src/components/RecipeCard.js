import React from "react";
import { Link, Switch, Route } from 'react-router-dom';

const RecipeCard = props => {
    return (
        <div id="individual-recipe" className="container-fluid" style={{width: '85%'}}>
            <div className="row">
                
                <div id="individual-left" className="col-md-6 min-vh-40">
                    <Link to={props.link}>
                        <img src={props.image} alt="Recipe-Text"></img>
                    </Link>
                </div>
                
                <div id="individual-right" className="col-md-6 d-flex flex-column justify-content-center">
                    <div className="mt-3">
                        <Link to={props.link}>
                            <h3>{props.name}</h3>
                        </Link>
                    </div>
                    <div>
                        <h4>{props.description}</h4>
                    </div>
                    <div>
                        <p><b>Created by: </b>{props.owner}</p> 
                    </div>
                    <div>
                        <p><b>Prep time: </b>{props.time} minutes</p> 
                    </div>
                    <div>
                        <p><b>Dish type: </b>{props.dishTypes}</p> 
                    </div>              
                </div>
            </div>
            <hr />    
        </div>
    )
} 

export default RecipeCard;


