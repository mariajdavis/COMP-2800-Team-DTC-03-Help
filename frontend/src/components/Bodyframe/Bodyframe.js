import React, { Component } from 'react';
import './Bodyframe.css'
import backgroundFrame from "../../img/bg.png"
import JobPostDataService from "../../services/jobPost.service";

const imgStyle = {
    zIndex: '-1',
    paddingTop: '50px',
    paddingBottom: '50px',
    width: '100%',
    height: 'auto',
}

class mainBody extends Component {
    constructor() {
        super()
        this.retrieveJobPosts = this.retrieveJobPosts.bind(this);

        this.state = {
            jobPosts: [],
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.retrieveJobPosts();
    }

    retrieveJobPosts() {
        JobPostDataService.getAll()
            .then(response => {
                this.setState({
                    jobPosts: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { jobPosts, currentIndex } = this.state;

        return (
            <main id="contentArea">
                <section id='ancement'>
                    <div class='animated-text'>
                        <div class='line'>Help your community in a paid or volunteer position</div>
                        <div class='line'>VGH looking to fill dozens of temporary positions</div>
                        <div class='line'>Drivers needed for community grocery delivery services</div>
                        <div class='line'>BC currently has 2,446 confirmed COVID-19 cases</div>
                        <div class='line'>Museums, retail, salons, and other services reopen</div>
                        <div class='line'>Local businesses adjusting to Phase 2 opening restrictions</div>
                    </div>
                </section>
                <section id="bgImg">
                    <img id="backgroundImg" src={backgroundFrame} />
                </section>
                <section id="bottomtext">
                    <div>
                        <ul id="bottom-display">
                            {jobPosts &&
                                jobPosts.map((jobPost, index) => (
                                    <li
                                        id={jobPost.id}
                                        key={index}
                                        style={{ color: 'black' }}
                                    >
                                        {jobPost.title}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </section>
            </main>

        )
    }
}

export default mainBody;
