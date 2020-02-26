import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIAccess from './api/api-access';
import AuthService from "./auth/auth-services";
import Message from '../components/Message';
import Loader from "react-loader-spinner";

class ConfirmDeleteReview extends Component {
  constructor(props) {
    super(props);

    this.state ={
      loader: false,
    };

    this.apiEndpoints = new APIAccess();
    this.deleteReview = this.deleteReview.bind(this);
    this.redirectPage = this.redirectPage.bind(this);

  }

  deleteReview() {
    
    const { reviewid, recipeid } = this.props.match.params;
    this.setState({
      loader: true,
    });

    this.apiEndpoints.deleteReview(reviewid)
      .then(response => {
        this.props.getMessage(response.status, response.data.message);
        this.redirectPage(this.props.successMessage);
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
      this.props.history.push(`/recipe/${this.props.match.params.recipeid}`);
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
            <h3> Are you sure you want to delete this review? </h3>
          </div>
          <div className="confirm-delete-buttons">
          <div>
              <Link to={`/recipe/${this.props.match.params.recipeid}`} onClick={this.deleteReview}>
                <button type="button" className="btn btn-danger individual-button">DELETE</button>
              </Link>
            </div>
            <div>
              <Link to={`/recipe/${this.props.match.params.recipeid}`}>
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

export default ConfirmDeleteReview;
