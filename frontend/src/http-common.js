import axios from "axios";

export default axios.create({
  baseURL: "https://helpserviceapp.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  }
});
