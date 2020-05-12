import axios from "axios";

export default axios.create({
  baseURL: "https://helpservices.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  }
});
