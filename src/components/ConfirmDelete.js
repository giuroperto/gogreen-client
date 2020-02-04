import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIAccess from './api/api-access';

class ConfirmDelete extends Component {
  constructor(props) {
    super(props);

    this.apiEndpoints = new APIAccess();
    this.deleteUser = this.deleteUser.bind(this);
    this.redirectPage = this.redirectPage.bind(this);

  }

  deleteUser() {
    const { username } = this.props.loggedInUser;
    this.apiEndpoints.delete(username)
      .then(response => {
        this.props.getMessage(response.status, response.data.message);
        this.redirectPage(this.props.successMessage, username)
        // redirecionar e mostrar mensagem
      })
      .catch(err => console.log(err));
  }

  redirectPage(success, username) {
    if (success) {
      // redirecionar para a pagina
      // this.props.history.push(`/user/${username}`);
    }
  }

  render() {
    return (
      <div className="confirm-delete">
        <Link to='/' onClick={this.deleteUser}>DELETE </Link>
        <Link to={`/user/${this.props.loggedInUser.username}`}> CANCEL </Link>
      </div>
    )
  }

}

export default ConfirmDelete;

// passar get message, successmessage, username, loggedinuser

// passar username por props
// when deleting, first logout and then delete user and redirect home
