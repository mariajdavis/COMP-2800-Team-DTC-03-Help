import React, { Component, Fragment } from 'react';
import './logIn.css';

import LogInComponent from './logIn.component';
import Footer from '../Footer/Footer'




function LogInPage(props) {
    return (
        <div id="logInPage">
            <section>Section</section>
            <article>
                <LogInComponent />
            </article>
            <aside>aside</aside>
        </div>
    )
}

export default LogInPage