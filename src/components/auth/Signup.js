import React, { Component } from 'react';
import AuthService from './auth-services';
import APIAccess from '../api/api-access';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      picture: ''
    }

    this.service = new AuthService();
    this.apiEndpoints = new APIAccess();
    this.handleSignupFormSubmit = this.handleSignupFormSubmit.bind(this);
    this.handleSignupChange = this.handleSignupChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);

  }

  handleSignupFormSubmit(event){

    event.preventDefault();
    let { username, password, firstName, lastName, email, picture } = this.state

    // default profile picture
    if (picture === '') {picture = 'https://res.cloudinary.com/dxatyucj2/image/upload/v1580833315/go-green/vegetalwhite.jpg.jpg'}

    this.service
    .signup(email, firstName, lastName, username, password, picture)
    .then(response => {
      this.setState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        picture: '',
      })
      this.props.getUser(response)
      this.props.history.push(`/user/${this.props.loggedInUser.username}`)
    })
    .catch(err => console.log(err))
  }

  handleSignupChange(event){
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleUpload (event) {
    const uploadData = new FormData();
    uploadData.append("imageUrl", event.target.files[0]);
    console.log('hi!', event.target.files)
    this.apiEndpoints.handleUpload(uploadData)
    .then(response => {
        this.setState({ picture: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }

  render() {
    return(
      <div className="form-background">
      <div className="form-container">
      <h2>Create an account</h2>
      <form onSubmit={this.handleSignupFormSubmit}>
        <div className="form-group">
          <label for="email">Email address</label>
          <input name='email' value={this.state.email} type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={this.handleSignupChange} required />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-row">
          <label for="name">Your name</label>
          <div class="col">
            <input name="firstName" value={this.state.firstName} type="text" class="form-control" placeholder="First name" onChange={this.handleSignupChange} required />
          </div>
          <div class="col">
            <input name="lastName" value={this.state.lastName} type="text" class="form-control" placeholder="Last name" onChange={this.handleSignupChange} required />
          </div>
        </div>
        <div className="form-group">
          <label for="username">Username</label>
          <input name='username' value={this.state.username} type="text" className="form-control" id="username" aria-describedby="emailHelp" onChange={this.handleSignupChange} required />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input name='password' value={this.state.password} type="password" className="form-control" id="password" onChange={this.handleSignupChange} required />
          <small id="passHelp" className="form-text text-muted">Password has to be at least 8 characters.</small>
        </div>
        <div className="form-group">
          <label for="profilePic">Add a profile picture</label>
          <div class="input-group mb-3">
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" name="profilePic" onChange={this.handleUpload}/>
              <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
    </div>
    )
  }
}

export default Signup;