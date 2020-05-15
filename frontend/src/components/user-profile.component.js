import React, { Component } from "react";
import AuthService from "./../services/auth.service";
import "./Layouts/ContentLayout.css";
import black_background from "./../img/profile_bg.png";
import "./profile.css";
import HelpLogo from "./../img/logo.jpg";



export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <div id="liquidHeading">
          <h3 id="myProfile">My Profile</h3>
        </div>
        <div id="contentProfile">
          <div id="userProfileBackground">
            <img src={HelpLogo} id="profileImg"></img>       
            <div id="sub-info">
              <p><strong>Vancouver, B.C.</strong></p>
              <p><strong>Home Address: </strong>1234 BCIT Ave.</p>
              <p><strong>Postal Code: </strong>A1B-2CD</p>
              <p><strong>Phone Number: </strong>123-456-7890</p>
            </div>
            <div id="main-info">
              <p><strong>Name: </strong>{currentUser.username}</p>
              <p><strong>E-mail: </strong>{currentUser.email}</p>
              <p><strong>Occupation: </strong>student</p>
            </div>
            <div id="my-resume">
              <h3>My Resume</h3>
              <div id="resume-content">
                <p>resume stuffs</p>
              </div>
            </div>   
          </div>
        </div>
      </div>
    );
  }
}