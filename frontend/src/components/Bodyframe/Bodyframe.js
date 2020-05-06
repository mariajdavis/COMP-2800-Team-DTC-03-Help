import React, { Component, Fragment } from 'react';
import './Bodyframe.css'
import backgroundFrame from "../../img/background_frame.png"

const imgStyle = {

    zIndex: '-1',

}


function mainBody() {
    return (
            <Fragment>
                <div id="bgDiv">
                    <img id="backgroundImg" src={backgroundFrame} style={imgStyle}/>
                </div>
            </Fragment>

    );
}

export default mainBody;
