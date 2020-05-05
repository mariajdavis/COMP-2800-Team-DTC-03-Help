import React, { Component, Fragment } from 'react';
import './register.css';

import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer'
import Register from "./register.component";




function RegisterPage(props) {
    return (
        <div id="main">
            <header>
                <Navbar />
            </header>
            <nav>Nav</nav>
            <section>Section</section>
            <article>
                <Register />
            </article>
            <aside>aside</aside>
            <footer>
                <Footer />
            </footer> 
        </div>
    )
}

export default RegisterPage