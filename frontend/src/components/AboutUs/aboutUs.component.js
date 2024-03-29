import React, { Component } from "react";
import './AboutUs.css'
import HelpLogo from '../../img/logo.jpg'
import chase from '../../img/chase.png'
import Catepillar from '../../img/catepillar.jpg'
import farmer from '../../img/farmer.JPG'
import beach from '../../img/beach.png'
import $ from 'jquery';
import { EasterEgg } from "../EasterEgg/EasterEgg";


/**
 * About Us page component
 */
export default class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.eggHandle = this.eggHandle.bind(this);

        this.state = {
            count: 0
        }
    }

    /** Removes the main content of about us page */
    eggHandle() {
        if (this.state.count >= 6) {
            $('#aboutUs').hide();
        }
        this.setState({
            count: this.state.count + 1
        })
        console.log(this.state.count);

    }
    render() {
        const { count } = this.state;
        return (
            <div>
                {count >= 7 && <EasterEgg></EasterEgg>}
                <div id="aboutUs">
                    <div id="aboutDiv">
                        <div id="headDiv">
                            <h2 id="aboutHead">About the help! team:</h2>
                            <p id="aboutPara">Covid-19 pandemic has brought many challenges to people's lives and we are currently living in a time where we need each other's help more than ever. We, the <button onClick={this.eggHandle}>help!</button> app team, have recognized this issue and want to aid society by connecting people who can help each other. In our help! app, people will be able to post and apply for positions related to solving the problems that are caused by the pandemic.</p>
                        </div>
                        <div id="introductions">
                            <div class="items" id="itemOne">
                                <div class="name-container">
                                    <p class="names">Maria Davis</p>
                                </div>
                                <p class="selfIntroduction"><span>I am a second term student in BCIT's CST program. I love designing apps to bring people together and make life easier. I hope help! assists our communities in overcoming the COVID-19 crisis.</span></p>
                                <img class="selfImg" src={beach}></img>
                            </div>
                            <div class="items" id="itemTwo">
                                <div class="name-container">
                                    <p class="names">Chase Lu</p>
                                </div>
                                <p class="selfIntroduction"><span>I am a second term student in BCIT's CST program. I love designing apps to bring people together and make life easier. I hope help! assists our communities in overcoming the COVID-19 crisis.</span></p>
                                <img class="selfImg" src={chase}></img>
                            </div>
                            <div class="items" id="itemThree">
                                <div class="name-container">
                                    <p class="names">Geun Uoo Kim</p>
                                </div>
                                <p class="selfIntroduction"><span>I started BCIT CST program in Winter 2020, and I chose this program because technology has always been my foremost interest. I also like to go hiking and chill.</span></p>
                                <img class="selfImg" src={farmer}></img>
                            </div>
                            <div class="items" id="itemFour">
                                <div class="name-container">
                                    <p id="ethan" class="names">Ethan Sadowski</p>
                                </div>
                                <p class="selfIntroduction"><span>I am a first semester student in BCIT's CST Program, I chose to enroll at BCIT because I have always had an interest in computing and I wanted to gain some more applied skills.</span></p>
                                <img class="selfImg" src={Catepillar}></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}