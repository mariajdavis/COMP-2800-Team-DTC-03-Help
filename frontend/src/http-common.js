import axios from "axios";

export default axios.create({
  baseURL: "heroku_72211f91d285493",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "heroku_72211f91d285493"
  }
});
