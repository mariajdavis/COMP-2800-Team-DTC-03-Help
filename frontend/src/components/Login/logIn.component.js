import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
import { isEmail } from "validator";
import "bootstrap/dist/js/bootstrap.js";
import "../Layouts/ContentLayout.css";
import "./login.css";



const loginPosition = {
  position: 'absolute',
  top: '100px',
  bottom: '100px',
  
}

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        *Required field
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};


export default class logIn extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeLoginType = this.onChangeLoginType.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
      message: "",
      loginType: "user"
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeLoginType(e) {
    this.setState({
      loginType: e.target.value
    });
    console.log("state: "+this.state.loginType);
    console.log("e: "+e.target.value);
    console.log("test: "+this);
  }
  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      if (this.state.loginType === "user") {
        AuthService.login(this.state.email, this.state.password).then(
          () => {
            this.props.history.push("/");
            window.location.reload();
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            this.setState({
              loading: false,
              message: resMessage
            });
          }
        );
      }
      else {
        AuthService.orgLogin(this.state.email, this.state.password).then(
          () => {
            this.props.history.push("/orgJobBoard");
            window.location.reload();
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            this.setState({
              loading: false,
              message: resMessage
            });
          }
        );
      }
    } else {
      this.setState({
        loading: false
      });
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
        <div id="login-background">
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div >
              <label class="btn btn-secondary">
              <input class="m-2" type="radio" name="options" id="user" autoComplete="off" value="user" checked={this.state.loginType==="user"} onChange={this.onChangeLoginType} />Log In As Individual User</label>
            </div>
            <div style={radioBtnStyle}>
              <label class="btn btn-secondary">
              <input class="m-2" type="radio" name="options" id="orgUser" autoComplete="off" value="orgUser" checked={this.state.loginType==="orgUser"} onChange={this.onChangeLoginType} />Log In As Organization</label>
            </div>
          </div>
          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                validations={[email]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
                style={{margin:'0px'}}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
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