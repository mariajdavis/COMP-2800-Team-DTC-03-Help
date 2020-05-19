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
    this.onChangeResumePath = this.onChangeResumePath.bind(this);
    this.submitApplication = this.submitApplication.bind(this);
    this.upload = this.upload.bind(this);
    this.newApplication = this.newApplication.bind(this);

    var currentUser = AuthService.getCurrentUser();

    this.state = {
      id: null,
      jobPostID: parseInt(this.props.match.params.id),
      userID: currentUser.id,
      resumePath: ""
    };
  }

  onChangeResumePath(newResumePath) {
    const resPath = newResumePath.toString();
    this.setState({
      resumePath: resPath
    });
  }

  upload(e) {
    ReactS3.uploadFile(e.target.files[0], config)
      .then((data) => {
        const path = data.location;
        const pathString = path.toString();
        this.setState({
          resumePath: pathString
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  submitApplication() {
    var data = {
      jobPostID: this.state.jobPostID,
      userID: this.state.userID,
      resumePath: this.state.resumePath
    };

    ApplyDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          jobPostID: response.data.jobPostID,
          userID: response.data.userID,
          resumePath: response.data.resumePath,
          submitted: true
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  newApplication() {
    this.setState({
      id: null,
      jobPostID: null,
      userID: null,
      resumePath: "",

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

                    <label htmlFor="resumePath">Upload your resume here:</label>
                    <input
                      type="file"
                      id="resumePath"
                      required
                      onChange={this.upload}
                      name="resumePath"
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
