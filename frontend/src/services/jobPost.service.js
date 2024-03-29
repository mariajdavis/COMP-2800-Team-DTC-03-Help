import http from "../http-common";

class JobPostDataService {
  getAll() {
    return http.get("/jobPosts");
  }

  get(id) {
    return http.get(`/jobPosts/${id}`);
  }

  create(data) {
    return http.post("/jobPosts", data);
  }

  update(id, data) {
    return http.put(`/jobPosts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/jobPosts/${id}`);
  }

  deleteAll() {
    return http.delete(`/jobPosts`);
  }

  findByTitle(title) {
    return http.get(`/jobPosts?title=${title}`);
  }

  findSaved(data) {
    return http.post("/jobPosts/saved/find",data);
  }

  saveHandle(data) {
    return http.post("/jobPosts/saved/save",data);
  }

  getAllSaved(id){
    return http.get(`/jobPosts/saved/${id}`);
  }

  findByOrgId(orgId) {
    return http.get(`/jobPosts?orgId=${orgId}`);
  }

  deleteAllOrg(orgId) {
    return http.delete(`/jobPosts?orgId=${orgId}`);
  }

  findOrgPostByTitle(title, orgId) {
    return http.get(`/jobPosts?title=${title}&orgId=${orgId}`);
  }
}

export default new JobPostDataService();