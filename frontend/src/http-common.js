<<<<<<< HEAD
import axios from "axios";

export default axios.create({
  baseURL: "https://helpservices.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  }
});
=======
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  //baseURL: "https://helpservices.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  }
});
>>>>>>> dev
