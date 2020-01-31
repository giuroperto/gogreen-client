import React, { Component } from 'react';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {username} = this.props.match.params;
    axios.get(`/user/${username}`)
    .then(response => this.setState({
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      email: response.data.email,
      username: response.data.username
    }))
    .catch(error => console.log(error));
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState = {
      [name]: value
    }
  }

  handleSubmit() {
    let updatedUser = this.state;
    //TODO complete
  }

  render() {
    const {uniqueUser} = this.state;
    return(
      <div className="container-fluid profile-edit-form" style={{width: '85%'}}>
        <form onSubmit={this.handleSubmit}>
          <h3>Edit profile</h3>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="firstName">First name</label>
              <input type="text" className="form-control" id="firstName" name="firstName" onChange={this.handleChange} value={uniqueUser.firstName}/>
            </div>
            <div className="form-group col-md-6">
            <label for="lastName">Last name</label>
            <input type="text" className="form-control" id="lastName" name="lastName" onChange={this.handleChange} value={uniqueUser.lastName}/>
            </div>
          </div>
          <div className="form-group">
            <label for="email">Email</label>
            <input type="email" className="form-control" id="email" name="email" onChange={this.handleChange} value={uniqueUser.email}/>
          </div>
          <div className="form-group">
            <label for="username">Username</label>
            <input type="text" className="form-control" id="username" name="username" onChange={this.handleChange} value={uniqueUser.username}/>
          </div>
          <button type="submit">Save changes</button>
        </form>
      </div>
    )
  }
}

export default EditProfile;

