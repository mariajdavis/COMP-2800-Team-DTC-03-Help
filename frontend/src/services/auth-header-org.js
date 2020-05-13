<<<<<<< HEAD
export default function authHeader() {
    const orgUser = JSON.parse(localStorage.getItem('orgUser'));
  
    if (orgUser && orgUser.accessToken) {
      // for Node.js Express back-end
      return { 'x-access-token': orgUser.accessToken };
    } else {
      return {};
    }
=======
export default function authHeader() {
    const orgUser = JSON.parse(localStorage.getItem('orgUser'));
  
    if (orgUser && orgUser.accessToken) {
      // for Node.js Express back-end
      return { 'x-access-token': orgUser.accessToken };
    } else {
      return {};
    }
>>>>>>> Gonu_Kim_v3
  }