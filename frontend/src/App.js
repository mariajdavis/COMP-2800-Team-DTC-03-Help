import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddJobPost from "./components/add-jobPost.component";
import JobPost from "./components/jobPost.component";
import JobPostsList from "./components/JobBoardPage/JobBoardPage";
import Register from "./components/RegisterPage/RegisterPage";
import LogIn from "./components/LogInPage/LogInPage";


class App extends Component {
  render() {
    return (
      <Router>
        <div id="formsContainer">
            <Switch>

              <Route exact path="/register" component={Register} />
              <Route exact path={["/", "/jobPosts"]} component={JobPostsList} />
              <Route exact path="/add" component={AddJobPost} />
              <Route path="/jobPosts/:id" component={JobPost} />
              <Route exact path="/logIn" component={LogIn} />
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
