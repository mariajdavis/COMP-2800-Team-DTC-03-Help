<<<<<<< HEAD
import axios from "axios";

const API_URL = "https://helpservices.herokuapp.com/api/auth/";

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + "signin", {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    orgLogin(email, password) {
        return axios
            .post(API_URL + "orgsignin", {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("orgUser", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    orgLogout() {
        localStorage.removeItem("orgUser");
    }

    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    orgRegister(username, email, password) {
        return axios.post(API_URL + "orgsignup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }

    getCurrentOrgUser() {
        return JSON.parse(localStorage.getItem('orgUser'));;
    }
}

=======
import axios from "axios";
import http from "../http-common";

const API_URL="http://localhost:8080/api/auth/";
//const API_URL = "https://helpservices.herokuapp.com/api/auth/";

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + "signin", {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    orgLogin(email, password) {
        return axios
            .post(API_URL + "orgsignin", {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("orgUser", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    orgLogout() {
        localStorage.removeItem("orgUser");
    }

    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    orgRegister(username, email, password) {
        return axios.post(API_URL + "orgsignup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }

    getCurrentOrgUser() {
        return JSON.parse(localStorage.getItem('orgUser'));;
    }

    findOneUser(id) {
        return http.get(`/user/${id}`)
    }
}

>>>>>>> dev
export default new AuthService();