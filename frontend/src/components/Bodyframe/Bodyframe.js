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
                            <div class='line'>Announcement</div>
                            <div class='line'>Section</div>
                            <div class='line'>help! App</div>
                            <div class='line'>DTC Team 3</div>
                            <div class='line'>Covid 19</div>
                            <div class='line'>Year 2020</div>
                        </div>
                    </section>
                    <section id="bgImg">
                        <img id="backgroundImg" src={backgroundFrame}/>
                    </section>
                    <section id="bottomtext">
                        <div>
                            <ul id="bottom-display">
                                {jobPosts &&
                                jobPosts.map((jobPost, index) => (
                                <li
                                id={jobPost.title + jobPost.id}
                                key={index}
                                style={{color: 'black'}}
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
