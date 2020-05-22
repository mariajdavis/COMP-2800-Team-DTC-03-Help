import React, { Component } from "react";
import JobPostDataService from "../../services/jobPost.service";
import "./../Layouts/ContentLayout.css"


export default class JobPost extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeJobType = this.onChangeJobType.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeRate = this.onChangeRate.bind(this);
    this.onChangeContractLength = this.onChangeContractLength.bind(this);
    this.getJobPost = this.getJobPost.bind(this);
    this.updateJobPost = this.updateJobPost.bind(this);
    this.deleteJobPost = this.deleteJobPost.bind(this);
    this.goBack = this.goBack.bind(this);

    this.state = {
      currentJobPost: {
        id: null,
        title: "",
        description: "",
        jobType: "",
        rate: "",
        contractLength: "",
        startDate: "",
        orgID: ""
      },
      message: ""
    };
  }

  goBack(){
    this.props.history.goBack()
  }

  componentDidMount() {
    this.getJobPost(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentJobPost: {
          ...prevState.currentJobPost,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentJobPost: {
        ...prevState.currentJobPost,
        description: description
      }
    }));
  }

  onChangeJobType(e) {
    const jobType = e.target.value;
    
    this.setState(prevState => ({
      currentJobPost: {
        ...prevState.currentJobPost,
        jobType: jobType
      }
    }));
  }


  onChangeStartDate(e) {
    const startDate = e.target.value;

    this.setState(function(prevState) {
      return {
        currentJobPost: {
          ...prevState.currentJobPost,
          startDate: startDate
        }
      };
    });
  }

  onChangeRate(e) {
    const rate = e.target.value;
    
    this.setState(prevState => ({
      currentJobPost: {
        ...prevState.currentJobPost,
        rate: rate
      }
    }));
  }

  onChangeContractLength(e) {
    const contractLength = e.target.value;
    
    this.setState(prevState => ({
      currentJobPost: {
        ...prevState.currentJobPost,
        contractLength: contractLength
      }
    }));
  }


  getJobPost(id) {
    JobPostDataService.get(id)
      .then(response => {
        this.setState({
          currentJobPost: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateJobPost() {
    JobPostDataService.update(
      this.state.currentJobPost.id,
      this.state.currentJobPost
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The jobPost was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteJobPost() {    
    JobPostDataService.delete(this.state.currentJobPost.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/jobPosts')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentJobPost } = this.state;

    return (
      <div id="contentLayoutAddJob">
        <div id="contentDiv">
        
      <div className="card">
        {currentJobPost ? (
          <div>
          <h4>JobPost</h4>
          <div>
            <form id="addJobArea">
              
              <div className="form-group">
                <label htmlFor="title"><strong>Title</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentJobPost.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description"><strong>Description</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentJobPost.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Job Type: </strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="jobType"
                  value={currentJobPost.jobType}
                  onChange={this.onChangeJobType}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Hourly Rate: </strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="rate"
                  value={currentJobPost.jobType}
                  onChange={this.onChangeJobType}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Start Date: </strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="startDate"
                  value={currentJobPost.jobType}
                  onChange={this.onChangeJobType}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Contract Length: </strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contractLength"
                  value={currentJobPost.jobType}
                  onChange={this.onChangeJobType}
                />
              </div>

            

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteJobPost}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={() => this.updateJobPost.then(this.props.history.goBack())}
              
            >
              Update
            </button>
            </form>
            <p>{this.state.message}</p>
          </div>
          </div>
        ) : (
          <div>
            <br />
            <p><center>Job post deleted!</center></p>
          </div>
        )}
        </div>
        </div>
      </div>
    );
  }
}
