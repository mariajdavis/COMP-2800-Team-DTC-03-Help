import axios from "axios";

export default axios.create({
  baseURL: "sql3.freemysqlhosting.net",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "sql3.freemysqlhosting.net"
  }
});
