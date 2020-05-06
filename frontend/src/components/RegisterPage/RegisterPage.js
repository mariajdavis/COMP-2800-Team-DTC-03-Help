import React, { Component, Fragment } from 'react';
import './register.css';

import Register from "./register.component";




function RegisterPage(props) {
    return (
        <div id="registerPage">
            <section id="ancement">
                <p>Announcement</p>
            </section>
            <section id="content">
                <div>
                <article id="registration">
                    <Register />
                </article>
                </div>
            </section>
            <section id="bottom">
                <p>Bottom</p>
            </section>
        </div>
    )
}

export default RegisterPage