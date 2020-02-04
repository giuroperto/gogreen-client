import React, { Component } from 'react';
import APIAccess from './api/api-access';
import Message from './Message';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      usernameForm: '',
      oldPassword: '',
      newPassword: '',
    }

    this.apiEndpoints = new APIAccess();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { username } = this.props.match.params;

    this.apiEndpoints.getOneUser(username)
      .then(response => {
        this.setState({
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          usernameForm: response.username,
        })
      })
      .catch(err => console.log(err));

  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('submit');
    let { firstName, lastName, email, usernameForm, oldPassword, newPassword } = this.state;
    const { username } = this.props.match.params;

    this.apiEndpoints.editUser(username, firstName, lastName, email, usernameForm, oldPassword, newPassword)
      .then(response => {
        console.log(response.status);
        this.props.getMessage(response.message);
        //TODO redirect to the right page -> get username properly
        // this.props.history.push(`/user/${this.props.username}`);
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state);
    console.log(this.props.message);
    return(
      <div className="container-fluid profile-edit-form" style={{width: '85%'}}>
      {
        this.props.message && <Message message={this.props.message}/>
      }
        <form onSubmit={this.handleSubmit}>
          <h3>Edit profile</h3>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="firstName">First name</label>
              <input type="text" className="form-control" id="firstName" name="firstName" onChange={this.handleChange} value={this.state.firstName}/>
            </div>
            <div className="form-group col-md-6">
            <label for="lastName">Last name</label>
            <input type="text" className="form-control" id="lastName" name="lastName" onChange={this.handleChange} value={this.state.lastName}/>
            </div>
          </div>
          <div className="form-group">
            <label for="email">Email</label>
            <input type="email" className="form-control" id="email" name="email" onChange={this.handleChange} value={this.state.email}/>
          </div>
          <div className="form-group">
            <label for="usernameForm">Username</label>
            <input type="text" className="form-control" id="usernameForm" name="usernameForm" onChange={this.handleChange} value={this.state.usernameForm}/>
          </div>
          <div className="form-group">
            <label for="oldPassword">Current Password</label>
            <input type="password" className="form-control" id="oldPassword" name="oldPassword" onChange={this.handleChange} value={this.state.oldPassword} required/>
          </div>
          <div className="form-group">
            <label for="newPassword">New Password</label>
            <input type="password" className="form-control" id="newPassword" name="newPassword" onChange={this.handleChange} value={this.state.newPassword}/>
          </div>
          <button type="submit">Save changes</button>
        </form>
      </div>
    )
  }
}

export default EditProfile;

//TODO add password to check when saving and new field to edit password