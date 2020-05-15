import React, { Component } from 'react';
import Beatle from './Beatle';
import Virus from './Virus';
import { randomNumBetweenExcluding, randomNumBetween } from './helpers';
import $ from "jquery";
import "./style.css";
import mp3_file from './help.mp3';

const KEY = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    A: 65,
    D: 68,
    W: 87,
    S: 83,

    SPACE: 32
};

export class EasterEgg extends Component {
    constructor() {
        super();
        this.state = {
            screen: {
                width: window.innerWidth,
                height: window.innerHeight,
                ratio: window.devicePixelRatio || 1,
            },
            context: null,
            keys: {
                left: 0,
                right: 0,
                up: 0,
                down: 0,
                space: 0,
            },
            virusCount: 10,
            currentScore: 0,
            topScore: localStorage['topscore'] || 0,
            inGame: false
        }
        this.beatle = [];
        this.virus = [];
    }

    handleResize(value, e) {
        this.setState({
            screen: {
                width: window.innerWidth,
                height: window.innerHeight,
                ratio: window.devicePixelRatio || 1,
            }
        });
    }

    handleKeys(value, e) {
        let keys = this.state.keys;
        if (e.keyCode === KEY.LEFT || e.keyCode === KEY.A) keys.left = value;
        if (e.keyCode === KEY.RIGHT || e.keyCode === KEY.D) keys.right = value;
        if (e.keyCode === KEY.UP || e.keyCode === KEY.W) keys.up = value;
        if (e.keyCode === KEY.DOWN || e.keyCode === KEY.S) keys.down = value;
        if (e.keyCode === KEY.SPACE) keys.space = value;
        this.setState({
            keys: keys
        });
    }

