import React, { Component } from "react";
import AuthService from "../services/auth.service";
import ApplyDataService from "../services/apply.service";
import ReactS3 from 'react-s3';
import './AboutUs/AboutUs.css'


// AWS A3 file storage config
const config = {
  bucketName: 'helpresumes',
  region: 'us-west-2',
  accessKeyId: 'AKIAIRAIJ67CYYUYKRVA',
  secretAccessKey: '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'
}

export default class Apply extends Component {
  constructor(props) {
    super(props);
    this.onChangeResume = this.onChangeResume.bind(this);
    this.submitApplication = this.submitApplication.bind(this);
    this.upload = this.upload.bind(this);
    this.newApplication = this.newApplication.bind(this);

    var currentUser = AuthService.getCurrentUser();

    this.state = {
      id: null,
      jobPostID: this.props.match.params.id,
      userID: currentUser.id,
      resume: ""
    };
  }

  onChangeResume(newResume) {
    this.setState({
      resume: newResume
    });
  }

  submitApplication() {

    var data = {
      jobPostID: this.state.jobPostID,
      userID: this.state.userID,
      resume: this.state.resume
    };

    ApplyDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          jobPostID: response.data.jobPostID,
          userID: response.data.userID,
          resume: response.data.resume,
          submitted: true
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  upload(e) {
    console.log(e.target.files[0]);
    ReactS3.uploadFile(e.target.files[0], config)
      .then((data) => {
        console.log(data.location);
        this.setState({
          resume: data.location
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  newApplication() {
    this.setState({
      id: null,
      jobPostID: null,
      userID: null,
      resume: "",

      submitted: false
    });
  }

  render() {

    return (
      <div id='contentLayout'>
        <div id='contentDiv'>
          {this.state.submitted ? (
            <div>
              <h4>You applied to this job successfully!</h4>
              <button className="btn btn-success" onClick={this.newJobPost}>
                Add
            </button>
            </div>
          ) : (
              <div>

                
                  <div>

                    <label htmlFor="resume">Upload your resume here:</label>
                    <input
                      type="file"
                      id="resume"
                      required
                      value={this.state.description}
                      onChange={this.upload}
                      name="resume"
                    />

                    <button onClick={this.submitApplication} className="btn btn-success">
                      Submit
                    </button>
                  </div>

                </div>
              
            )}
        </div>
      </div>
    );
  }
}
