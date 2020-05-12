import axios from "axios";

export default axios.create({
  baseURL: "sql3.freemysqlhosting.net",
  headers: {
<<<<<<< HEAD
    "Content-type": "application/json"
=======
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "sql3.freemysqlhosting.net"
>>>>>>> 7366fec6ebefd70d80ccc299578eab0130a529e3
  }
});
