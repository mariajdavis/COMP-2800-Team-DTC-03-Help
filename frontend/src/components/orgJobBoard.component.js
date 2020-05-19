import React, { Component, Fragment } from 'react';
import './jobBoard.css'
import JobPostDataService from "../../services/jobPost.service";
import { Link } from "react-router-dom";
import AuthService from '../../services/auth.service'

import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';


class OrgJobBoardPage extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveJobPosts = this.retrieveJobPosts.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveJobPost = this.setActiveJobPost.bind(this);
        this.removeAllJobPosts = this.removeAllJobPosts.bind(this);
        this.searchTitle = this.searchTitle.bind(this);
    
        this.state = {
          jobPosts: [],
          currentJobPost: null,
          currentIndex: -1,
          searchTitle: "",
          toggleHandler: true
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
    
      retrieveJobPosts() {
        currentOrg = AuthService.getCurrentOrgUser()
        JobPostDataService.findByOrgId(currentOrg.orgID)
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
      }
    
      removeAllJobPosts() {
        currentOrg = AuthService.getCurrentOrgUser()
        JobPostDataService.deleteAllOrg(currentOrg.orgID)
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      searchTitle() {
        currentOrg = AuthService.getCurrentOrgUser()
        JobPostDataService.findOrgPostByTitle(this.state.searchTitle, currentOrg.orgID)
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



    render() {
        const { searchTitle, jobPosts, currentJobPost, currentIndex } = this.state;

        return ( 
          <div id="contentLayoutJobs">
            <div id="contentDiv">
              <div>
                <section id="content">
                    <ul id="category">
                        <a id='ex'>
                            <li id="ex">Job Posts</li>
                        </a>
                        <li>Apply</li>
                        <li>More</li>
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
                        <div id="job-description-wrapper" className="col-md-6">
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

                                    <Link
                                        to={"/jobPosts/" + currentJobPost.id}
                                        className="badge badge-warning"
                                    >
                                        Edit
                                    </Link>
                                    
                                    </div>
                                ) }
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