    componentDidMount() {
        //$('.animated-text').hide();
        //$('#startBtn').html='Start?'
        window.addEventListener('keyup', this.handleKeys.bind(this, false));
        window.addEventListener('keydown', this.handleKeys.bind(this, true));
        window.addEventListener('resize', this.handleResize.bind(this, false));
        this.audio = new Audio(`./help.mp3`);
        this.audio.load();
        this.playAudio();
        const context = this.refs.canvas.getContext('2d');
        this.setState({ context: context });
        requestAnimationFrame(() => { this.update() });
    }
    playAudio() {
        const audioPromise = this.audio.play()
        if (audioPromise !== undefined) {
            audioPromise
                .then(_ => {
                    // autoplay started
                })
                .catch(err => {
                    // catch dom exception
                    console.info(err)
                })
        }
    }
    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleKeys);
        window.removeEventListener('keydown', this.handleKeys);
        window.removeEventListener('resize', this.handleResize);
    }

    update() {
        const context = this.state.context;
        context.clearRect(0, 0, this.state.screen.width, this.state.screen.height * 0.8);
        const keys = this.state.keys;
        const beatle = this.beatle[0];

        context.save();
        context.scale(this.state.screen.ratio, this.state.screen.ratio);

        if (this.virus.length < randomNumBetween(5, 10) && this.virus.length < 25) {
            let count = randomNumBetween(5, 10);
            this.setState({ virusCount: count });
            this.generateVirus(count);
        }

        this.checkCollisionsWith(this.beatle, this.virus);

        this.updateObjects(this.beatle, 'beatle');
        this.updateObjects(this.virus, 'virus');

        context.restore();

        requestAnimationFrame(() => { this.update() });
    }

    addScore(points) {
        if (this.state.inGame) {
            this.setState({
                currentScore: Math.round(this.state.currentScore + points),
            });
        }
    }

    startGame() {
        this.setState({
            inGame: true,
            currentScore: 0,
        });

        let beatle = new Beatle({
            position: {
                x: this.state.screen.width / 2,
                y: this.state.screen.height / 2
            },
            create: this.createObject.bind(this),
            onDie: this.gameOver.bind(this)
        });
        this.createObject(beatle, 'beatle');

        this.virus = [];
        this.generateVirus(this.state.virusCount);
    }

    gameOver() {
        this.setState({
            inGame: false,
        });

        // Replace top score
        if (this.state.currentScore > this.state.topScore) {
            this.setState({
                topScore: Math.round(this.state.currentScore),
            });
            localStorage['topscore'] = this.state.currentScore;
        }
    }

    generateVirus(count) {
        let virus = [];
        let beatle = this.beatle[0];
        for (let i = 0; i < count; i++) {
            let newX;
            let newY;
            if (this.inGame) {
                newX = randomNumBetweenExcluding(0, this.state.screen.width, beatle.position.x - 100, beatle.position.x + 100);
                newY = randomNumBetweenExcluding(50, this.state.screen.height * 0.8, beatle.position.y - 60, beatle.position.y + 60);
            }
            else {
                newX = randomNumBetween(0, this.state.screen.width);
                newY = randomNumBetween(50, this.state.screen.height * 0.8);
            }
            // newX=this.inGame?randomNumBetweenExcluding(0,this.state.screen.width,beatle.position.x-60,beatle.position.x+60):randomNumBetween(0,this.state.screen.width);
            // newY=this.ingame?randomNumBetweenExcluding(50, this.state.screen.height*0.8, beatle.position.y-60, beatle.position.y+60):randomNumBetween(50, this.state.screen.height*0.8)
            let virus = new Virus({
                position: {
                    x: newX,
                    y: newY
                },
                create: this.createObject.bind(this),
                addScore: this.addScore.bind(this)
            });
            this.createObject(virus, 'virus');
        }
    }
    createObject(item, group) {
        this[group].push(item);
    }

    updateObjects(items, group) {
        let index = 0;
        for (let item of items) {
            if (item.delete) {
                this[group].splice(index, 1);
            } else {
                items[index].render(this.state);
            }
            index++;
        }
    }

    checkCollisionsWith(items1, items2) {
        var a = items1.length - 1;
        var b;
        for (a; a > -1; --a) {
            b = items2.length - 1;
            for (b; b > -1; --b) {
                var item1 = items1[a];
                var item2 = items2[b];
                if (this.checkCollision(item1, item2)) {
                    item1.destroy();
                    item2.destroy();
                }
            }
        }
    }

    checkCollision(obj1, obj2) {
        var vx = obj1.position.x - obj2.position.x;
        var vy = obj1.position.y - obj2.position.y;
        var length = Math.sqrt(vx * vx + vy * vy);
        if (length < obj1.radius + obj2.radius && !obj1.delete && !obj2.delete) {
            return true;
        }
        return false;
    }

    render() {
        let endgame;
        let message;
        if (this.state.currentScore >= this.state.topScore) {
            message = this.state.currentScore + ' Points. New top score!';
        } else {
            message = this.state.currentScore + ' Points!'
        }

        if (!this.state.inGame) {
            endgame = (
                <div class="endgame">
                    <div><h2>{message}</h2></div>
                    <div><button id="startBtn" 
                        onClick={this.startGame.bind(this)}>
                        Start again?
              </button></div>
                </div>
            )
        }
        return (
            <div>
                <audio autoPlay loop>
                    <source src="./help.mp3"></source>
                </audio>
                <div id="ee">
                    <div id="msg">
                        <div id="endgame">
                            {endgame}
                        </div>
                        <div id="scores">
                            <span className="score current-score" >Score: {this.state.currentScore}</span>
                            <span className="score top-score" >Top Score: {this.state.topScore}</span>
                        </div>
                        <div>
                            <span className="controls" >
                                Use [A][S][W][D] or [←][↑][↓][→] to MOVE<br />
                            </span>
                        </div>
                    </div>
                    <canvas ref="canvas"
                        width={this.state.screen.width * this.state.screen.ratio}
                        height={this.state.screen.height * 0.8 * this.state.screen.ratio}
                    />
                </div>
            </div>
        );
    }
}