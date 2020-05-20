import React, { Component, Fragment } from 'react';
import './jobBoard.css'
import JobPostDataService from "../../services/jobPost.service";
import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { Button, ToggleButton } from 'react-bootstrap';
import { TwitterTimelineEmbed, TwitterShareButton } from 'react-twitter-embed';
import { FacebookProvider, Share } from 'react-facebook';

const lineBreak = '\n'


class OrgJobBoardPage extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveJobPosts = this.retrieveJobPosts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveJobPost = this.setActiveJobPost.bind(this);
    this.removeAllJobPosts = this.removeAllJobPosts.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.createJobMessage = this.createJobMessage.bind(this);

    this.state = {
      jobPosts: [],
      currentJobPost: null,
      currentIndex: -1,
      searchTitle: "",
      toggleHandler: true,
      currentJobPostSaved: true,
      currentUser: AuthService.getCurrentOrgUser(),
      currentJobMsg: ""
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

  handleSave(e) {
    if (e.target.value === "save") {
      JobPostDataService.saveHandle({ userId: this.state.currentUser.id, jobPostId: this.state.currentJobPost.id, save: true })
    }
    else {
      JobPostDataService.saveHandle({ userId: this.state.currentUser.id, jobPostId: this.state.currentJobPost.id, save: false })
    }
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
            orgJobList.push(response.data[i])
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

  createJobMessage(title, description, jobType, rate, startDate, contractLength) {
    return `New Job Listing: ` + title + `\n` + `Description: ` + description + `\n` + `Job Type: ` + jobType + `\n` + `Rate: ` + rate + `\n` + `Start Date: ` + startDate + `\n` + `Contract Length: ` + contractLength + `\n` + `\n`
  }





  render() {
    const { searchTitle, jobPosts, currentJobPost, currentIndex, currentUser } = this.state;

    return (
      <div id="contentLayoutJobs">
        <div id="contentDiv">
          <div>
            <section id="content">
              <ul id="category">
                <div id='currentPage'>
                  <a href="/orgJobBoard">
                    <li class="hover">My Job Posts</li>
                  </a>
                </div>
                <a href="/viewapplicants">
                  <li id="ex">View Applicants</li>
                </a>

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
                    <h4 id="jobListHead">Job Posts</h4>
                    <div id="jobListWrapper">
                      <ul className="list-group">
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
                      </ul>
                    </div>
                    <div id="job-description-wrapper">
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
                            to={"/jobPosts/" + currentJobPost.id}
                            className="badge badge-warning"
                          >
                            Edit
                                    </Link>

                          <TwitterShareButton

                            url={'https://helpservices.herokuapp.com/jobPosts'}
                            options={{ text: this.createJobMessage(currentJobPost.title, currentJobPost.description, currentJobPost.jobType, currentJobPost.rate, currentJobPost.startDate, currentJobPost.contractLength) }}
                          />
                          <FacebookProvider appId="702487117185786">
                            <Share quote={this.createJobMessage(currentJobPost.title, currentJobPost.description, currentJobPost.jobType, currentJobPost.rate, currentJobPost.startDate, currentJobPost.contractLength)} href="https://helpservices.herokuapp.com/jobPosts">
                              {({ handleClick, loading }) => (
                                <button type="button" disabled={loading} onClick={handleClick}>Share on Facebook</button>
                              )}
                            </Share>
                          </FacebookProvider>
                        </div>
                      )}


                    </div>

                  </div>
                </div>

              </article>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

export default OrgJobBoardPage