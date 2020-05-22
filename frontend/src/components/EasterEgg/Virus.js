/**
 * A watered down version of the classic Asteroid game. Used https://github.com/chriz001/Reacteroids as a tutorial for using context and also for its random number generator functions and collision function. Remade game logic and virus(asteroid) logic. 
 *  
 * This Class generates a Virus object that's a circular shape with randomized velocity, randomized and decreasing radius, life span and a score based on its initial radius and velocity.
 */

import {randomNumBetween} from './helpers';

export default class Virus {
    constructor(args) {
        this.position = args.position;
        this.velocity = {
            x:randomNumBetween(-0.5, 0.5),
            y: randomNumBetween(-0.5, 0.5)
        }
        this.radius=randomNumBetween(15,50);
        this.deathRadius=10;
        this.lifeSpan=randomNumBetween(200,4000);
        this.score=this.radius+this.lifeSpan/10;
        this.create=args.create;
        this.addScore=args.addScore;
        this.delete=false;
    }

    destroy(){
        this.delete=true;
        this.addScore(this.score);
    }

    render(state) {
        this.position.x+=this.velocity.x;
        this.position.y+=this.velocity.y;

        this.radius -= 0.1;
        this.lifeSpan-=0.5;
        if (this.radius<this.deathRadius || this.lifeSpan--<0){
            this.destroy();
        }

        if(this.position.x > state.screen.width + this.radius) this.position.x = -this.radius;
        else if(this.position.x < -this.radius) this.position.x = state.screen.width + this.radius;
        if(this.position.y > state.screen.height*0.8 - this.radius) this.position.y = 50-this.radius;
        else if(this.position.y < 50-this.radius) this.position.y = state.screen.height*0.8 + this.radius;

        const context=state.context;
        context.save();
        //context.translate(this.position.x, this.position.y);
        //context.rotate(this.rotation * Math.PI / 180);
        context.beginPath();
        context.arc(this.position.x,this.position.y,this.radius,0,2*Math.PI);
        context.stroke();
        context.restore();
    }
}