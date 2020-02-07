import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIAccess from './api/api-access';
import AuthService from "./auth/auth-services";
import Message from './Message';
import Loader from "react-loader-spinner";

class ConfirmDeleteRecipe extends Component {
  constructor(props) {
    super(props);

    this.state ={
      loader: false,
    };

    this.apiEndpoints = new APIAccess();
    this.service = new AuthService();
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.redirectPage = this.redirectPage.bind(this);

  }

  deleteRecipe() {
    const { recipeID } = this.props.match.params;
    this.setState({
      loader: true,
    });

    this.apiEndpoints.deleteRecipe(recipeID)
      .then(response => {
        this.props.getMessage(response.status, response.data.message);
        this.redirectPage(this.props.successMessage);
        this.props.getUser(null);
        this.setState({
          loader: false,
        });
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
      {
        this.state.loader ? (
          <div className='d-flex align-items-center justify-content-center' style={{ height:'80vh'}}>
            <Loader type="Puff" color="#76ff03" height={200} width={200} />
          </div>
        ) : (
          <div>
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
      </div>
    )
  }

}

export default ConfirmDeleteRecipe;
