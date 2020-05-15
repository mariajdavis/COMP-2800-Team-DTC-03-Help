import React, { Component, Fragment } from "react";
import './jobBoard.css'
import JobPostDataService from "../../services/jobPost.service";
import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { Button, ToggleButton } from 'react-bootstrap';
import {EasterEgg} from "../EasterEgg/EasterEgg";



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
    
        this.state = {
          jobPosts: [],
          currentJobPost: null,
          currentIndex: -1,
          searchTitle: "",
          toggleHandler: true,
          currentJobPostSaved: true,
          currentUser: AuthService.getCurrentUser(),
          currentOrgUser: AuthService.getCurrentOrgUser
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
        const { searchTitle, jobPosts, currentJobPost, currentIndex, currentUser } = this.state;

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
                                <h4>Job Posts</h4>

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
                                        style={{color: 'black'}}
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
                                ) }
                          </div>
                        </div>
                    </article>
            </Fragment>
        )
    }
}

export default ViewJobPage;