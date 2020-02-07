import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIAccess from './api/api-access';
import AuthService from "./auth/auth-services";
import Message from '../components/Message';
import Loader from "react-loader-spinner";

class ConfirmDelete extends Component {
  constructor(props) {
    super(props);

    this.state ={
      loader: false,
    };

    this.apiEndpoints = new APIAccess();
    this.service = new AuthService();
    this.deleteUser = this.deleteUser.bind(this);
    this.redirectPage = this.redirectPage.bind(this);

  }

  deleteUser() {
    const { username } = this.props.loggedInUser;
    this.setState({
      loader: true,
    });

    this.apiEndpoints.deleteUser(username)
      .then(response => {
        this.props.getMessage(response.status, response.data.message);
        this.redirectPage(this.props.successMessage);
        this.props.getUser(null);
        this.setState({
          loader: false,
        });
      })
      .catch(err => {
        this.props.getMessage(err.response.data.status, err.response.data.message);
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
          <>
          <div className="confirm-delete-header mb-5">
            <div>
              {
                this.props.message && <Message successMessage={this.props.successMessage} message={this.props.message}/>
              }
            </div>
            <h3> Are you sure you want to delete your account? </h3>
          </div>
          <div className="confirm-delete-buttons">
          <div>
              <Link to='/' onClick={this.deleteUser}>
                <button type="button" className="btn btn-danger individual-button">DELETE</button>
              </Link>
            </div>
            <div>
              <Link to={`/user/${this.props.loggedInUser.username}`}>
                <button type="button" className="btn btn-secondary individual-button">CANCEL</button>
              </Link>
            </div>
          </div>
          </>
        )
      }
      </div>
    )
  }

}

export default ConfirmDelete;
