import React, { Component } from 'react';
import APIAccess from './api/api-access';
import Loader from "react-loader-spinner";
import Message from '../components/Message';
import { Link } from 'react-router-dom';

class EditReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      difficulty: '',
      title: '',
      comment: '',
      loader: true,
      recipeID: '',
    }
    
    this.apiEndpoints = new APIAccess();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.redirectPage = this.redirectPage.bind(this);
  }

  componentDidMount() {
    const { reviewid } = this.props.match.params;

    this.apiEndpoints.getOneReview(reviewid)
      .then(response => {
        console.log(response);
        this.setState({
          score: response.data.score,
          difficulty: response.data.difficulty,
          comment: response.data.comment,
          title: response.data.title,
          loader: false,
          recipeID: this.props.match.params.recipeid,
        })
      })
      .catch(err => console.log(err));

  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({loader: true});
    const { score, difficulty, title, comment } = this.state;
    const { reviewid } = this.props.match.params;
    this.apiEndpoints.editReview(reviewid, score, difficulty, title, comment)
      .then(response => {
        this.setState({ loader: false });
        this.props.getMessage(response.status, response.data.message);
        this.redirectPage(this.props.successMessage);
      })
      .catch(err => {
        this.props.getMessage(err.response.status, err.response.data.message);
        console.log(err);
      });
  }

  redirectPage(success) {
    if (success) {
      this.props.history.push(`/recipe/${this.state.recipeID}`);
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render () {
    console.log(this.props.match.params);
    console.log(this.state);
    return (
      <div className="container-fluid profile-edit-form" style={{width: '85%'}}>
      {
        this.state.loader ? (
          <div className='d-flex align-items-center justify-content-center' style={{ height:'80vh'}}>
            <Loader type="Puff" color="#76ff03" height={200} width={200} />
          </div>
        ) : (
          <div>
            <form id="editreview" onSubmit={this.handleSubmit}>
            <h3 className="mt-3 pb-2 title-edit-profile">Edit Review</h3>
              <div className="form-column">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input className="form-control" id="title" name="title" onChange={this.handleChange} value={this.state.title} required/>
                </div>
                <div className="form-group">
                  <label htmlFor="score">Rating</label>
                  <input type="number" className="form-control" id="score" name="score" onChange={this.handleChange} value={this.state.score} required/>
                </div>
                <div className="form-group">
                  <label htmlFor="difficulty">Difficulty</label>
                  <select value={this.state.difficulty} name="difficulty" id="difficulty" onChange={this.handleChange} multiple={false} className="custom-select form-control">
                    <option value=''>Choose a difficulty level</option>
                    {this.props.allData.difficultLevelArr.map((level, idx) => <option key={idx} value={level}>{level}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="comment">Comments</label>
                  <textarea className="form-control" id="comment" name="comment" onChange={this.handleChange} value={this.state.comment} required>Enter your comment here...</textarea>
                </div>
                {
                  this.props.message && <Message successMessage={this.props.successMessage} message={this.props.message}/>
                }
                <div className="d-flex justify-content-between mt-4">
                  <button type="submit" className="btn btn-primary">Save changes</button>
                  <Link to={`/recipe/${this.state.recipeID}`}> Return </Link>
              </div>
              </div>
            </form>
          </div>
        )
      }
      </div>
    )
  }

}

export default EditReview;
