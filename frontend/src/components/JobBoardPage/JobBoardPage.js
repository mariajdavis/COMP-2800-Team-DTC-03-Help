import React, { Component, Fragment } from 'react';
import './jobBoard.css'
import JobPostDataService from "../../services/jobPost.service";
import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { Button, ToggleButton } from 'react-bootstrap';
import ViewJobPage from "./ViewJobPage";

/**
 * Creates job board page component
 */
class JobBoardPage extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
    this.orgLogOut = this.orgLogOut.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser,
      currentOrgUser: AuthService.getCurrentOrgUser
    };
  }

  /**
   * Sets currentUser and currentOrgUser fields immediately
   * upon loading
   */
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

  /**
   * Logs out individual (job-seeker) user account
   */
  logOut() {
    AuthService.logout();
  }

  /**
   * Logs out business user account
   */
  orgLogOut() {
    AuthService.orgLogout();
  }

    /**
     * Render job board page component
     */
    render() {
      const {currentUser, currentOrgUser}=this.state;
      
        return ( 
          <div id="contentLayoutJobs">
            <div id="contentDiv">
              <div>
                <section id="content">
                    <ul id="category">
                        <div id='currentPage'>
                          <a href="/jobposts">
                            <li id="ex">Job Posts</li>
                          </a>
                        </div>
                    </ul>
                    <ViewJobPage />
                </section>
              </div>
            </div>
          </div>
        )
    }
}

export default JobBoardPage