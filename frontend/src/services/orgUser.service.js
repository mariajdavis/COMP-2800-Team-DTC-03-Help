import axios from 'axios';
import authHeader from './auth-header-org';

const API_URL = 'https://helpserviceapp.herokuapp.com/api/test/';

class OrgUserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'orgUser', { headers: authHeader() });
  }
}

export default new OrgUserService();