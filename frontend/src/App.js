import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./components/Navbar/Navbar.css";

import AddJobPost from "./components/add-jobPost.component";
import JobPost from "./components/jobPost.component";
import JobPostsList from "./components/JobBoardPage/JobBoardPage";
import Register from "./components/RegisterPage/RegisterPage";
import LogIn from "./components/LogInPage/LogInPage";
import UserProfile from "./components/user-profile.component";

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
        <header>
          <Navbar style={{ backgroundColor: "#2743A5" }} expand="sm">
            <Navbar.Brand class="navBrand" id="navBrand" style={{ fontFamily: "Racing Sans One", color: "white", fontSize: "30px" }}>help!</Navbar.Brand>
            <Navbar.Toggle id="collapseButton" aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="menu mr-auto">
                {!currentUser && <Nav.Link href="/register">Register</Nav.Link>}
                <Nav.Link href="/jobPosts">Job Board</Nav.Link>
                <Nav.Link href="/add">Add Job</Nav.Link>
                {currentUser && <Nav.Link href="/userProfile">My Profile</Nav.Link>}
                {!currentUser && <Nav.Link href="/logIn">Log In</Nav.Link>}
                {currentUser && <Nav.Link href="/logIn" onClick={this.logOut}>Log Out</Nav.Link>}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
        <div id="formsContainer">
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path={["/", "/jobPosts"]} component={JobPostsList} />
              <Route exact path="/add" component={AddJobPost} />
              <Route path="/jobPosts/:id" component={JobPost} />
              <Route exact path="/logIn" component={LogIn} />
              <Route path="/userProfile" component={UserProfile}/>
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
