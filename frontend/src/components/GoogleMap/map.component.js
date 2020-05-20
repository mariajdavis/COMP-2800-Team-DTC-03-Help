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
      currentJobPostSaved: true
    }

    console.log(props)
  }

  handleSave(e) {
    if (e.target.value === "save") {
      JobPostDataService.saveHandle({ userId: this.state.currentUser.id, jobPostId: this.state.selected.id, save: true })
    }
    else {
      JobPostDataService.saveHandle({ userId: this.state.currentUser.id, jobPostId: this.state.selected.id, save: false })
    }
  }

  onMarkerClick = (jobPost) => {
    this.setState({
      selected: this.state.jobs[jobPost.id],
      activePosition: {
        lat: jobPost.position.lat,
        lng: jobPost.position.lng
      },
      showingInfoWindow: true
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
      var contentString = "<div><bold>Title: " + jobPost.title + "</bold></div><div><bold>Description: " + jobPost.description + "</bold></div>";
      console.log(jobPost);
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

  displayInfoWindow() {
    var contentString = "<div><bold>Title: " + this.state.selected.title + "</bold></div><div><bold>Description: " + this.state.selected.description + "</bold></div>";
    return <InfoWindow position={this.state.activePosition} visible={this.state.showingInfowindow} onClose={this.onClose}>
      <div>
        <bold>Title: </bold>
        {this.state.selected.title}
      </div>
      <div>
        <bold>Description: </bold>
        {this.state.selected.description}
      </div>
    </InfoWindow>
  }

  test() {
    console.log("hello");
  }

  sendToApplicationPage() {
    console.log(this.state.selected.id);
    window.location.assign('/apply/'+this.state.selected.id);
  }

  render() {
    const { showingInfoWindow, activePosition, selected, currentUser, currentJobPostSaved } = this.state;
    console.log("selected ");
    console.log(this.state.selected);
    console.log("activeposition ")
    console.log(this.state.activePosition);
    console.log("showinginfowindow");
    console.log(this.state.showingInfoWindow)
    return (
      <Map
        style={{
          width: '80%',
          height: '350%',
          margin: '5px 500px 5px 100px',
        }}
        google={this.props.google}
        zoom={8}
        //style={mapStyles}
        initialCenter={{ lat: 49, lng: -123 }}
      >
        {this.displayMarkers()}

        {showingInfoWindow && <CustomInfoWindow position={this.state.activePosition} visible={this.state.showingInfoWindow} onClose={this.onClose}>
          <div>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{this.state.selected.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">some text</Card.Subtitle>
                <Card.Text>
                  {this.state.selected.description}
                </Card.Text>
                <Button variant="primary" onClick={() => this.sendToApplicationPage()}>
                  Apply
            </Button>
                {currentUser && !currentJobPostSaved && <Button variant="primary" value="save" onClick={this.handleSave}>
                  Save
            </Button>}
                {currentUser && currentJobPostSaved && <Button variant="primary" value="unsave" onClick={this.handleSave}>
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