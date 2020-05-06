import React, { Component, Fragment } from 'react';
import './jobBoard.css'
import JobPostDataService from "../../services/jobPost.service";
import { Link } from "react-router-dom";

import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';


class JobBoardPage extends Component {
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
          searchTitle: ""
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



    render() {
        const { searchTitle, jobPosts, currentJobPost, currentIndex } = this.state;

        return (
            <main id="JobBoard">
                <section id='ancement'>
                  <div class='animated-text'>
                    <div class='line'>Announcement</div>
                    <div class='line'>Section</div>
                    <div class='line'>Help! App</div>
                    <div class='line'>DTC Team03</div>
                    <div class='line'>Covid 19</div>
                    <div class='line'>Year 2020</div>
                  </div>
                </section>
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
                            <div className="col-md-12">
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
                                            this.setActiveJobPost(jobPost, index); // shows the post description
                                            let clickedPost = document.getElementById(jobPost.title + jobPost.id);
                                            clickedPost.classList.toggle("postClick");
                                            // let postDescription = document.getElementById('openPost');
                                            // postDescription.classList.toggle("postClick");
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
                        <div id="openPost" className="col-md-6">
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
                                    </div>
                                ) : (
                                    <div>
                                    <br />
                                    <p>Please click on a JobPost...</p>
                                    </div>
                                )}
                          </div>
                    </article>
                </section>
                <section id="bottom">
                    Bottom
                </section>
            </main>
        )
    }
}

export default JobBoardPage