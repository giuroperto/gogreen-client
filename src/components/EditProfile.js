import React, { Component } from 'react';
import APIAccess from './api/api-access';
import Message from './Message';
import { Link } from 'react-router-dom';

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
      pictureName: '',
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
          picture: response.data.picture
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

    if (picture === '' || picture === null) {
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
    const { name } = event.target.files[0];
    this.apiEndpoints.handleUpload(uploadData)
    .then(response => {
        this.setState({ picture: response.data.secure_url, pictureName: name });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }

  render() {
    return(
      <div className="container-fluid profile-edit-form" style={{width: '85%'}}>
      {
        this.props.message && <Message successMessage={this.props.successMessage} message={this.props.message}/>
      }
        <form onSubmit={this.handleSubmit}>
          <h3>Edit profile</h3>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="firstName">First name</label>
              <input type="text" className="form-control" id="firstName" name="firstName" onChange={this.handleChange} value={this.state.firstName}/>
            </div>
            <div className="form-group col-md-6">
            <label htmlFor="lastName">Last name</label>
            <input type="text" className="form-control" id="lastName" name="lastName" onChange={this.handleChange} value={this.state.lastName}/>
            </div>
          </div>
          <div className="input-group mb-3 d-flex flex-column">
            <label htmlFor="file">Replace picture</label>
            <div className="custom-file">
              <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" name="profilePic" onChange={this.handleUpload}/>
              <label className="custom-file-label" htmlFor="inputGroupFile01">{this.state.pictureName ? this.state.pictureName : 'Choose file...'}</label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email" name="email" onChange={this.handleChange} value={this.state.email}/>
          </div>
          <div className="form-group">
            <label htmlFor="usernameForm">Username</label>
            <input type="text" className="form-control" id="usernameForm" name="usernameForm" onChange={this.handleChange} value={this.state.usernameForm}/>
          </div>
          <div className="form-group">
            <label htmlFor="oldPassword">Current Password</label>
            <input type="password" className="form-control" id="oldPassword" name="oldPassword" onChange={this.handleChange} value={this.state.oldPassword} required/>
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input type="password" className="form-control" id="newPassword" name="newPassword" onChange={this.handleChange} value={this.state.newPassword}/>
          </div>
          
          <button type="submit">Save changes</button>
          <Link to={`/user/${this.props.match.params.username}`}> Cancel </Link>
        </form>
      </div>
    )
  }
}

export default EditProfile;

//TODO add password to check when saving and new field to edit password