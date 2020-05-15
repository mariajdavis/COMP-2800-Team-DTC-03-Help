import http from "../http-common";

class RegisterService {
  create(data) {
    return http.post("/users", data);
  }

  findUser(data) {
    return http.get("/users", data);
  }
}

export default new RegisterService();