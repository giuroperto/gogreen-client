import React, { Component } from 'react';
import AuthService from './auth-services';
import APIAccess from '../api/api-access';
import Message from '../Message';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      picture: ''
    }

    this.service = new AuthService();
    this.apiEndpoints = new APIAccess();
    this.handleSignupFormSubmit = this.handleSignupFormSubmit.bind(this);
    this.handleSignupChange = this.handleSignupChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);

  }

  handleSignupFormSubmit(event){

    event.preventDefault();
    let { username, password, firstName, lastName, email, picture } = this.state

    // default profile picture
    if (picture === '') {picture = 'https://res.cloudinary.com/dxatyucj2/image/upload/v1580833315/go-green/vegetalwhite.jpg.jpg'}

    // existe um problema de asincronicidade entre o upload de imagem
    // e o submit. caso o usuário envie os dados logo após selecionar
    // uma imagem, são grandes as chances de que o upload não tenha
    // terminado.
    // FIXME fazer submit esperar upload de imagem

    this.service
    .signup(email, firstName, lastName, username, password, picture)
    .then(response => {
      this.setState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        picture: '',
      })
      this.props.getUser(response.data);
      this.props.getMessage(response.status, response.data.message);
      this.redirectPage(this.props.successMessage);
    })
    .catch(err => {
      this.props.getMessage(err.response.status, err.response.data.message);
    })
  }

  redirectPage(success) {
    if (success) {
      this.props.history.push(`/user/${this.props.loggedInUser.username}`);
    }
  }

  handleSignupChange(event){
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleUpload (event) {
    const uploadData = new FormData();
    uploadData.append("imageUrl", event.target.files[0]);
    console.log('hi!', event.target.files)
    this.apiEndpoints.handleUpload(uploadData)
    .then(response => {
        this.setState({ picture: response.data.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }

  render() {
    return(
      <div className="form-background">
      <div className="form-container align-items-start justify-content-center d-flex my-5">
      <form className='signup-form d-flex flex-column align-items-center' onSubmit={this.handleSignupFormSubmit}>
      <h2>Become a Go Green family member!</h2>
      <div className='login-logo'>
            <img src="/images/logo.png" alt="logo"/>
          </div>
        <div className="form-group input-container">
          <input name='email' value={this.state.email} placeholder='Email' type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={this.handleSignupChange} required />
          <div className="div-bar-form"></div>
          
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group input-container">
            <input name="firstName" value={this.state.firstName} type="text" class="form-control" placeholder="First name" onChange={this.handleSignupChange} required />
            <div className="div-bar-form"></div>
      
            </div>

            <div class="form-group input-container">

            <input name="lastName" value={this.state.lastName} type="text" class="form-control" placeholder="Last name" onChange={this.handleSignupChange} required />
            <div className="div-bar-form"></div>

        </div>
        <div className="form-group input-container">
          <input name='username' value={this.state.username} type="text" className="form-control"   id="username" aria-describedby="emailHelp" placeholder="Username" onChange={this.handleSignupChange} required />
          <div className="div-bar-form"></div>

        </div>
        <div className="form-group input-container">
          <input name='password' value={this.state.password} type="password" className="form-control" id="password" onChange={this.handleSignupChange} placeholder="Password" required />
          <div className="div-bar-form"></div>
          
          <small id="passHelp" className="form-text text-muted">Password has to be at least 8 characters.</small>
          <div>
          {
            this.props.message && <Message successMessage={this.props.successMessage} message={this.props.message}/>
          }
          </div>
        </div>
        <div className="form-group input-container-picture mt-1">
          <label forHtml="profilePic">Add a profile picture</label>
          <div class="input-group d-flex flex-column">
            <div class="custom-file">
              <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" name="profilePic" onChange={this.handleUpload}/>
              <label className="custom-file-label" forHtml="inputGroupFile01"></label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3 mb-4 create-btn">Create Account</button>
      </form>
      </div>
    </div>
    )
  }
}

export default Signup;