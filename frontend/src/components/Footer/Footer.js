import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const footerStyle = {
    backgroundColor: '#2743A5',
    position: 'absolute',
    width: '100%',
    bottom: '0px',
    height: '50px',
    zIndex: '2',
    marginBottom:'0px',
}

const fontStyle = {
    position: 'absolute',
    color: 'white',
    paddingBottom:'0px',
    verticalAlign:'center',
    bottom:'12.5px'
}

/** Footer page component */
function Footer () {
    return (
        <Fragment>
            <footer style={footerStyle} class="page-footer font-small blue">
                <span style={fontStyle} class="footer-copyright text-left">
                    © 2020 Copyright: Help!
                </span>
            </footer>
        </Fragment>
    );
}

export default Footer;