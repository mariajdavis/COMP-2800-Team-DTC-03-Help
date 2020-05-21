import React, { Component, Fragment } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import './jobBoard.css'
import ApplyDataService from "../../services/apply.service";
import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";


class ViewApplicantPage extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveApplicants = this.retrieveApplicants.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveApplicant = this.setActiveApplicant.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            applicants: [],
            currentApplicant: null,
            currentIndex: -1,
            searchTitle: "",
            toggleHandler: true,
            currentUser: AuthService.getCurrentOrgUser()
        };
    }

    componentDidMount() {
        this.retrieveApplicants();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveApplicants() {

        console.log(this.state.currentUser.id);

        // Retrieves all data from application/user/jobPost 
        // tables where orgID = currentOrgUser id
        ApplyDataService.findAllOrgApplicants(this.state.currentUser.id)
            .then(response => {
                this.setState({
                    applicants: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveApplicants();
        this.setState({
            currentApplicant: null,
            currentIndex: -1
        });
    }

    setActiveApplicant(application, index) {
        this.setState({
            currentApplicant: application,
            currentIndex: index
        });
    }

    searchTitle() {
        //     ApplyDataService.findAll({
        //       include: [{
        //           model: JobPostDataService,
        //           as: "jobPost",
        //           where: { orgID: currentOrgUser.id, title: { [Op.like]: 
        //           '%' + this.state.searchTitle + '%'}}
        //         }, {
        //           model: UserDataService,
        //           as: "applicant"
        //         }
        //       ],
        //       where: {
        //         id : id
        //       }
        //       .then(response => {
        //         this.setState({
        //           jobPosts: response.data
        //         });
        //         console.log(response.data);
        //       })
        //       .catch(e => {
        //         console.log(e);
        //       })
        //   })
    };

    render() {
        const { searchTitle, applicants, currentApplicant, currentIndex, currentUser } = this.state;

        return (
            <Fragment>
                <div id="contentLayoutJobs">
                    <div id="contentDiv">
                        <div>
                            <section id="content">
                                <ul id="category">
                                    <a href="/orgJobBoard">
                                        <li class="hover">My Job Posts</li>
                                    </a>
                                    <div id='currentPage'>
                                        <a href="/viewapplicantpage">
                                            <li id="ex">View Applicants</li>
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
                                            <h4>Applicants</h4>
                                            <div id="jobListWrapper">
                                            <ul className="list-group">
                                                {applicants &&
                                                    applicants.map((applicant, index) => (
                                                        <li
                                                            className={
                                                                "list-group-item " +
                                                                (index === currentIndex ? "active" : "")
                                                            }
                                                            id={applicant.id}
                                                            onClick={() => {

                                                                if (this.state.toggleHandler) { // triggers open job post animation             
                                                                    this.setActiveApplicant(applicant, index);
                                                                    this.state.toggleHandler = false;
                                                                    document.getElementById('job-list').classList.remove('job-list');
                                                                    document.getElementById('job-list').classList.add('job-list-clicked');
                                                                    document.getElementById('contentArea').classList.add('bgOpacity');
                                                                } else { // revert back
                                                                    this.setActiveApplicant("", "")
                                                                    this.state.toggleHandler = true;
                                                                    document.getElementById('job-list').classList.remove('job-list-clicked');
                                                                    document.getElementById('job-list').classList.add('job-list');
                                                                    document.getElementById('contentArea').classList.remove('bgOpacity');
                                                                }
                                                            }}
                                                            key={index}
                                                            style={{ color: 'black' }}
                                                        >
                                                            {applicant.jobPost.title + "    -    " + applicant.user.username}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>

                                        <div id="job-description-wrapper">

                                            {currentApplicant && (
                                                <div id='job-description'>
                                                    <h2>Applicant</h2>
                                                    <div>
                                                        <label>
                                                            <h4>Position:</h4>
                                                        </label>{" "}
                                                        {currentApplicant.jobPost.title}
                                                    </div>
                                                    <div>
                                                        <label>
                                                            <h4>Applicant:</h4>
                                                        </label>{" "}
                                                        {currentApplicant.user.username}
                                                    </div>
                                                    <div>
                                                        <label>
                                                            <h4>Contact Information:</h4>
                                                        </label>{" "}
                                                        {currentApplicant.user.email}
                                                    </div>
                                                    <a href={currentApplicant.resumePath} >View Resume</a>
                                                    <DropdownButton id="dropdown-basic-button" title="Application Status">
                                                        <Dropdown.Item onClick={() => ApplyDataService.updateStatus(currentApplicant.id, "pending")}> Pending </Dropdown.Item>
                                                        <Dropdown.Item onClick={() => ApplyDataService.updateStatus(currentApplicant.id, "accepted")}> Accepted </Dropdown.Item>
                                                        <Dropdown.Item onClick={() => ApplyDataService.updateStatus(currentApplicant.id, "rejected")}> Rejected </Dropdown.Item>
                                                    </DropdownButton>
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
            </Fragment>
        )
    }
}

export default ViewApplicantPage;