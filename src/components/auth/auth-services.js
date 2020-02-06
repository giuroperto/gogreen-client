import axios from 'axios';

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
  }

  signup(email, firstName, lastName, username, password, picture) {
    return this.service.post('/signup', { email, firstName, lastName, username, password, picture }).then(response => response);
  }

  login(username, password) {
    return this.service.post('/login', { username, password });
  }

  loggedin() {
    return this.service.get('/loggedin').then(response => response);
  }

  logout() {
    return this.service.get('/logout').then(response => response);
  }

}

export default AuthService;