import React, { Component } from "react";
import JobPostDataService from "../services/jobPost.service";

export default class JobPost extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getJobPost = this.getJobPost.bind(this);
    this.updateJobPost = this.updateJobPost.bind(this);
    this.deleteJobPost = this.deleteJobPost.bind(this);

    this.state = {
      currentJobPost: {
        id: null,
        title: "",
        description: "",
        jobType: ""
      },
      message: ""
    };
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
      <div>
        {currentJobPost ? (
          <div className="edit-form">
            <h4>JobPost</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentJobPost.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
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
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteJobPost}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateJobPost}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a JobPost...</p>
          </div>
        )}
      </div>
    );
  }
}
