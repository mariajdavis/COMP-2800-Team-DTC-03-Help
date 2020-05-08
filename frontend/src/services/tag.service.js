import http from "../http-common";

class TagDataService {

  create(data) {
    return http.post("/tags", data);
  }

  // findAll(tag) {
  //   return http.get(`/tags?tag=${tag}`);
  // }
}

export default new TagDataService();