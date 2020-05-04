import React, { Component, Fragment } from 'react';
import './Bodyframe.css'
import backgroundFrame from "../../img/background_frame.png"

const imgStyle = {
    paddingTop: '50px',
    paddingBottom: '50px',
    width: '100%',
    maxHeight: '1100px',
    objectFit: 'cover'
}


function mainBody() {
    return (
        <Fragment>
            <img id="backgroundImage" src={backgroundFrame} style={imgStyle}/>
        </Fragment>
    );
}

export default mainBody;
