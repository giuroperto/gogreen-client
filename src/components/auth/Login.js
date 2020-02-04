import React, { Component } from "react";
import AuthService from "./auth-services";
import { Link } from "react-router-dom";

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
    console.log(this.state);
    event.preventDefault();
    //TODO refactor
    const username = this.state.username;
    const password = this.state.password;

    this.service
      .login(username, password)
      .then(response => {
        this.setState({
          username: "",
          password: ""
        });
        this.props.getUser(response);
        this.props.history.push(`/user/${this.props.loggedInUser.username}`);
      })
      .catch(err => console.log(err));
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
