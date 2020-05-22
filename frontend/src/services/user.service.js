<<<<<<< HEAD
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://helpservices.herokuapp.com/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }
}

=======
import axios from 'axios';
import http from "../http-common";
import authHeader from './auth-header';

// const API_URL = "http://localhost:8081/api/test/";
const API_URL = "https://helpservices.herokuapp.com/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  findOneUser(id) {
    return http.get(`/users/${id}`);
  }

  updateUser(id, phoneNumber, email, fullName) {
    return http.put(`/users/${id}/${phoneNumber}/${email}/${fullName}`)
  }
}

>>>>>>> dev
export default new UserService();