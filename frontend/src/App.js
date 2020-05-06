import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./components/Navbar/Navbar.css";

import AddJobPost from "./components/add-jobPost.component";
import JobPost from "./components/jobPost.component";
import Register from "./components/register.component";
import LogIn from "./components/logIn.component";
import Bodyframe from './components/Bodyframe/Bodyframe.js';
import Footer from './components/Footer/Footer.js';
import UserProfile from "./components/user-profile.component";
import AboutUs from './components/aboutUs.component'
import { Nav, Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'
import AuthService from "./services/auth.service";




class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showUserProfile: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser;

    if (user) {
      this.setState({
        currentUser: AuthService.getCurrentUser(),
        showUserProfile: true
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const {currentUser}=this.state;

    return (
      <Router>
        <Navbar style={{ backgroundColor: "#2743A5" }} expand="sm">
          <Navbar.Brand class="navBrand" id="navBrand" style={{ fontFamily: "Racing Sans One", color: "white", fontSize: "30px" }}>help!</Navbar.Brand>
          <Navbar.Toggle id="collapseButton" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {!currentUser && <Nav.Link id="navLink" href="/register">Register</Nav.Link>}
              <Nav.Link id="navLink" href="/jobPosts">Job Board</Nav.Link>
              <Nav.Link id="navLink" href="/add">Add Job</Nav.Link>
              {currentUser && <Nav.Link id="navLink" href="/userProfile">My Profile</Nav.Link>}
              {!currentUser && <Nav.Link id="navLink" href="/logIn">Log In</Nav.Link>}
              {currentUser && <Nav.Link id="navLink" href="/logIn" onClick={this.logOut}>Log Out</Nav.Link>}
              <Nav.Link id="navLink" href="/aboutUs">About Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div>
          <div className="container mt-3">

            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/add" component={AddJobPost} />
              <Route path="/jobPosts/:id" component={JobPost} />

              <Route path="/aboutUs" component={AboutUs} />

              <Route exact path="/logIn" component={LogIn} />

              <Route path="/userProfile" component={UserProfile}/>
            </Switch>
        </div>
        <footer>
          <Footer />
        </footer>
      </Router>
    );
  }
}

export default App;
