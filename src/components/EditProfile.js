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
      picture: '',
    }

    this.apiEndpoints = new APIAccess();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentDidMount() {
    const { username } = this.props.match.params;

    this.apiEndpoints.getOneUser(username)
      .then(response => {
        this.setState({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          usernameForm: response.data.username,
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

  redirectPage(success, username) {
    if (success) {
      this.props.history.push(`/user/${username}`);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let { firstName, lastName, email, usernameForm, oldPassword, newPassword, picture } = this.state;
    const { username } = this.props.match.params;

    if (picture === '') {
      picture = 'https://res.cloudinary.com/dxatyucj2/image/upload/v1580833315/go-green/vegetalwhite.jpg.jpg'
    }

    this.apiEndpoints.editUser(username, firstName, lastName, email, usernameForm, oldPassword, newPassword, picture)
      .then(response => {
        this.props.getMessage(response.status, response.data.message);
        this.redirectPage(this.props.successMessage, usernameForm);
      })
      .catch(err => console.log(err));
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
    console.log(this.state);
    console.log(this.props.message);
    return(
      <div className="container-fluid profile-edit-form" style={{width: '85%'}}>
      {
        this.props.message && <Message successMessage={this.props.successMessage} message={this.props.message}/>
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
          <div class="input-group mb-3">
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" name="profilePic" onChange={this.handleUpload}/>
              <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
            </div>
          </div>
          <button type="submit">Save changes</button>
        </form>
      </div>
    )
  }
}

export default EditProfile;

//TODO add password to check when saving and new field to edit password