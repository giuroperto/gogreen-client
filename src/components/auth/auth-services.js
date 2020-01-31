import axios from 'axios';

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_API,
      withCredentials: true,
    });
  }

  signup(email, firstName, lastName, username, password) {
    return this.service.post('/signup', { email, firstName, lastName, username, password }).then(response => console.log(response)) //TODO add response.data
  }

}

export default AuthService;