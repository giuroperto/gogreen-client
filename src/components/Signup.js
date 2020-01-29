import React, { Component } from 'react';

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="form-background">
      <div className="form-container">
      <h2>Create an account</h2>
      <form>
        <div className="form-group">
          <label for="email">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-row">
          <label for="name">Your name</label>
          <div class="col">
            <input type="text" class="form-control" name="firstName" placeholder="First name"/>
          </div>
          <div class="col">
            <input type="text" class="form-control" name="lastName" placeholder="Last name"/>
          </div>
        </div>
        <div className="form-group">
          <label for="username">Username</label>
          <input type="text" className="form-control" id="username" aria-describedby="emailHelp"/>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="password"/>
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