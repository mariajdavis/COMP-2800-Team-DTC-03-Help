import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddJobPost from "./components/add-jobPost.component";
import JobPost from "./components/jobPost.component";
import JobPostsList from "./components/jobPosts-list.component";
import Register from "./components/register.component";
import LogIn from "./components/logIn.component";
import Bodyframe from './components/Bodyframe/Bodyframe.js';
import Footer from './components/Footer/Footer.js';
import UserProfile from "./components/user-profile.component";
import { Nav, Navbar } from 'react-bootstrap'
import './Navbar.css'
import AuthService from "./services/auth.service";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.orgLogOut = this.orgLogOut.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser,
      currentOrgUser: AuthService.getCurrentOrgUser
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser;
    const orgUser = AuthService.getCurrentOrgUser;

    if (user) {
      this.setState({
        currentUser: AuthService.getCurrentUser(),
        currentOrgUser: AuthService.getCurrentOrgUser()
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  orgLogOut() {
    AuthService.orgLogout();
  }

  render() {
    const {currentUser, currentOrgUser}=this.state;
    return (
      <Router>
        <Navbar style={{ backgroundColor: "#2743A5" }} expand="sm">
          <Navbar.Brand className="navBrand" id="navBrand" style={{ fontFamily: "Racing Sans One", color: "white", fontSize: "30px" }}>help!</Navbar.Brand>
          <Navbar.Toggle id="collapseButton" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {!currentUser && <Nav.Link href="/register">Register</Nav.Link>}
              <Nav.Link href="/jobPosts">Job Board</Nav.Link>
              {currentOrgUser && <Nav.Link href="/add">Add Job</Nav.Link>}
              {currentUser && <Nav.Link href="/userProfile">My Profile</Nav.Link>}
              {!currentUser &&! currentOrgUser && <Nav.Link href="/logIn">Log In</Nav.Link>}
              {currentUser && <Nav.Link href="/logIn" onClick={this.logOut}>Log Out</Nav.Link>}
              {currentOrgUser && <Nav.Link href="/logIn" onClick={this.orgLogOut}>Log Out</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div>
          <div className="container mt-3">
            <Switch>
              <Route exact path="/logIn" component={LogIn} />
              <Route exact path="/register" component={Register} />
              <Route exact path={["/", "/jobPosts"]} component={JobPostsList} />
              <Route exact path="/add" component={AddJobPost} />
              <Route path="/jobPosts/:id" component={JobPost} />
              <Route path="/userProfile" component={UserProfile}/>
            </Switch>
          </div>
          <Bodyframe />
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
