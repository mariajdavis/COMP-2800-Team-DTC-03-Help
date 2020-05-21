import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "./../services/auth.service";
import UserDataService from "./../services/user.service";
import "./Layouts/ContentLayout.css";
import black_background from "./../img/profile_bg.png";
import "./profile.css";
import HelpLogo from "./../img/logo.jpg";


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.retrieveUserInfo = this.retrieveUserInfo.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  componentDidMount() {
    this.retrieveUserInfo();
  }

  retrieveUserInfo() {

    console.log(this.state.currentUser.id);

    // Retrieves all current user data
    UserDataService.findOneUser(this.state.currentUser.id)
        .then(response => {
            this.setState({
                currentUser: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
}

  render() {
    const { currentUser} = this.state;

    return (
      <div id="profile-container">
        <div id="liquidHeading">
          <p id="myProfile">My Profile</p>
        </div>
        <div id="contentProfile">
          <div id="userProfileBackground">
            <img src={HelpLogo} id="profileImg"></img>       
            {/* <div id="sub-info">
              <p><strong>Vancouver, B.C.</strong></p>
              <p><strong>Home Address: </strong>1234 BCIT Ave.</p>
              <p><strong>Postal Code: </strong>A1B-2CD</p>
              <p><strong>Phone Number: </strong>123-456-7890</p>
            </div> */}
            <div id="main-info">
              <p><strong>Name: </strong>{currentUser.fullName}</p>
              <p><strong>E-mail: </strong>{currentUser.email}</p>
              <p><strong>Phone Number:</strong>{currentUser.phoneNumber}</p>
              <Link
                          to={"/editUserProfile/"}
                          className="badge badge-warning"
                          id='edit-btn'
                        >
                          Edit
                                    </Link>
            </div>
            {/* <div id="my-resume">
              <h3>My Resume</h3>
              <div id="resume-content">
                <p>resume stuffs</p>
              </div>
            </div>    */}
          </div>
        </div>
      </div>
    );
  }
}