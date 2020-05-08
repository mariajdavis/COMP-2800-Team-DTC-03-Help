import React, { Component } from 'react';
import './Bodyframe.css'
import backgroundFrame from "../../img/background_frame.png"

const imgStyle = {
    zIndex: '-1',
    paddingTop: '50px',
    paddingBottom: '50px',
    width: '100%',
    height: 'auto',
}


function mainBody() {
    return ( 
            <main id="contentArea">
                <section id='ancement'>
                    <div class='animated-text'>
                        <div class='line'>Announcement</div>
                        <div class='line'>Section</div>
                        <div class='line'>Help! App</div>
                        <div class='line'>DTC Team03</div>
                        <div class='line'>Covid 19</div>
                        <div class='line'>Year 2020</div>
                    </div>
                </section>
                <section id="bgImg">
                    <img id="backgroundImg" src={backgroundFrame}/>
                </section>
            </main>
        
    );
}

export default mainBody;
