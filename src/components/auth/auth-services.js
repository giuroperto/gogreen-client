import axios from 'axios';

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_API,
      withCredentials: true,
    });
  }

  signup(email, firstName, lastName, username, password, picture) {
    return this.service.post('/signup', { email, firstName, lastName, username, password, picture }).then(response => response.data);
  }

  login(username, password) {
    return this.service.post('/login', { username, password }).then(response => response.data);
  }

  loggedin() {
    return this.service.get('/loggedin').then(response => response.data);
  }

  logout() {
    return this.service.get('/logout').then(response => response.data);
  }

}

export default AuthService;