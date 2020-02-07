import React from "react";
import { Link } from 'react-router-dom';

const ProfileRecipeCard = props => {
    return (
        <div className="container individual-recipe">
            <div className="row d-flex flex-row justify-content-center align-items-center" style={{margin: '0 auto'}}>
                    <div className="col-sm-6 individual-left"
                        style={{height: '24vh', width: '95%', backgroundImage: `url(${props.picture})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                        <Link to={`/recipe/${props._id}`} style={{width: '100%', height: '100%', display: 'block'}}></Link>
                    </div>
                {/* <div className="col-sm-4 d-flex flex-column ml-3 justify-content-start align-items-start individual-right">
                    <div className="mt-1 mb-4">
                        <Link to={`/recipe/${props._id}`}>
                            <h3 className="mb-0">{props.name}</h3>
                        </Link>
                    <span className="recipe-description">{props.description}</span>
                    </div>
                    <div style={{textAlign: 'start'}}>
                        <p><b>Created by: </b>{props.owner.username}</p> 
                        <p><b>Prep time: </b>{props.totalTimeMinutes} minutes</p> 
                        <p><b>Dish type: </b>{props.dishTypes[0]}</p> 
                    </div>
                </div> */}
                <div
                  id="individual-right"
                  className="profile-recipe-card-infos col-md-6 d-flex flex-column align-items-start"
                >
                  <div className="mt-3">
                    <Link to={`/recipe/${props._id}`}>
                      <h3>{props.name}</h3>
                    </Link>
                  </div>
                  <div>
                    <h4>{props.description}</h4>
                  </div>
                  <div>
                    <p>
                      <img className='profile-recipe-card-img' src="../images/hat-icon.png" alt="chef" />
                      <b>Created by:  </b>
                      {props.owner.username}
                    </p>
                  </div>
                  <div>
                    <p>
                      <img className='profile-recipe-card-img' src="../images/clock.png" alt="clock" />
                      <b>Prep time: </b>
                      {props.totalTimeMinutes} minutes
                    </p>
                  </div>
                  <div>
                    <p>
                      <img className='profile-recipe-card-img' src="../images/food2.png" alt="plate" />
                      <b>Dish type: </b>
                      {props.dishTypes[0]}
                    </p>
                  </div>
                </div>
            </div>
            <hr />    
        </div>
    )
} 

export default ProfileRecipeCard;


