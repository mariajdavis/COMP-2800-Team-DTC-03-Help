import React, { Component } from "react";
import AuthService from "../services/auth.service";
import "./Layouts/ContentLayout.css"



export default class OrgProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentOrgUser()
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div id="contentLayout">
            <div id="contentUserProfileDiv">
              <div>
      <div className="container">
        <header className="">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.username}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        {/* <strong>Authorities:</strong> */}
        {/* <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul> */}
      </div>
      </div>
      </div>
      </div>
    );
  }
}