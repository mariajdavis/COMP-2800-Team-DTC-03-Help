import React, { Component, Fragment } from 'react';
import './jobBoard.css'
import ViewJobPage from "./ViewJobPage";
import AuthService from "../../services/auth.service";


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
                        <a href="/viewapplicant">
                          <li class="onHover">View Applicants</li>
                        </a>
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