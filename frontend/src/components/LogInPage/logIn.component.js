import React, { Component } from "react";
import RegisterService from "../../services/register.service";

export default class logIn extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.signIn = this.signIn.bind(this);

    this.state = {
      id: null,
      email: "", 
      password: "",

      submitted: false
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

  signIn() {
    var data = {
      email: this.state.email,
      password: this.state.password
    };

    RegisterService.findUser(data)
      .then(response => {
        if (response==1) {
            this.setState({
                submitted: true
            });
        }
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div id="logInForm" className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newUser}>
              Register
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                className="form-control"
                id="password"
                required
                value={this.state.password}
                onChange={this.onChangePassword}
                name="password"
              />
            </div>

            <div>
              <button onClick={this.signIn} className="btn btn-success">
                Sign In
              </button>
              <a href="./register">
                <button style={{marginLeft:'20px'}} className="btn btn-success">
                  Register
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}
