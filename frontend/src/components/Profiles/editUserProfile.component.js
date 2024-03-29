import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import UserDataService from "../../services/user.service";
import "../Layouts/ContentLayout.css"
import "./profile.css";
import { createBrowserHistory } from 'history';
export const browserHistory = createBrowserHistory();

export default class EditUserProfile extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFullName = this.onChangeFullName.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.retrieveUserInfo = this.retrieveUserInfo.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.returnToUserProfile = this.returnToUserProfile.bind(this);

        this.state = {
            currentUser: {
                id: null,
                username: "",
                fullName: "",
                phoneNumber: "",
                email: "",
                password: "",
                createdAt: "",
                updatedAt: ""
              },
              mounted: false
        };
    }

    /** Get the user information */
    componentDidMount() {
        const user = AuthService.getCurrentUser();
        this.retrieveUserInfo(user.id);
    }


    shouldComponentUpdate(nextProps, nextState) {
        if ( this.state.mounted ) {
          return false;
        }
        return true;
      }

    /** Retrieves all current user data */
    retrieveUserInfo(id) {
        UserDataService.findOneUser(id)
            .then(response => {
                this.setState({
                    currentUser: response.data
                });
                console.log(this.state.currentUser);
            })
            .catch(e => {
                console.log(e);
            });
    }

    /** Update new user's full name to the state */
    onChangeFullName(e) {
        const fullName = e.target.value;

        this.setState(prevState => ({
            currentUser: {
                ...prevState.currentUser,
                fullName: fullName
            }
        }));
    }

    /** Update new user email to the state */
    onChangeEmail(e) {
        const email = e.target.value;

        this.setState(prevState => ({
            currentUser: {
                ...prevState.currentUser,
                email: email
            }
        }));
    }

    /** Update new user phone number to the state */
    onChangePhoneNumber(e) {
        const phoneNumber = e.target.value;

        this.setState(prevState => ({
            currentUser: {
                ...prevState.currentUser,
                phoneNumber: phoneNumber
            }
        }));
    }

    /** Update new user information to the database */
    updateUser() {
        UserDataService.updateUser(
            this.state.currentUser.id,
            this.state.currentUser.phoneNumber,
            this.state.currentUser.email,
            this.state.currentUser.fullName
        ).then(response => {
            console.log(response ? "success" : "fail");
            browserHistory.push('/userProfile');
        }).catch(e => {
            console.log(e);
        });

       //this.props.history.push('/userProfile');
    }

    returnToUserProfile() {
        // this.props.history.push('/userProfile');
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div id="contentLayoutAddJobFix">
                <div id="contentDiv">

                    <div id="profile-edit-background">
                        {currentUser ? (
                            <div>
                                <h3 id="edit-profile-tite">Update Profile</h3>
                                <div>
                                    <form id="edit-profile-form">

                                        <div className="form-group">
                                            <label htmlFor="fullName">Full Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fullName"
                                                value={currentUser.fullName}
                                                // value={""}
                                                onChange={this.onChangeFullName}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="email"
                                                value={currentUser.email}
                                                // value={""}
                                                onChange={this.onChangeEmail}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlForm="phoneNumber">Phone Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="phoneNumber"
                                                value={currentUser.phoneNumber}
                                                // value={""}
                                                onChange={this.onChangePhoneNumber}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            id="update-btn"
                                            className="badge badge-success"
                                            onClick={this.updateUser()}
                                        >
                                            Update
                                        </button>
                                    </form>
                                    <p>{this.state.message}</p>
                                </div>
                            </div>
                        ) : (
                                <div>
                                    <br />
                                    <p>...</p>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        );
    }
}
