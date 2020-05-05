import React, { Component, Fragment } from 'react';
import './Bodyframe.css'
import backgroundFrame from "../../img/background_frame.png"

const imgStyle = {
    zIndex: '-1',
    paddingTop: '50px',
    paddingBottom: '50px',
    width: '100%',
    height: 'auto'
}


function mainBody() {
    return (
        <Fragment>
            <img src={backgroundFrame} style={imgStyle}/>
        </Fragment>
    );
}

export default mainBody;
