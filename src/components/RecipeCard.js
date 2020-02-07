import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = props => {
  return (
    <div
      id="individual-recipe"
      className="container-fluid"
      style={{ width: "85%" }}
    >
      <div className="row">
        <div id="individual-left" className="col-md-6 min-vh-40">
          <Link to={props.link}>
            <img className='recipe-img' src={props.image} alt="Recipe-Text"></img>
          </Link>
        </div>

        <div
          id="individual-right"
          className="recipe-card-infos col-md-6 d-flex flex-column align-items-start"
        >
          <div className="mt-3">
            <Link to={props.link}>
              <h3>{props.name}</h3>
            </Link>
          </div>
          <div>
            <h4>{props.description}</h4>
          </div>
          <div>
            <p>
              <img className='recipe-card-img' src="https://res.cloudinary.com/dxatyucj2/image/upload/v1581042983/go-green/hat-icon_txapif.png" alt="chef" />
              <b>Created by:  </b>
              {props.owner}
            </p>
          </div>
          <div>
            <p>
              <img className='recipe-card-img' src="https://res.cloudinary.com/dxatyucj2/image/upload/v1581042982/go-green/clock_quyo32.png" alt="clock" />
              <b>Prep time: </b>
              {props.time} minutes
            </p>
          </div>
          <div>
            <p>
              <img className='recipe-card-img' src="https://res.cloudinary.com/dxatyucj2/image/upload/v1581042996/go-green/food2_qfzdzm.png" alt="plate" />
              <b>Dish type: </b>
              {props.dishTypes}
            </p>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default RecipeCard;
