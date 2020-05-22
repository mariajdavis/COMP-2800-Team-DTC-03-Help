import React, { Component } from "react";
import JobPostDataService from "../services/jobPost.service";
import AuthService from "../services/auth.service";
import TagDataService from "../services/tag.service";
import "./Layouts/ContentLayout.css"
import { Map, GoogleApiWrapper } from 'google-maps-react';
import SearchLocation from "./mapSearch";
import MapContainer from "./GoogleMap/map.component";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import "./Registration/registration.css"

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        *Required field
      </div>
    );
  }
};

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
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.saveMapData = this.saveMapData.bind(this);

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
      tagArray: null,
      location: "",
      coordinates: { lat: null, lng: null }
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

  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    })
  }

  saveJobPost() {

    var data = {
      title: this.state.title,
      description: this.state.description,
      jobType: this.state.jobType,
      rate: this.state.rate,
      contractLength: this.state.contractLength,
      startDate: this.state.startDate,
      orgID: this.state.orgID,
      location: this.state.location,
      lat: this.state.coordinates.lat,
      lng: this.state.coordinates.lng
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
          location: response.data.location,
          lat: response.data.lat,
          lng: response.data.lng,
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


  saveMapData(place, latLng) {
    this.setState({
      location: place,
      coordinates: latLng
    })
    console.log(this.state.location)
    console.log(this.state.coordinates)
  }

  render() {


    return (
      <div id="contentLayoutJobs">
        <div id="contentDiv">
          <div>
            <section id="content">
              {this.state.submitted ? (
                <div>
                  <h4>You submitted successfully!</h4>
                  <button className="btn btn-success" onClick={this.newJobPost}>
                    Add
            </button>
                </div>
              ) : (
                  <div id="addJobArea">
                      
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        validations={[required]}
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
                        validations={[required]}
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
                        
                        value={this.state.contractLength}
                        onChange={this.onChangeContractLength}
                        name="contractLength"
                      />
                    </div>

                    <div className="form-group" id="tagSelect">
                      <label htmlFor="jobType">Tags</label><br></br>
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

                    <div className="form-group">
                      <label htmlFor="jobType">Location</label>
                      <SearchLocation callData={this.saveMapData}></SearchLocation>
                      {/* <input
                      type="text"
                      className="form-control"
                      id="contractLength"
                      required
                      value={this.state.contractLength}
                      onChange={this.onChangeContractLength}
                      name="contractLength"
                    /> */}
                    </div>

                    <div>
                      Hold down the Ctrl (Windows) or Command (Mac) button to select multiple tags.
              <br></br>
                      <button onClick={this.saveJobPost} className="btn btn-success">
                        Submit
            </button>
                    </div>



                  </div>
                )}
            </section>
          </div>
        </div>
      </div>
    );
  }
}
