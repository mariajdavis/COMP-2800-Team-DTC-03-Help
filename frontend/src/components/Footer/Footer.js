import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const footerStyle = {
    position: 'absolute',
    backgroundColor: '#2743A5',
    width: '100%'
}

const fontStyle = {
    color: 'white'
}


function Footer () {
    return (
        <Fragment>
            <footer style={footerStyle} class="page-footer font-small blue">
                <div style={fontStyle} class="footer-copyright text-left py-3">
                    © 2020 Copyright: Help!
                </div>
            </footer>
        </Fragment>
    );
}

export default Footer;