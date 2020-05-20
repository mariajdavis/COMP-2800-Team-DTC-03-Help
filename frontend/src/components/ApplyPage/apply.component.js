import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import ApplyDataService from "../../services/apply.service";
import ReactS3 from 'react-s3';
import '../AboutUs/AboutUs.css';
import './apply.css';
import happyBear from '../../img/applied.png';


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
    this.onChangeComments = this.onChangeComments.bind(this);
    this.submitApplication = this.submitApplication.bind(this);
    this.upload = this.upload.bind(this);
    this.newApplication = this.newApplication.bind(this);

    var currentUser = AuthService.getCurrentUser();

    this.state = {
      id: null,
      jobPostID: parseInt(this.props.match.params.id),
      userID: currentUser.id,
      resumePath: "",
      comments: ""
    };
  }

  onChangeResumePath(newResumePath) {
    const resPath = newResumePath.toString();
    this.setState({
      resumePath: resPath
    });
  }

  onChangeComments(e) {
    this.setState({
      comments: e.target.value
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
      resumePath: this.state.resumePath,
      comments: this.state.comments
    };

    ApplyDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          jobPostID: response.data.jobPostID,
          userID: response.data.userID,
          resumePath: response.data.resumePath,
          comments: response.data.comments,
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
      comments: "",

      submitted: false
    });
  }

  render() {

    return (
      <div id='contentLayout'>
        <div id='contentDiv'>
          {this.state.submitted ? (
            <div id='applied-container'>
              <div>
                <h1 id="applied-text">You applied to this job successfully!</h1>
              </div>
              <img id="applied-img" src={happyBear} />
            </div>
          ) : (
              <div id='applyBackground'>
                <div id='applyContainer'>
                  <div id='resumeContainer'>
                    <label id="resume-label" htmlFor="resumePath">Resume:</label>
                    <input
                      type="file"
                      id="resumePath"
                      required
                      onChange={this.upload}
                      name="resumePath"
                    />
                  </div>

                  <div id='commentContainer'>
                    <label id="comment-label" htmlFor="comments">Comments:</label>
                    <textarea
                      rows="5"
                      cols="60"
                      type="text"
                      id="comments"
                      required
                      value={this.state.comments}
                      onChange={this.onChangeComments}
                      name="comments"
                      placeholder="Type comments here"
                    />
                  </div>

                  <button id='submitBtn' onClick={this.submitApplication} className="btn btn-success">
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
