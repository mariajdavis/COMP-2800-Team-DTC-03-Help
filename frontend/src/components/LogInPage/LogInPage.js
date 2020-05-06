import React, { Component, Fragment } from 'react';
import './logIn.css';

import LogInComponent from './logIn.component';
import Footer from '../Footer/Footer'




function LogInPage(props) {
    return (
        <div id="logInPage">
            <section id="ancementLoginPage">
                <p>Announcement</p>
            </section>
            <section id='contentLoginPage'>
                <article id='introduction'>
                    <p>Some introductions...</p>
                </article>
                <article id="loginContainer">
                    <LogInComponent />
                </article>
            </section>
            <section id="bottomLoginPage">
                <p>bottom</p>
            </section>
        </div>
    )
}

export default LogInPage