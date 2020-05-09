import React, { Component } from "react";
import './AboutUs.css'
import HelpLogo from '../../img/logo.jpg'
import Catepillar from '../../img/catepillar.jpg'
import farmer from '../../img/farmer.JPG'
import beach from '../../img/beach.png'


export default class AboutUs extends Component {

    render() {
        return (
        <div id="aboutUs">
            <div id="aboutDiv">
                <div id="headDiv">
                    <h2 id="aboutHead">About the help! team:</h2>
                    <p id="aboutPara">Covid-19 pandemic has brought many challenges to people's lives and we are currently living in a time that needs each other's helps more than ever. We, the help! app team, have recognized that issue and wanted to provide some aids to the society by connecting people who can help. In our help! app, people will be able to post and apply for works that are related to solving the problems that are caused by the pandemic.</p>
                </div>
                <div class="items" id="itemOne">
                    <h3>Maria Davis</h3>
                    <p>I am a second term student in BCIT's CST program. I love designing apps to bring people together and make life easier. I hope help! assists our communities in overcoming the COVID-19 crisis.</p>
                    <img class="selfImg" src={beach}></img>
                </div>
                <div class="items" id="itemTwo">
                    <h3>Chase Lu</h3>
                    <p>I am a second going on third semester student in BCIT's CST program. My favorite plugin to use while coding is Sequelize and I love working with many-to-many data models.</p>
                    <img class="selfImg" src={'https://www.fintechfutures.com/files/2017/10/Chase-Logo.png'}></img>
                </div>
                <div class="items" id="itemThree">
                    <h3>Geun Uoo Kim</h3>
                    <p class="selfIntroduction">I started BCIT CST program in Winter 2020, and I chose this program because technology has always been my foremost interest. I also like to go hiking and chill.</p>
                    <img class="selfImg" src={farmer}></img>
                </div>
                <div class="items" id="itemFour">
                    <h3>Ethan Sadowski</h3>
                    <p class="selfIntroduction">I am a first semester student in BCIT's CST Program, I chose to enroll at BCIT because I have always had an interest in computing and I wanted to gain some more applied skills.</p>
                    <img class="selfImg" src={Catepillar}></img>
                </div>
            </div>
          </div>
        );
      }
}
