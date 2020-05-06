import React, { Component } from "react";
import JobPostDataService from "../services/jobPost.service";

export default class AddJobPost extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeJobType = this.onChangeJobType.bind(this);
    this.saveJobPost = this.saveJobPost.bind(this);
    this.newJobPost = this.newJobPost.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      jobType: "",

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeJobType(e) {
    this.setState({
      jobType: e.target.value
    });
  }

  saveJobPost() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      jobType: this.state.jobType
    };

    JobPostDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          jobType: response.data.jobType,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newJobPost() {
    this.setState({
      id: null,
      title: "",
      description: "",
      jobType: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newJobPost}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="jobType">Job Type</label>
              <input
                type="text"
                className="form-control"
                id="jobType"
                required
                value={this.state.jobType}
                onChange={this.onChangeJobType}
                name="jobType"
              />
            </div>

            <button onClick={this.saveJobPost} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
