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
        // $('#jobboard').addClass('postClicked')
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
                <header>
                    <Navbar />
                </header>
                <section id='ancement'>
                    <p>Announcement</p>
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
                        {/* <input 
                            type='text'
                            placeholder='Search by title'
                        ></input> */}
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
                                            "joblists list-group-item " +
                                            (index === currentIndex ? "active" : "")
                                        }
                                        onClick={() => {
                                            this.setActiveJobPost(jobPost, index)
                                        }}
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
                        </div>
                    </article>
                </section>
                <section id="bottom">
                    Bottom
                </section>
                <footer>
                    <Footer />
                </footer> 
            </main>
        )
    }
}

export default JobBoardPage