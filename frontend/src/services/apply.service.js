import http from "../http-common";

class ApplyDataService {
  getAll() {
    return http.get("/applications");
  }

<<<<<<< HEAD
=======
  findAllOrgApplicants(orgID) {
    return http.get(`/applications/${orgID}`);
  }

>>>>>>> dev
  get(id) {
    return http.get(`/applications/${id}`);
  }

  create(data) {
    return http.post("/applications", data);
  }

<<<<<<< HEAD
=======
  updateStatus(applicationID, newStatus) {
    return http.put(`applications/${applicationID}/${newStatus}`)
  }

>>>>>>> dev
}

export default new ApplyDataService();