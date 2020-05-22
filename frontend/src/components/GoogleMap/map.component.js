import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import CustomInfoWindow from './CustomInfoWindow';
import JobPostDataService from "../../services/jobPost.service";
import AuthService from "../../services/auth.service";
import { Button, Card } from 'react-bootstrap';

/**
 * Implementation of the React Google Map api. Shows job posts as clickable markers on a google map.
 */
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.sendToApplicationPage = this.sendToApplicationPage.bind(this);
    this.onOptionsClick = this.onOptionsClick.bind(this);
    this.state = {
      jobs: props.jobs,
      showingInfoWindow: false,
      activeMarker: {},
      selected: {},
      activePosition: null,
      currentUser: AuthService.getCurrentUser(),
      currentJobPostSaved: true,
      styling: props.styling,
      markerCoords: null,
      showingOptionsWindow: false,
      selectedMultiple: {},
    }
  }

  /**
   * Creates a dictionary of coordinates:count to store how many job posts are at each set of coordinates.
   */
  componentDidMount() {
    let coords = {};
    for (let i = 0; i < this.state.jobs.length; i++) {
      let found = false;
      let j = 0;
      if (coords[this.concatCoords(this.state.jobs[i])]) {
        coords[this.concatCoords(this.state.jobs[i])]++
      }
      else {
        coords[this.concatCoords(this.state.jobs[i])] = 1;
      }
    }
    this.setState({
      markerCoords: coords
    })
  }

  concatCoords(jobPost) {
    return jobPost.lat.toString().concat("+", jobPost.lng.toString());
  }

  handleSave(e) {
    if (e.target.value === "save") {
      JobPostDataService.saveHandle({ userId: this.state.currentUser.id, jobPostId: this.state.selected.id, save: true })
      this.setState({ currentJobPostSaved: true });
    }
    else {
      JobPostDataService.saveHandle({ userId: this.state.currentUser.id, jobPostId: this.state.selected.id, save: false })
      this.setState({ currentJobPostSaved: false });
    }
  }

  onMarkerClick = (jobPost) => {
    if (this.state.markerCoords[this.concatCoords(jobPost.position)] > 1) {
      let sameCoordsJobs = [];
      for (let i = 0; i < this.state.jobs.length; i++) {
        if (this.state.jobs[i].lat == jobPost.position.lat && this.state.jobs[i].lng == jobPost.position.lng) {
          sameCoordsJobs.push(this.state.jobs[i]);
        }
      }
      this.setState({
        activePosition: {
          lat: jobPost.position.lat,
          lng: jobPost.position.lng
        },
        showingOptionsWindow: true,
        selectedMultiple: sameCoordsJobs
      })
    }
    else {
      this.handleDisplayWindow(jobPost);
    }
  }

  handleDisplayWindow = (jobPost) => {
    this.setState({
      selected: this.state.jobs[jobPost.id],
      activePosition: {
        lat: jobPost.position.lat,
        lng: jobPost.position.lng
      },
      showingInfoWindow: true,
      showingOptionsWindow: false
    });
    if (this.state.currentUser) {
      var data = {
        userId: this.state.currentUser.id,
        jobPostId: this.state.jobs[jobPost.id].id
      };
      JobPostDataService.findSaved(data).then(res => {
        this.setState({
          currentJobPostSaved: res.data.found ? true : false,
        })
      })
    }
  }

  onClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        activePosition: null,
        selected: null,
      });
    }
  };

  displayMarkers = () => {
    return this.state.jobs.map((jobPost, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: jobPost.lat,
            lng: jobPost.lng
          }}
          onClick={this.onMarkerClick.bind(jobPost)} >
        </Marker>
      )
    })
  }

  onOptionsClick(e) {
    this.onCloseOptions();
    let index = 0;
    let count = 0;
    while (this.state.jobs[index].id != e.target.value && count < this.state.jobs.length) {
      index++;
    }
    let data = {
      id: index,
      position: { lat: this.state.jobs[index].lat, lng: this.state.jobs[index].lng }
    }
    this.handleDisplayWindow(data);
  }
  displayOptions = () => {
    return this.state.selectedMultiple.map((jobPost, index) => {
      return (
        < div key={jobPost.id + index}>
          <Button variant="outline-info" value={jobPost.id} onClick={this.onOptionsClick}>{jobPost.title}</Button>
        </div >
      )
    })
  }

  onCloseOptions = () => {
    this.setState({
      showingOptionsWindow: false,
      selectedMultiple: {},
    })
  }

  displayOptionsWindow() {
    return <CustomInfoWindow position={this.state.activePosition} visible={this.state.showingOptionsWindow} onClose={this.onCloseOptions}>
      <div>
        <div><h5>Multiple positions are available at this location:</h5></div>
        <div style={{display:"grid", gridRowGap:"5px"}}>
          {this.displayOptions()};
        </div>
      </div>
    </CustomInfoWindow>
  }

  sendToApplicationPage() {
    window.location.assign('/apply/' + this.state.selected.id);
  }

  render() {
    const { showingOptionsWindow, styling, showingInfoWindow, activePosition, selected, currentUser, currentJobPostSaved } = this.state;
    return (
      <Map
        style={styling}
        google={this.props.google}
        zoom={8}
        initialCenter={{ lat: 49, lng: -123 }}
      >
        {this.displayMarkers()}
        {!showingInfoWindow && showingOptionsWindow && this.displayOptionsWindow()}
        {showingInfoWindow && <CustomInfoWindow position={this.state.activePosition} visible={this.state.showingInfoWindow} onClose={this.onClose}>
          <div>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{this.state.selected.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">some text</Card.Subtitle>
                <Card.Text>
                  {this.state.selected.description}
                </Card.Text>
                {currentUser && <Button variant="primary" onClick={() => this.sendToApplicationPage()}>
                  Apply
            </Button>}
                {currentUser && !currentJobPostSaved && <Button variant="primary" value="save" id="savebtn" onClick={this.handleSave}>
                  Save
            </Button>}
                {currentUser && currentJobPostSaved && <Button variant="primary" value="unsave" id="unsavebtn" onClick={this.handleSave}>
                  Unsave
            </Button>}
              </Card.Body>
            </Card>
          </div>
        </CustomInfoWindow>}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAAzxS6M98rJQ5DtHf89pIxHVZ2ISyln9U'
})(MapContainer);