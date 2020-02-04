import React, { Component } from 'react';
import EditRecipeForm from './recipe-forms/EditRecipeForm';
import APIAccess from './api/api-access';

class EditRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueRecipe: null,
      flag: true
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
        flag: false,
        uniqueRecipe: response
    }, () => console.log(response, self.state))})
    .catch(err => console.log(err));
  }

  render() {
    return(
      <div className="container d-flex justify-content-center">
        {this.state.uniqueRecipe !== null && <EditRecipeForm {...this.props} recipe={this.state.uniqueRecipe} allData={this.props.allData}/>}
      </div>
    )
  }
}

export default EditRecipe;