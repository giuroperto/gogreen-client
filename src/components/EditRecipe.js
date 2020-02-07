import React, { Component } from 'react';
import EditRecipeForm from './recipe-forms/EditRecipeForm';
import APIAccess from './api/api-access';
import Loader from "react-loader-spinner";
import {Link} from 'react-router-dom';

class EditRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueRecipe: null,
      loader: true,
    }
    this.apiEndpoints = new APIAccess();
  }

  componentDidMount() {
    const { recipeID } = this.props.match.params;
    let self = this;


    this.apiEndpoints.getOneRecipe(recipeID)
    .then(response => {
      self.setState({
        uniqueRecipe: response.data,
        loader: false,
    })})
    .catch(err => console.log(err));
  }

  render() {
    return(
      <div>
        { this.state.loader ? (
          <div className='d-flex align-items-center justify-content-center' style={{ height:'80vh'}}>
            <Loader type="Puff" color="#76ff03" height={200} width={200} />
          </div>
        ) : (
          <div className="container d-flex flex-column justify-content-center my-5">
            {this.state.uniqueRecipe !== null && <EditRecipeForm {...this.props} recipe={this.state.uniqueRecipe} allData={this.props.allData}/>}
          </div>
        )}
      </div>
    )
  }
}

export default EditRecipe;