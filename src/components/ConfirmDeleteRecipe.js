import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIAccess from './api/api-access';
import AuthService from "./auth/auth-services";
import Message from './Message';

class ConfirmDeleteRecipe extends Component {
  constructor(props) {
    super(props);

    this.apiEndpoints = new APIAccess();
    this.service = new AuthService();
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.redirectPage = this.redirectPage.bind(this);

  }

  deleteRecipe() {
    const { recipeID } = this.props.match.params;

    this.apiEndpoints.deleteRecipe(recipeID)
      .then(response => {
        console.log('dentro do recipe user api')
        this.props.getMessage(response.status, response.data.message);
        this.redirectPage(this.props.successMessage);
        this.props.getUser(null);
      })
      .catch(err => {
        this.props.getMessage(err.response.status, err.response.data.message);
      });
  }

  redirectPage(success) {
    if (success) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className="confirm-delete">
        <div>
          {
            this.props.message && <Message successMessage={this.props.successMessage} message={this.props.message}/>
          }
        </div>
        <h3> Are you sure you want to delete this recipe? </h3>
        <Link to='/' onClick={this.deleteRecipe}>DELETE </Link>
        <Link to={`/recipe/${this.props.match.params.recipeID}`}> CANCEL </Link>
      </div>
    )
  }

}

export default ConfirmDeleteRecipe;
