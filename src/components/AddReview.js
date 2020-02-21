import React, { Component } from 'react';
import APIAccess from './api/api-access';
import Loader from "react-loader-spinner";
import Message from '../components/Message';
import { Link } from 'react-router-dom';

class AddReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: '',
      score: 0,
      difficulty: '',
      title: '',
      comment: '',
      recipeID: '',
    }
    
    this.apiEndpoints = new APIAccess();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.loggedInUser) {
      this.setState({
        owner: this.props.loggedInUser._id,
        recipeID: this.props.match.params,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const {recipeID, owner, score, difficulty, title, comment } = this.state;
    this.apiEndpoints.addReview(recipeID, owner, score, difficulty, title, comment)
      .then(response => {
        this.props.getMessage(response.status, response.data.message);
        this.props.updateReviews(response.data.newReview);
      })
      .catch(err => {
        this.props.getMessage(err.response.status, err.response.data.message);
        console.log(err);
      });
    this.setState({
      score: 0,
      difficulty: '',
      comment: '',
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render () {
    return (
      <div>
        <div>
          <form id="addreview" onSubmit={this.handleSubmit}>
          <h3>Add Review</h3>
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" className="form-control" id="title" name="title" onChange={this.handleChange} value={this.state.title} placeholder="Review's Title" required/>
              </div>
            </div>
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="score">Rating</label>
                <input type="number" className="form-control" id="score" name="score" onChange={this.handleChange} value={this.state.score} min="0" max="5" required/>
              </div>
              <div className="form-group">
                <label htmlFor="difficulty">Difficulty</label>
                <select className="form-control" id="difficulty" name="difficulty" onChange={this.handleChange} value={this.state.difficulty} required>
                <option value=''>Choose...</option> 
                {this.props.difficulty.map(e => <option value={`${e}`}>{e}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="comment">Comments</label>
                <textarea className="form-control" id="comment" name="comment" onChange={this.handleChange} value={this.state.comment} placeholder="Enter your comment here..." required>Enter your comment here...</textarea>
              </div>
              {
                this.props.message && <Message successMessage={this.props.successMessage} message={this.props.message}/>
              }
              <div className="d-flex justify-content-between mt-4">
                <button type="submit" className="btn btn-primary">Save Review</button>
            </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

}

export default AddReview;

// edit rating to stars
// edit difficulty to carrots
// do average of both to show in the recipes page