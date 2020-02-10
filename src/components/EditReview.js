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
      comment: '',
      loader: true,
      recipeID: '',
    }
    
    this.apiEndpoints = new APIAccess();
  }

  //TODO receber via props recipeID, message, get message, etc

  componentDidMount() {
    const { reviewID } = this.props.match.params;

    this.apiEndpoints.getOneReview(reviewID)
      .then(response => {
        this.setState({
          score: response.score,
          difficulty: response.difficulty,
          comment: response.comment,
          loader: false,
          recipeID: this.props.recipeID,
        })
      })
      .catch(err => console.log(err));

  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({loader: true});
    const { score, difficulty, comment } = this.state;
    const { reviewID } = this.props.match.params;
    this.apiEndpoints.editReview(reviewID, score, difficulty, comment)
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
    return (
      <div>
      {
        this.state.loader ? (
          <div className='d-flex align-items-center justify-content-center' style={{ height:'80vh'}}>
            <Loader type="Puff" color="#76ff03" height={200} width={200} />
          </div>
        ) : (
          <div>
            <form id="editreview" onSubmit={this.handleSubmit}>
            <h3>Edit Review</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="score">Rating</label>
                  <input type="number" className="form-control" id="score" name="score" onChange={this.handleChange} value={this.state.score} required/>
                </div>
                <div className="form-group">
                  <label htmlFor="difficulty">Difficulty</label>
                  <select className="form-control" id="difficulty" name="difficulty" onChange={this.handleChange} value={this.state.difficulty} required/>
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



//   render() {
//     return(
//       <div>
//         { this.state.loader ? (
//           <div className='d-flex align-items-center justify-content-center' style={{ height:'80vh'}}>
//             <Loader type="Puff" color="#76ff03" height={200} width={200} />
//           </div>
//         ) : (
//           <div className="container d-flex flex-column justify-content-center my-5">
//             {this.state.uniqueRecipe !== null && <EditRecipeForm {...this.props} recipe={this.state.uniqueRecipe} allData={this.props.allData}/>}
//           </div>
//         )}
//       </div>
//     )
//   }
// }
