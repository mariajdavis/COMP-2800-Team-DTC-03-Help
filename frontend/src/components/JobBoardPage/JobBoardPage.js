import React, { Component, Fragment } from 'react';
import './jobBoard.css'

import Navbar from '../Navbar/Navbar';
import JobBoardComponent from './jobPosts-list.component';
import Footer from '../Footer/Footer'




function JobBoardPage(props) {
    return (
        <main id="JobBoard">
            <header>
                <Navbar />
            </header>
            <section id='ancement'>
                <p>Announcement</p>
            </section>
            <section id="content">
                <ul id="category">
                    <a id='ex'>
                        <li id="ex">Job Posts</li>
                    </a>
                    <li>Apply</li>
                    <li>More</li>
                </ul>
                <article id='jobboard'>
                    <div id='jobboardImage'>
                        <JobBoardComponent />
                    </div>
                </article>
            </section>
            <section id="bottom">
                Bottom
            </section>
            <footer>
                <Footer />
            </footer> 
        </main>
    )
}

export default JobBoardPage