import React, { Component, Fragment } from "react";
import '../JobBoardPage/jobBoard.css'
import JobPostDataService from "../../services/jobPost.service";
import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import MapContainer from "../GoogleMap/map.component";

/**
 * Creates saved job page component
 */
class SavedJobs extends Component {
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
      currentJobPostSaved: null,
      currentUser: AuthService.getCurrentUser(),
      currentView: "1"
    };
  }

  /**
   * Calls function to retrieve saved job posts, immediately
   */
  componentDidMount() {
    this.retrieveJobPosts();
  }

  /**
   * Updates current text to search by title
   * 
   * @param {*} e 
   */
  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  /**
   * Handles view job feature
   * 
   * @param {*} e 
   */
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

  /**
   * Handles save job feature
   * 
   * @param {*} e 
   */
  handleSave(e) {
    if (e.target.value === "save") {
      JobPostDataService.saveHandle({ userId: this.state.currentUser.id, jobPostId: this.state.currentJobPost.id, save: true });
      this.setState({ currentJobPostSaved: true });
    }
    else {
      JobPostDataService.saveHandle({ userId: this.state.currentUser.id, jobPostId: this.state.currentJobPost.id, save: false });
      this.setState({ currentJobPostSaved: false });
    }
  }

  /**
   * Retrieves saved job posts from database specific to a user
   */
  retrieveJobPosts() {
    JobPostDataService.getAllSaved(this.state.currentUser.id)
      .then(response => {
        this.setState({
          jobPosts: response.data
        });
        console.log("getallsaved response " + response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  /**
   * Refreshes saved jobs list
   */
  refreshList() {
    this.retrieveJobPosts();
    this.setState({
      currentJobPost: null,
      currentIndex: -1
    });
  }

  /**
   * Sets active job post to selected saved job post
   * to view details
   * 
   * @param {*} jobPost 
   * @param {*} index 
   */
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
      console.log("saved? " + this.state.currentJobPostSaved);
    }
  }

  /**
   * Removes all job posts
   */
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

  /**
   * Retrieve job posts from database with searched text in title
   */
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

  /**
   * Log out (job-seeker) user
   */
  logOut() {
    AuthService.logout();
  }

  /**
   * Log out business user
   */
  orgLogOut() {
    AuthService.orgLogout();
  }

  /**
   * Render saved jobs page component
   */
  render() {
    const { searchTitle, jobPosts, currentJobPost, currentIndex, currentUser, currentView } = this.state;
    return (
      <Fragment>
        <div id="contentLayoutJobs">
          <div id="contentDiv">
            <div>
              <section id="content">
                <ul id="category">
                  <div id='currentPage'>
                    <a href="/jobposts">
                      <li id="ex">Job Posts</li>
                    </a>
                  </div>
                </ul>
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
                    <div id="job-list" className="job-list">
                      <div id="jobListHead">
                        <h4>Job Posts</h4>
                        <ToggleButtonGroup type="radio" name="jobViewOptions" defaultValue={1}>
                          <ToggleButton onClick={this.handleJobView} value={1}>List</ToggleButton>
                          <ToggleButton onClick={this.handleJobView} value={2}>Map</ToggleButton>
                        </ToggleButtonGroup>
                      </div>
                      <div id="indJobList">
                        {currentView === "1" && <ul className="list-group">
                          {jobPosts &&
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
                                    document.getElementById('job-list').classList.remove('job-list');
                                    document.getElementById('job-list').classList.add('job-list-clicked');
                                    document.getElementById('contentArea').classList.add('bgOpacity');
                                  } else { // revert back
                                    this.setActiveJobPost("", "")
                                    this.state.toggleHandler = true;
                                    document.getElementById('job-list').classList.remove('job-list-clicked');
                                    document.getElementById('job-list').classList.add('job-list');
                                    document.getElementById('contentArea').classList.remove('bgOpacity');
                                  }

                                }}
                                key={index}
                                style={{ color: 'black' }}
                              >
                                {jobPost.title}
                              </li>
                            ))}
                        </ul>}
                      </div>
                      {currentView === "1" && <div id="job-description-wrapper">

                        {currentJobPost && (
                          <div id='job-description'>
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
                      </div>}
                    </div>
                  </div>
                </article>
                <div id="map" height="500px" width="100%">
                  {currentView === "2" && jobPosts &&
                    <MapContainer
                      jobs={jobPosts}
                      styling={{
                        width: '80%',
                        height: '300%',
                        margin: '5px 100px'
                      }}
                    />}
                </div>
              </section>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default SavedJobs;