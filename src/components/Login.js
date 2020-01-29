import React, { Component } from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="form-background">
        <div className="form-container">
        <h2>Welcome back</h2>
        <form>
          <div className="form-group">
            <label for="username">Username</label>
            <input type="text" className="form-control" id="username" aria-describedby="emailHelp"/>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="password"/>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        </div>
      </div>
    )
  }
}

export default Navbar;