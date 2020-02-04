import React, { Component } from 'react';
import AuthService from './auth-services';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
    }

    this.service = new AuthService();
    this.handleSignupFormSubmit = this.handleSignupFormSubmit.bind(this);
    this.handleSignupChange = this.handleSignupChange.bind(this);

  }

  handleSignupFormSubmit(event){

    event.preventDefault();
    //TODO refatorar
    const username = this.state.username;
    const password = this.state.password;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const email = this.state.email;


    this.service
    .signup(email, firstName, lastName, username, password)
    .then(response => {
      this.setState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
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

  render() {
    return(
      <div className="form-background">
      <div className="form-container">
      <form onSubmit={this.handleSignupFormSubmit}>
      <h2>Create an account</h2>
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
    </div>
    )
  }
}

export default Signup;