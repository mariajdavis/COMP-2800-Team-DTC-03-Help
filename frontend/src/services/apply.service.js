import http from "../http-common";

class ApplyDataService {
  getAll() {
    return http.get("/applications");
  }

  get(id) {
    return http.get(`/applications/${id}`);
  }

  create(data) {
    return http.post("/applications", data);
  }

}

export default new ApplyDataService();