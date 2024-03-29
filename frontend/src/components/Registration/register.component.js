import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import "../Layouts/ContentLayout.css"
import "./registration.css"

import AuthService from "../../services/auth.service";

/**
 * 
 * @param {*} value form value
 */
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        *Required field
      </div>
    );
  }
};
/**
 * 
 * @param {*} value form value
 */
const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};
/**
 * 
 * @param {*} value form value
 */
const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
/**
 * 
 * @param {*} value form value
 */
const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

/**
 * Component for registration.
 */
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeFullName = this.onChangeFullName.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleRegisterType = this.handleRegisterType.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      fullName: "",
      phoneNumber: "",
      successful: false,
      message: "",
      registerType: "user"
    };
  }
  /**
   * Handles form change event.
   * 
   * @param {*} e event
   */
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  /**
   * Handles form change event.
   * 
   * @param {*} e event
   */
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  /**
   * Handles form change event.
   * 
   * @param {*} e event
   */
  onChangeFullName(e) {
    this.setState({
      fullName: e.target.value
    });
  }
  /**
   * Handles form change event.
   * 
   * @param {*} e event
   */
  onChangePhoneNumber(e) {
    this.setState({
      phoneNumber: e.target.value
    });
  }
  /**
   * Handles form change event.
   * 
   * @param {*} e event
   */
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  /**
   * Handles form change event.
   * 
   * @param {*} e event
   */
  handleRegisterType(e) {
    this.setState({
      registerType: e.target.value
    });
    console.log(e.target.value);
  }
  /**
   * Initializes states on component mount.
   * 
   * @param {*} message message
   * @param {*} successful success state
   */
  componentDidMount(message, successful) {
    this.setState({
      message: message,
      successful: successful
    });
  }
  /**
   * Handles registration process.
   * 
   * @param {*} e event
   */
  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();
    console.log(this.state.registerType);
    if (this.checkBtn.context._errors.length === 0) {
      if (this.state.registerType === "user") {
        AuthService.register(
          this.state.username,
          this.state.email,
          this.state.password,
          this.state.fullName,
          this.state.phoneNumber
        ).then(
          response => {
            this.componentDidMount(response.data.message, true);
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            this.setState({
              successful: false,
              message: resMessage
            });
          }
        );
      }
      else {
        AuthService.orgRegister(
          this.state.username,
          this.state.email,
          this.state.password
        ).then(
          response => {
            this.componentDidMount(response.data.message, true);
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            this.setState({
              successful: false,
              message: resMessage
            });
          }
        );
      }
    }
  }

  render() {
    const radioBtnStyle = {
      marginLeft: '5%'
    }

    return (
      <div id="contentLayoutRegister">
        <div id="contentDivRegister">
          <div>
            <div id="registration-background">
              <Form
                onSubmit={this.handleRegister}
                ref={c => {
                  this.form = c;
                }}
              >
                {!this.state.successful && (
                  <div id="addJobAreaRegister">
                    <div id="toggleDiv" style={{ display: 'flex', justifyContent: 'center' }}>
                      <div>
                        <label class="btn btn-secondary">
                          <input class="m-2" type="radio" name="options" id="user" autocomplete="off" value="user" checked={this.state.registerType === "user"} onChange={this.handleRegisterType} />Register As Individual User</label>
                      </div>
                      <div style={radioBtnStyle}>
                        <label class="btn btn-secondary">
                          <input class="m-2" type="radio" name="options" id="orgUser" autocomplete="off" value="orgUser" checked={this.state.registerType === "orgUser"} onChange={this.handleRegisterType} />Register As Organization</label>
                      </div>
                    </div>
                    <div id="form1" className="form-group">
                      <label htmlFor="username">Username</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        validations={[required, vusername]}
                      />
                    </div>

                    <div id="form2" className="form-group">
                      <label htmlFor="fullName">Full Name</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="fullName"
                        value={this.state.fullName}
                        onChange={this.onChangeFullName}
                      />
                    </div>
                    <div id="form3" className="form-group">
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="phoneNumber"
                        value={this.state.phoneNumber}
                        onChange={this.onChangePhoneNumber}
                      />
                    </div>

                    <div id="form4" className="form-group">
                      <label htmlFor="email">Email</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        validations={[required, email]}
                      />
                    </div>

                    <div id="form5" className="form-group">
                      <label htmlFor="password">Password</label>
                      <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[required, vpassword]}
                      />
                    </div>

                    <div id="signup" className="form-group">
                      <button className="btn btn-primary btn-block" style={{ marginTop: '30px' }}>Sign Up</button>
                    </div>
                  </div>
                )}

                {this.state.message && (
                  <div className="">
                    <div
                      className={
                        this.state.successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {this.state.message}
                    </div>
                  </div>
                )}
                <CheckButton
                  style={{ display: "none" }}
                  ref={c => {
                    this.checkBtn = c;
                  }}
                />

              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}