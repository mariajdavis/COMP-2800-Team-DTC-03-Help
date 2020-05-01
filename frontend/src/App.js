import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddJobPost from "./components/add-jobPost.component";
import JobPost from "./components/jobPost.component";
import JobPostsList from "./components/jobPosts-list.component";
import Register from "./components/register.component";
import LogIn from "./components/logIn.component";
import Navbar from './components/Navbar/Navbar.js';
import Bodyframe from './components/Bodyframe/Bodyframe.js';
import Footer from './components/Footer/Footer.js';


class App extends Component {
  render() {
    return (
      <Router>
        <Navbar/>
          <div>
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
