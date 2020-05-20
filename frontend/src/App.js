import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddJobPost from "./components/add-jobPost.component";
import JobPost from "./components/jobPost.component";
import Apply from "./components/ApplyPage/apply.component";
import JobPostsList from "./components/JobBoardPage/JobBoardPage";
import Register from "./components/Registration/register.component";
import LogIn from "./components/Login/logIn.component";
import Bodyframe from './components/Bodyframe/Bodyframe.js';
import Footer from './components/Footer/Footer.js';
import UserProfile from "./components/user-profile.component";
import { Nav, Navbar } from 'react-bootstrap'
import './Navbar.css'
import AuthService from "./services/auth.service";
import AboutUs from './components/AboutUs/aboutUs.component';
import SavedJobPosts from './components/savedJobs.component';
import EditUserProfile from './components/editUserProfile.component';

import OrgJobBoard from './components/JobBoardPage/OrgJobBoardPage.js'

import ViewApplicants from './components/JobBoardPage/ViewApplicantPage';
import GoogleMap from './components/GoogleMap/map.component';
import SearchLocation from './components/mapSearch';



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
    const { currentUser, currentOrgUser } = this.state;
    return (
      <Router>
        <Navbar style={{ backgroundColor: "#2743A5" }} expand="sm">
          <Navbar.Brand className="navBrand" id="navBrand" style={{ fontFamily: "Racing Sans One", color: "white", fontSize: "30px" }}>Help!</Navbar.Brand>
          <Navbar.Toggle id="collapseButton" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {!currentUser &&! currentOrgUser && <Nav.Link id="navLink" href="/register">Register</Nav.Link>}
              {!currentOrgUser && <Nav.Link id="navLink" href="/jobPosts">Job Board</Nav.Link>}
              {currentOrgUser && <Nav.Link id="navLink" href="/orgJobBoard">Job Board</Nav.Link>}
              {currentOrgUser && <Nav.Link id="navLink" href="/add">Add Job</Nav.Link>}
              {currentUser && <Nav.Link id="navLink" href="/userProfile">My Profile</Nav.Link>}
              {currentUser && <Nav.Link id="navLink" href="/savedJobs">Saved Jobs</Nav.Link>}
              {!currentUser && !currentOrgUser && <Nav.Link id="navLink" href="/logIn">Log In</Nav.Link>}
              {currentUser && <Nav.Link id="navLink" href="/logIn" onClick={this.logOut}>Log Out</Nav.Link>}
              {currentOrgUser && <Nav.Link id="navLink" href="/logIn" onClick={this.orgLogOut}>Log Out</Nav.Link>}
              <Nav.Link id="navLink" href="/aboutUs">About Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Bodyframe />
        <Switch>
          <Route exact path="/jobPostsMap" component={GoogleMap} />
          <Route exact path="/savedJobs" component={SavedJobPosts} />
          <Route exact path="/logIn" component={LogIn} />
          <Route exact path="/apply/:id" component={Apply} />
          <Route exact path="/register" component={Register} />
          <Route exact path={["/", "/jobPosts"]} component={JobPostsList} />
          <Route exact path="/add" component={AddJobPost} />
          <Route path="/jobPosts/:id" component={JobPost} />
          <Route path="/userProfile" component={UserProfile} />
          <Route path="/aboutUs" component={AboutUs} />

          <Route path="/orgJobBoard" component={OrgJobBoard}/>

          <Route exact path="/viewApplicants" component={ViewApplicants} /> 
          <Route path="/mapsearch" component={SearchLocation} />
          <Route path="/editUserProfile" component={EditUserProfile} />

        </Switch>

        <footer>
          <Footer />
        </footer>
      </Router>
    );
  }
}

export default App;
