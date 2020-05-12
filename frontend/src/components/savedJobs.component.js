import React, { Component } from "react";
import JobPostDataService from "../services/jobPost.service";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import { Button, ToggleButton } from 'react-bootstrap';


export default class JobPostsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveSavedJobs = this.retrieveSavedJobs.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveJobPost = this.setActiveJobPost.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.state = {
      jobPosts: [],
      currentJobPost: null,
      currentJobPostSaved: true,
      currentIndex: -1,
      currentUser: AuthService.getCurrentUser()
    };
  }

  componentDidMount() {
    this.retrieveSavedJobs();
  }

  handleSave(e) {
    if (e.target.value === "save") {
      JobPostDataService.saveHandle({ userId: this.state.currentUser.id, jobPostId: this.state.currentIndex, save: true })
    }
    else {
      JobPostDataService.saveHandle({ userId: this.state.currentUser.id, jobPostId: this.state.currentIndex, save: false })
    }
  }

  retrieveSavedJobs() {
    console.log(this.state.currentUser);
    JobPostDataService.getAllSaved(this.state.currentUser.id)
      .then(response => {
        this.setState({
          jobPosts: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveSavedJobs();
    this.setState({
      currentJobPost: null,
      currentIndex: -1
    });
  }

  setActiveJobPost(jobPost, index) {
    this.setState({
      currentJobPost: jobPost,
      currentIndex: index
    });
    if (this.state.currentUser) {
      var data = {
        userId: this.state.currentUser.id,
        jobPostId: index
      };
      JobPostDataService.findSaved(data).then(res => {
        console.log('res.data.found = ' + res.data.found);
        this.setState({
          currentJobPostSaved: res.data.found ? true : false,
        })
      })
      console.log(this.state.currentJobPostSaved);
    }
  }

  render() {
    const { jobPosts, currentJobPost, currentIndex, currentUser } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Job Posts</h4>

          <ul className="list-group">
            {jobPosts &&
              jobPosts.map((jobPost, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveJobPost(jobPost, index)}
                  key={index}
                >
                  {jobPost.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllJobPosts}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentJobPost ? (
            <div>
              <h4>Job Post</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentJobPost.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentJobPost.description}
              </div>
              <div>
                <label>
                  <strong>Job Type:</strong>
                </label>{" "}
                {currentJobPost.jobType}
              </div>

              <Link
                to={"/jobPosts/" + currentJobPost.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
              {currentUser && !this.state.currentJobPostSaved && <Button variant="info" value="save" onClick={this.handleSave}> Save </Button>}
              {currentUser && this.state.currentJobPostSaved && <Button variant="info" value="unsave" onClick={this.handleSave}> Unsave </Button>}
            </div>
          ) : (
              <div>
                <br />
                <p>Please click on a JobPost...</p>
              </div>
            )}
        </div>
      </div>
    );
  }
}
