import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIAccess from './api/api-access';
import AuthService from "./auth/auth-services";

class ConfirmDelete extends Component {
  constructor(props) {
    super(props);

    this.apiEndpoints = new APIAccess();
    this.service = new AuthService();
    this.deleteUser = this.deleteUser.bind(this);
    this.redirectPage = this.redirectPage.bind(this);

  }

  componentDidMount() {

  }

  deleteUser() {
    const { username } = this.props.loggedInUser;

    this.apiEndpoints.deleteUser(username)
      .then(response => {
        this.props.getMessage(response.status, response.data.message);
        this.redirectPage(this.props.successMessage);
        this.props.getUser(null);
        })
        .catch(err => console.log(err));
  }

  redirectPage(success) {
    if (success) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className="confirm-delete">
        <h3> Are you sure you want to delete your account? </h3>
        <Link to='/' onClick={this.deleteUser}>DELETE </Link>
        <Link to={`/user/${this.props.loggedInUser.username}`}> CANCEL </Link>
      </div>
    )
  }

}

export default ConfirmDelete;
