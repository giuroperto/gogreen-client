import React, { Component } from 'react';
import EditRecipeForm from './recipe-forms/EditRecipeForm';
import APIAccess from './api/api-access';
import {Link} from 'react-router-dom';

class EditRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueRecipe: null,
    }
    this.apiEndpoints = new APIAccess();
  }

  componentDidMount() {
    const { recipeID } = this.props.match.params;
    console.log(this.props);
    let self = this;


    this.apiEndpoints.getOneRecipe(recipeID)
    .then(response => {
      self.setState({
        uniqueRecipe: response.data
    })})
    .catch(err => console.log(err));
  }

  render() {
    return(
      <div className="container d-flex flex-column justify-content-center my-5">
        {this.state.uniqueRecipe !== null && <EditRecipeForm {...this.props} recipe={this.state.uniqueRecipe} allData={this.props.allData}/>}
      </div>
    )
  }
}

export default EditRecipe;