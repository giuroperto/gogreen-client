import React, { Component } from 'react';
import AuthService from './auth-services';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    }

    this.service = new AuthService();
    this.handleLoginFormSubmit = this.handleLoginFormSubmit.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);

  }

  handleLoginFormSubmit(event){
    console.log(this.state)
    event.preventDefault();
    //TODO refactor
    const username = this.state.username;
    const password = this.state.password;

    this.service
    .login(username, password)
    .then(response => {
      this.setState({
        username: '',
        password: '',
      })
      this.props.getUser(response)
      this.props.history.push(`/user/${this.props.loggedInUser.username}`)
    })
    .catch(err => console.log(err))
  }

  handleLoginChange(event){
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }
  
  render() {
    return(
      <div className="form-background">
        <div className="form-container">
        <h2>Welcome back</h2>
        <form onSubmit={this.handleLoginFormSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input name='username' value={this.state.username} type="text" className="form-control" id="username" aria-describedby="emailHelp" onChange={this.handleLoginChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input name='password' value={this.state.password} type="password" className="form-control" id="password" onChange={this.handleLoginChange} required/>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        </div>
      </div>
    )
  }
}

export default Login;