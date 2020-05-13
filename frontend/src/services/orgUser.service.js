<<<<<<< HEAD
import axios from 'axios';
import authHeader from './auth-header-org';

// const API_URL = 'https://helpservices.herokuapp.com/api/test/';
const API_URL = "http://localhost:8081/api/test";
class OrgUserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'orgUser', { headers: authHeader() });
  }
}

=======
import axios from 'axios';
import authHeader from './auth-header-org';

const API_URL = 'http://localhost:8080/api/test/';

class OrgUserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'orgUser', { headers: authHeader() });
  }
}

>>>>>>> Gonu_Kim_v3
export default new OrgUserService();