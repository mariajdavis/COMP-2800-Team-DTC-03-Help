import axios from "axios";

export default axios.create({
  baseURL: "us-cdbr-east-06.cleardb.net:3306",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "us-cdbr-east-06.cleardb.net:3306"
  }
});
