import axios from "axios";

export default axios.create({
  baseURL: "http://helpserviceapp.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  }
});
