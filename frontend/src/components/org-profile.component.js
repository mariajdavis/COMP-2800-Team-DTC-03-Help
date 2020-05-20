import React, { Component } from "react";
import AuthService from "../services/auth.service";
import "./Layouts/ContentLayout.css"
import JobPostDataService from "../services/jobPost.service";



export default class OrgProfile extends Component {
  constructor(props) {
    super(props);
    this.retrieveJobPosts = this.retrieveJobPosts.bind(this)
    this.state = {
      currentUser: AuthService.getCurrentOrgUser(),
      jobPosts: []
    };
  }

  componentDidMount() {
    this.retrieveJobPosts();
  }

  retrieveJobPosts() {
    console.log(this.state.currentUser.id)
    JobPostDataService.getAll()
      .then(response => {
        console.log(response.data);
        let orgJobList = []
        let i = 0;
        for (i = 0; i < response.data.length; i++) {
          if (response.data[i].orgID == this.state.currentUser.id) {
            orgJobList.push(response.data[i].title)
          }
        }
        this.setState({
          jobPosts: orgJobList
        });
        console.log(this.state.jobPosts);
      })
      .catch(e => {
        console.log(e);
      });
  }



  render() {
    const { currentUser } = this.state;
    const jobPostings = this.state.jobPosts.map((title) => { return <li style={{ color: 'black' }}>{title}</li>; });
    console.log(this.state.jobPosts)


    return (
      <div id="contentLayout">
        <div id="contentUserProfileDiv">
          <div>
            <div className="container">
              <header className="">
                <h3>
                  <strong>Organization Profile</strong>
                </h3>
              </header>
              <p>
                <strong>Name:</strong>{" "}
                {currentUser.username}
              </p>
              <p>
                <strong>Id:</strong>{" "}
                {currentUser.id}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {currentUser.email}
              </p>
              <strong>Current Postings:</strong>
              <ul>
                {jobPostings}
              </ul>

            </div>
          </div>
        </div>
      </div>
    );
  }
}