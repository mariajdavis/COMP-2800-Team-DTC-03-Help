import React, { Component } from "react";
import RegisterService from "../../services/register.service";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.saveUser = this.saveUser.bind(this);

    this.state = {
      id: null,
      username: "",
      email: "", 
      password: "",

      submitted: false
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
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

  saveUser() {
    var data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    RegisterService.create(data)
      .then(response => {
        this.setState({
          
          submitted: true
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You registered successfully!</h4>
            <button className="btn btn-success" Link to={"/jobPosts"}>
              Register
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                required
                value={this.state.username}
                onChange={this.onChangeUsername}
                name="username"
              />
            </div>

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

            <button onClick={this.saveUser} className="btn btn-success">
              Register
            </button>
          </div>
        )}
      </div>
    );
  }
}
