import http from "../http-common";

class ApplyDataService {
  getAll() {
    return http.get("/applications");
  }

  findAllOrgApplicants(orgID) {
    return http.get(`/applications/${orgID}`);
  }

  get(id) {
    return http.get(`/applications/${id}`);
  }

  create(data) {
    return http.post("/applications", data);
  }

  updateStatus(applicationID, newStatus) {
    return http.put(`applications/${applicationID}/${newStatus}`)
  }

}

export default new ApplyDataService();