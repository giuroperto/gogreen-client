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
        <div className="form-container d-flex flex-column justify-content-center align-items-center login-container">
        <h2>Sign In</h2>
        <form className='login-form d-flex flex-column align-items-center' onSubmit={this.handleLoginFormSubmit}>
          <div className="form-group mt-5">
            <input name='username' value={this.state.username} type="text" className="form-control input-fields" placeholder="Username" id="username" aria-describedby="emailHelp" onChange={this.handleLoginChange} required />
            <div className='div-bar-form'></div>
            <div className='div-bar-form'></div>


          </div>
          <div className="form-group">
            <input name='password' value={this.state.password} type="password" className="form-control input-fields" placeholder="Password" id="password" onChange={this.handleLoginChange} required/>
            <div className='div-bar-form'></div>
            <div className='div-bar-form'></div>

          </div>
          <button type="submit" className="btn btn-primary my-5">Login</button>
          <p>Don't have an account yet? Click <a href="/signup">here</a></p>
        </form>
        </div>
      </div>

    )
  }
}

export default Login;