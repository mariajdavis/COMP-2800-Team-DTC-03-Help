import React, { Component } from "react";
import './AboutUs.css'
import HelpLogo from '../../img/logo.jpg'
import Catepillar from '../../img/catepillar.jpg'

export default class AboutUs extends Component {

    render() {
        return (
        <div id="aboutUs">
            <div id="aboutDiv">
                <div id="headDiv">
                    <h2 id="aboutHead">About the help! team:</h2>
                    <p id="aboutPara">When you meet with your Client, you will be accountable for your time and show them what you have finished during the sprint. A team must always have something finished to demonstrate at the end of the sprint.</p>
                </div>
                <div id="itemOne">
                    <h3>Maria Davis</h3>
                    <p> yo</p>
                    <img src={HelpLogo}></img>
                </div>
                <div id="itemTwo">
                    <h3>Chase Lu</h3>
                    <p> yo</p>
                    <img src={HelpLogo}></img>
                </div>
                <div id="itemThree">
                    <h3>Geun Uoo Kim</h3>
                    <p> yo</p>
                    <img src={HelpLogo}></img>
                </div>
                <div id="itemFour">
                    <h3>Ethan Sadowski</h3>
                    <p>I am a first semester student in BCIT's CST Program, I chose to enroll at BCIT because I have always had an interest in computing and I wanted to gain some more applied skills.</p>
                    <img src={Catepillar}></img>
                </div>
            </div>
          </div>
        );
      }
}