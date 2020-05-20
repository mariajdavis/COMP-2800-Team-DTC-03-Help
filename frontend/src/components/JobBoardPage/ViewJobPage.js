import React, { Component, Fragment } from "react";
import './jobBoard.css'
import JobPostDataService from "../../services/jobPost.service";
import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import MapContainer from "../GoogleMap/map.component";

import { TwitterTimelineEmbed, TwitterShareButton } from 'react-twitter-embed';




class ViewJobPage extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveJobPosts = this.retrieveJobPosts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveJobPost = this.setActiveJobPost.bind(this);
    this.removeAllJobPosts = this.removeAllJobPosts.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.logOut = this.logOut.bind(this);
    this.orgLogOut = this.orgLogOut.bind(this);
    this.handleJobView = this.handleJobView.bind(this);

    this.state = {
      jobPosts: [],
      currentJobPost: null,
      currentIndex: -1,
      searchTitle: "",
      toggleHandler: true,
      currentJobPostSaved: true,
      currentUser: AuthService.getCurrentUser(),
      currentOrgUser: AuthService.getCurrentOrgUser,
      currentView: "1"
    };
  }

  componentDidMount() {
    this.retrieveJobPosts();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  handleJobView(e) {
    console.log("target value " + e.target.value);
    if (e.target.value === "1") {
      this.setState({
        currentView: e.target.value
      })
      console.log("list");
      console.log(this.state.currentView)
    }
    else {
      this.setState({
        currentView: e.target.value
      })
      console.log("map");
      console.log(this.state.currentView)
    }
  }

  handleSave(e) {
    if (e.target.value === "save") {
      JobPostDataService.saveHandle({ userId: this.state.currentUser.id, jobPostId: this.state.currentJobPost.id, save: true })
    }
    else {
      JobPostDataService.saveHandle({ userId: this.state.currentUser.id, jobPostId: this.state.currentJobPost.id, save: false })
    }
  }

  retrieveJobPosts() {
    JobPostDataService.getAll()
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
    this.retrieveJobPosts();
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
        jobPostId: jobPost.id
      };
      console.log(data);
      JobPostDataService.findSaved(data).then(res => {
        console.log('res.data.found = ' + res.data.found);
        this.setState({
          currentJobPostSaved: res.data.found ? true : false,
        })
      })
      console.log(this.state.currentJobPostSaved);
    }
  }

  removeAllJobPosts() {
    JobPostDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {

    JobPostDataService.findByTitle(this.state.searchTitle)
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

  logOut() {
    AuthService.logout();
  }

  orgLogOut() {
    AuthService.orgLogout();
  }

  render() {
    const { searchTitle, jobPosts, currentJobPost, currentIndex, currentUser, currentView } = this.state;
    return (
      <Fragment>

        <form id='searchbar'>
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={this.onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.searchTitle}
            >
              Search
                            </button>
          </div>
        </form>
        <article id='jobboard'>
          <div id='jobboardImage'>
            <div id="job-list" className="col-md-12">
              <div id="title-area" class="d-flex flex-row">
                <div class="mr-auto"><h4>Job Posts</h4></div>
                <div>
                  <ToggleButtonGroup type="radio" name="jobViewOptions" defaultValue={1}>
                    <ToggleButton onClick={this.handleJobView} value={1}>List</ToggleButton>
                    <ToggleButton onClick={this.handleJobView} value={2}>Map</ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </div>
              <div>
                <ul className="list-group">
                  {currentView === "1" && jobPosts &&
                    jobPosts.map((jobPost, index) => (
                      <li
                        className={
                          "list-group-item " +
                          (index === currentIndex ? "active" : "")
                        }
                        id={jobPost.title + jobPost.id}
                        onClick={() => {

                          if (this.state.toggleHandler) { // triggers open job post animation             
                            this.setActiveJobPost(jobPost, index);
                            this.state.toggleHandler = false;
                            document.getElementById('job-list').classList.remove('col-md-12');
                            document.getElementById('job-list').classList.add('col-md-7');
                            document.getElementById('contentArea').classList.add('bgOpacity');
                          } else { // revert back
                            this.setActiveJobPost("", "")
                            this.state.toggleHandler = true;
                            document.getElementById('job-list').classList.remove('col-md-7');
                            document.getElementById('job-list').classList.add('col-md-12');
                            document.getElementById('contentArea').classList.remove('bgOpacity');
                          }

                        }}
                        key={index}
                        style={{ color: 'black' }}
                      >
                        {jobPost.title}
                      </li>
                    ))}
                </ul>
              </div>

              {/* <button
                className="m-3 btn btn-sm btn-danger"
                onClick={this.removeAllJobPosts}
              >
                Remove All
                                </button> */}
            </div>

          </div>

          <div id="job-description-wrapper">
            <div id='job-description'>
              {currentJobPost && (
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
                  <div>
                    <label>
                      <strong>Hourly Rate:</strong>
                    </label>{" "}
                    {currentJobPost.rate}
                  </div>
                  <div>
                    <label>
                      <strong>Start Date:</strong>
                    </label>{" "}
                    {currentJobPost.startDate}
                  </div>
                  <div>
                    <label>
                      <strong>Contract Length:</strong>
                    </label>{" "}
                    {currentJobPost.contractLength}
                  </div>
                  <div>
                    <label>
                      <strong>Location:</strong>
                    </label>{" "}
                    {currentJobPost.location}
                  </div>

                  <Link
                    to={"/jobPosts/" + currentJobPost.id}
                    className="badge badge-warning"
                  >
                    Edit
                                    </Link>
                  <Link
                    to={"/apply/" + currentJobPost.id}
                    className="badge badge-success"
                  >
                    Apply
                                    </Link>
                  {currentUser && !this.state.currentJobPostSaved && <Button variant="info" value="save" onClick={this.handleSave}> Save </Button>}
                  {currentUser && this.state.currentJobPostSaved && <Button variant="info" value="unsave" onClick={this.handleSave}> Unsave </Button>}
                </div>
              )}
            </div>
          </div>
        </article>
        <div id="map" height="500px" width="100%">
          {currentView === "2" && jobPosts && <MapContainer jobs={jobPosts} styling={{
          width: '80%',
          height: '350%',
          margin: '5px 500px 5px 100px'}}/>}
        </div>
      </Fragment>
    )
  }
}

export default ViewJobPage;