import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIAccess from './api/api-access';
import AuthService from "./auth/auth-services";
import Message from '../components/Message';

class ConfirmDelete extends Component {
  constructor(props) {
    super(props);

    this.apiEndpoints = new APIAccess();
    this.service = new AuthService();
    this.deleteUser = this.deleteUser.bind(this);
    this.redirectPage = this.redirectPage.bind(this);

  }

  deleteUser() {
    const { username } = this.props.loggedInUser;

    this.apiEndpoints.deleteUser(username)
      .then(response => {
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
        <h3> Are you sure you want to delete your account? </h3>
        <Link to='/' onClick={this.deleteUser}>DELETE </Link>
        <Link to={`/user/${this.props.loggedInUser.username}`}> CANCEL </Link>
      </div>
    )
  }

}

export default ConfirmDelete;
