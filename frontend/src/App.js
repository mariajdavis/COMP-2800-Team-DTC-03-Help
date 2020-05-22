import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
<<<<<<< HEAD
import AddJobPost from "./components/add-jobPost.component";
import JobPost from "./components/jobPost.component";
import Apply from "./components/apply.component";
import JobPostsList from "./components/JobBoardPage/JobBoardPage";
import Register from "./components/register.component";
import LogIn from "./components/logIn.component";
import Bodyframe from './components/Bodyframe/Bodyframe.js';
import Footer from './components/Footer/Footer.js';
import UserProfile from "./components/user-profile.component";
import { Nav, Navbar } from 'react-bootstrap'
import './Navbar.css'
import AuthService from "./services/auth.service";
import AboutUs from './components/AboutUs/aboutUs.component'
import SavedJobPosts from './components/savedJobs.component';
=======
import AddJobPost from "./components/JobBoardPage/add-jobPost.component";
import JobPost from "./components/JobBoardPage/jobPost.component";
import Apply from "./components/ApplyPage/apply.component";
import JobPostsList from "./components/JobBoardPage/JobBoardPage";
import Register from "./components/Registration/register.component";
import LogIn from "./components/Login/logIn.component";
import Bodyframe from './components/Bodyframe/Bodyframe.js';
import Footer from './components/Footer/Footer.js';
import UserProfile from "./components/Profiles/user-profile.component";
import { Nav, Navbar } from 'react-bootstrap'
import './Navbar.css'
import AuthService from "./services/auth.service";
import AboutUs from './components/AboutUs/aboutUs.component';
import SavedJobPosts from './components/JobBoardPage/savedJobs.component';
import EditUserProfile from './components/Profiles/editUserProfile.component';
import OrgProfile from './components/Profiles/org-profile.component'
import OrgJobBoard from './components/JobBoardPage/OrgJobBoardPage.js'
import ViewApplicants from './components/JobBoardPage/ViewApplicantPage';
import GoogleMap from './components/GoogleMap/map.component';
import SearchLocation from './components/GoogleMap/mapSearch';

>>>>>>> dev


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

<<<<<<< HEAD
  componentDidMount() {
    const user = AuthService.getCurrentUser;
    const orgUser = AuthService.getCurrentOrgUser;

    if (user) {
=======
  /** Get user data to the component's state */
  componentDidMount() {
>>>>>>> dev
      this.setState({
        currentUser: AuthService.getCurrentUser(),
        currentOrgUser: AuthService.getCurrentOrgUser()
      });
<<<<<<< HEAD
    }
  }

=======
  }

  /** Log out individual user */
>>>>>>> dev
  logOut() {
    AuthService.logout();
  }

<<<<<<< HEAD
=======
  /** Log out organization user */
>>>>>>> dev
  orgLogOut() {
    AuthService.orgLogout();
  }

  render() {
    const { currentUser, currentOrgUser } = this.state;
    return (
      <Router>
        <Navbar style={{ backgroundColor: "#2743A5" }} expand="sm">
<<<<<<< HEAD
          <Navbar.Brand className="navBrand" id="navBrand" style={{ fontFamily: "Racing Sans One", color: "white", fontSize: "30px" }}>test4</Navbar.Brand>
          <Navbar.Toggle id="collapseButton" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {!currentUser && <Nav.Link id="navLink" href="/register">Register</Nav.Link>}
              <Nav.Link id="navLink" href="/jobPosts">Job Board</Nav.Link>
              {currentOrgUser && <Nav.Link id="navLink" href="/add">Add Job</Nav.Link>}
              {currentUser && <Nav.Link id="navLink" href="/userProfile">My Profile</Nav.Link>}
              {currentUser && <Nav.Link href="/savedJobs">Saved Jobs</Nav.Link>}
=======
          <Navbar.Brand className="navBrand" id="navBrand" style={{ fontFamily: "Racing Sans One", color: "white", fontSize: "30px" }}>help!</Navbar.Brand>
          <Navbar.Toggle id="collapseButton" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {!currentUser &&! currentOrgUser && <Nav.Link id="navLink" href="/register">Register</Nav.Link>}
              {!currentOrgUser && <Nav.Link id="navLink" href="/jobPosts">Job Board</Nav.Link>}
              {currentOrgUser && <Nav.Link id="navLink" href="/orgJobBoard">Job Board</Nav.Link>}
              {currentOrgUser && <Nav.Link id="navLink" href="/orgProfile">My Profile</Nav.Link>}
              {currentOrgUser && <Nav.Link id="navLink" href="/add">Add Job</Nav.Link>}
              {currentUser && <Nav.Link id="navLink" href="/userProfile">My Profile</Nav.Link>}
              {currentUser && <Nav.Link id="navLink" href="/savedJobs">Saved Jobs</Nav.Link>}
>>>>>>> dev
              {!currentUser && !currentOrgUser && <Nav.Link id="navLink" href="/logIn">Log In</Nav.Link>}
              {currentUser && <Nav.Link id="navLink" href="/logIn" onClick={this.logOut}>Log Out</Nav.Link>}
              {currentOrgUser && <Nav.Link id="navLink" href="/logIn" onClick={this.orgLogOut}>Log Out</Nav.Link>}
              <Nav.Link id="navLink" href="/aboutUs">About Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Bodyframe />
        <Switch>
<<<<<<< HEAD
=======
          <Route exact path="/jobPostsMap" component={GoogleMap} />
>>>>>>> dev
          <Route exact path="/savedJobs" component={SavedJobPosts} />
          <Route exact path="/logIn" component={LogIn} />
          <Route exact path="/apply/:id" component={Apply} />
          <Route exact path="/register" component={Register} />
          <Route exact path={["/", "/jobPosts"]} component={JobPostsList} />
          <Route exact path="/add" component={AddJobPost} />
          <Route path="/jobPosts/:id" component={JobPost} />
          <Route path="/userProfile" component={UserProfile} />
          <Route path="/aboutUs" component={AboutUs} />
<<<<<<< HEAD
=======
          <Route path="/orgProfile" component={OrgProfile}/>
          <Route path="/orgJobBoard" component={OrgJobBoard}/>

          <Route exact path="/viewApplicants" component={ViewApplicants} /> 
          <Route path="/mapsearch" component={SearchLocation} />
          <Route path="/editUserProfile" component={EditUserProfile} />

>>>>>>> dev
        </Switch>

        <footer>
          <Footer />
        </footer>
      </Router>
    );
  }
}

export default App;
