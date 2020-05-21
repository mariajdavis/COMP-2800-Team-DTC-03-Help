import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import CustomInfoWindow from './CustomInfoWindow';
import JobPostDataService from "../../services/jobPost.service";
import AuthService from "../../services/auth.service";
import { Button, Card } from 'react-bootstrap';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.sendToApplicationPage = this.sendToApplicationPage.bind(this);
    this.onOptionsClick = this.onOptionsClick.bind(this);
    this.state = {
      // stores: [{lat: 47.49855629475769, lng: -122.14184416996333},
      //         {latitude: 47.359423, longitude: -122.021071},
      //         {latitude: 47.2052192687988, longitude: -121.988426208496},
      //         {latitude: 47.6307081, longitude: -122.1434325},
      //         {latitude: 47.3084488, longitude: -122.2140121},
      //         {latitude: 47.5524695, longitude: -122.0425407}]
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
    console.log("coords");
    console.log(coords);
    console.log(this.state.markerCoords);
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
      console.log("test5");
      console.log(jobPost)
    }
    else {
      this.handleDisplayWindow(jobPost);
    }
  }

  handleDisplayWindow = (jobPost) => {
    console.log("testb")
    console.log(this.state.jobs[jobPost.id]);
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
        console.log('res.data.found = ' + res.data.found);
        this.setState({
          currentJobPostSaved: res.data.found ? true : false,
        })
      })
      console.log(this.state.currentJobPostSaved);
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
    console.log("test3");
    console.log(e.target.value);
    console.log("testa");
    let index = 0;
    let count = 0;
    while (this.state.jobs[index].id != e.target.value && count < this.state.jobs.length) {
      index++;
    }
    let data = {
      id: index,
      position: { lat: this.state.jobs[index].lat, lng: this.state.jobs[index].lng }
    }
    console.log(data);
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

  test() {
    console.log("hello");
  }

  sendToApplicationPage() {
    console.log(this.state.selected.id);
    window.location.assign('/apply/' + this.state.selected.id);
  }

  render() {
    const { showingOptionsWindow, styling, showingInfoWindow, activePosition, selected, currentUser, currentJobPostSaved } = this.state;
    // console.log("selected ");
    // console.log(this.state.selected);
    // console.log("activeposition ")
    // console.log(this.state.activePosition);
    // console.log("showinginfowindow");
    // console.log(this.state.showingInfoWindow)
    return (
      <Map
        style={styling}
        google={this.props.google}
        zoom={8}
        //style={mapStyles}
        initialCenter={{ lat: 49, lng: -123 }}
      >
        {this.displayMarkers()}
        {!showingInfoWindow && showingOptionsWindow && this.displayOptionsWindow()}
        {showingInfoWindow && <CustomInfoWindow position={this.state.activePosition} visible={this.state.showingInfoWindow} onClose={this.onClose}>
          <div>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{this.state.selected.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{this.state.selected.jobType}</Card.Subtitle>
                <Card.Text>
                  {this.state.selected.description}
                </Card.Text>
                <Button variant="primary" onClick={() => this.sendToApplicationPage()}>
                  Apply
            </Button>
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