import React, { Component } from "react";
import AuthService from "./auth-services";
import { Link } from "react-router-dom";
import Message from '../Message';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.service = new AuthService();
    this.handleLoginFormSubmit = this.handleLoginFormSubmit.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
  }

  handleLoginFormSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;

    this.service
      .login(username, password)
      .then(response => {
        this.setState({
          username: "",
          password: ""
        });
        console.log(response)
        this.props.getUser(response.data);
        this.props.getMessage(response.status, response.data.message);
        this.redirectPage(this.props.successMessage);
      })
      .catch(err => {
        this.props.getMessage(500, 'Login failed! Try again.');
        this.redirectPage(this.props.successMessage);
        console.log(err)
      });
  }

  redirectPage(success) {
    if (success) {
      this.props.history.push(`/user/${this.props.loggedInUser.username}`);
    }
  }

  handleLoginChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="form-background">
        <div className="form-container d-flex flex-column justify-content-center align-items-center login-container">
          <form
            className="login-form d-flex flex-column align-items-center"
            onSubmit={this.handleLoginFormSubmit}
          >
          <h2>Sign In</h2>
          <div className='login-logo'>
            <img src="/images/logo.png" alt="logo"/>
          </div>
            <div className="form-group mt-3">
              <input
                name="username"
                value={this.state.username}
                type="text"
                className="form-control input-fields"
                placeholder="Username"
                id="username"
                aria-describedby="emailHelp"
                onChange={this.handleLoginChange}
                required
              />
              <div className="div-bar-form"></div>
            </div>
            <div className="form-group">
              <input
                name="password"
                value={this.state.password}
                type="password"
                className="form-control input-fields"
                placeholder="Password"
                id="password"
                onChange={this.handleLoginChange}
                required
              />
              <div className="div-bar-form"></div>
            </div>
            <div>
            {
              this.props.message && <Message successMessage={this.props.successMessage} message={this.props.message}/>
            }
            </div>
            <button type="submit" className="btn btn-success my-3 pr-5 pl-5 py-2">
              Login
            </button>
            <p className='no-account'>
              Don't have an account yet?{" "}
              <button
                type="button"
                className="btn btn-success create-btn ml-3"
              >
                <Link to="/signup">Create</Link>
              </button>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
