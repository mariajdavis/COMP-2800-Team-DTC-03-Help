import React, {Component} from "react";
import ReactDOM from "react-dom";
import { InfoWindow } from "google-maps-react";

/**
 * Source: https://stackoverflow.com/questions/53615413/how-to-add-a-button-in-infowindow-with-google-maps-react
 * 
 * Used the top answer in this thread. This custom infowindows allows onclick events on infowindows.
 */
export default class CustomInfoWindows extends Component {
    constructor(props) {
      super(props);
      this.infoWindowRef = React.createRef();
      this.contentElement = document.createElement(`div`);
    }
  
    componentDidUpdate(prevProps) {
      if (this.props.children !== prevProps.children) {
        ReactDOM.render(
          React.Children.only(this.props.children),
          this.contentElement
        );
        this.infoWindowRef.current.infowindow.setContent(this.contentElement);
      }
    }
  
    render() {
      return <InfoWindow ref={this.infoWindowRef} {...this.props} />;
    }
  }