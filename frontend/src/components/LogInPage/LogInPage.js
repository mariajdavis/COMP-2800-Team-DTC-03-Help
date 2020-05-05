import React, { Component, Fragment } from 'react';
import './logIn.css';

import LogInComponent from './logIn.component';
import Footer from '../Footer/Footer'




function LogInPage(props) {
    return (
        <div id="main">
            <nav>Nav</nav>
            <section>Section</section>
            <article>
                <LogInComponent />
            </article>
            <aside>aside</aside>
            <footer>
                <Footer />
            </footer> 
        </div>
    )
}

export default LogInPage