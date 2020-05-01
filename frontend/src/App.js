import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddJobPost from "./components/add-jobPost.component";
import JobPost from "./components/jobPost.component";
import JobPostsList from "./components/jobPosts-list.component";
import Register from "./components/register.component";
import LogIn from "./components/logIn.component";
import Bodyframe from './components/Bodyframe/Bodyframe.js';
import Footer from './components/Footer/Footer.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-primary">
            <a href="/jobPosts" className="navbar-brand">
              Help!
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/logIn"} className="nav-link">
                  Log In
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/jobPosts"} className="nav-link">
                  Job Posts
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>
          <div className="container mt-3">
            <Switch>
              <Route exact path="/logIn" component={LogIn} />
              <Route exact path="/register" component={Register} />
              <Route exact path={["/", "/jobPosts"]} component={JobPostsList} />
              <Route exact path="/add" component={AddJobPost} />
              <Route path="/jobPosts/:id" component={JobPost} />
            </Switch>
          </div>
          <Bodyframe/>
        </div>
        <Footer/>
      </Router>
    );
  }
}

export default App;
