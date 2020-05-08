import React, { Component } from "react";
import JobPostDataService from "../services/jobPost.service";

import AuthService from "../services/auth.service";
import TagDataService from "../services/tag.service";


export default class AddJobPost extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeJobType = this.onChangeJobType.bind(this);
    this.onChangeRate = this.onChangeRate.bind(this);
    this.onChangeContractLength = this.onChangeContractLength.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.saveJobPost = this.saveJobPost.bind(this);
    this.newJobPost = this.newJobPost.bind(this);
    this.setTags = this.setTags.bind(this);

    var currentOrgUser = AuthService.getCurrentOrgUser();

    this.state = {
      id: null,
      title: "",
      description: "",
      jobType: "",
      rate: "",
      contractLength: "",
      startDate: "",
      orgID: currentOrgUser.id,
      submitted: false,
      tagArray: null
    };
  }

  setTags(e) {
    var options = e.target.options;
    var tags = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        tags.push(options[i].value);
        console.log(options[i].value);
      }
    }
    this.setState({
      tagArray: [...e.target.options].map(o => o.value)
    })
    this.tagArray = new Array();
    this.tagArray = tags;
    console.log(this.tagArray);
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

  onChangeRate(e) {
    this.setState({
      rate: e.target.value
    });
  }

  onChangeContractLength(e) {
    this.setState({
      contractLength: e.target.value
    });
  }

  onChangeStartDate(e) {
    this.setState({
      startDate: e.target.value
    });
  }

  saveJobPost() {

    var data = {
      title: this.state.title,
      description: this.state.description,
      jobType: this.state.jobType,
      rate: this.state.rate,
      contractLength: this.state.contractLength,
      startDate: this.state.startDate,
      orgID: this.state.orgID
    };

    JobPostDataService.create(data)
      .then(response => {
        console.log(response.data.id)
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          jobType: response.data.jobType,

          rate: response.data.rate,
          contractLength: response.data.contractLength,
          startDate: response.data.startDate,
          orgID: response.data.orgID,
          submitted: true
        });
        this.tagArray.forEach(tag => {
          saveJobTag(tag, response.data.id);
        });

      })
      .catch(e => {
        console.log(e);
      });

      function saveJobTag(tagText, id) {
        var tagData = {
          jobPostID: id,
          tag: tagText
        }
        TagDataService.create(tagData)
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
      }
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
              <div className="form">
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
                <label htmlFor="jobType">Paid or Volunteer</label>
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

              <div className="form-group">
                <label htmlFor="title">Hourly Rate</label>
                <input
                  type="text"
                  className="form-control"
                  id="rate"
                  required
                  value={this.state.rate}
                  onChange={this.onChangeRate}
                  name="rate"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Start Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="startDate"
                  required
                  value={this.state.startDate}
                  onChange={this.onChangeStartDate}
                  name="startDate"
                />
              </div>

              <div className="form-group">
                <label htmlFor="jobType">Length of Contract</label>
                <input
                  type="text"
                  className="form-control"
                  id="contractLength"
                  required
                  value={this.state.contractLength}
                  onChange={this.onChangeContractLength}
                  name="contractLength"
                />
              </div>

              <div className="form-group">
                <label htmlFor="jobType">Tags</label><br/>
                <select id="tags" name="tags" onChange={this.setTags} multiple>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Food">Food</option>
                  <option value="Essential">Essential</option>
                  <option value="Elderly">Elderly</option>
                  <option value="Hospital">Hospital</option>
                  <option value="Charity">Charity</option>
                  <option value="Charity">Education</option>
                </select>
              </div>

              <div>
              Hold down the Ctrl (Windows) or Command (Mac) button to select multiple tags.
              </div>
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
