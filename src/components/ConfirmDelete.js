import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ConfirmDelete extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="confirm-delete">
        <Link to='/'>DELETE </Link>
        <Link to={`/user/${this.props.loggedInUser.username}`}> CANCEL </Link>
      </div>
    )
  }


}

export default ConfirmDelete;

// passar username por props
// when deleting, first logout and then delete user and redirect home