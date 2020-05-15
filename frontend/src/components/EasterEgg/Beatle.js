import { randomNumBetween } from './helpers';

export default class Beatle {
    constructor(args) {
        this.position = args.position;
        this.radius = 20;
        this.create = args.create;
        this.onDie = args.onDie;
        this.shape = new Image();
        this.shape.src = "./pm.png";
        this.delete=false;
    }
    destroy() {
        this.delete = true;
        this.onDie();
    }
    render(state) {
        if (state.keys.up) {
            this.position.y -= 3;
        }
        if (state.keys.down) {
            this.position.y += 3;
        }
        if (state.keys.left) {
            this.position.x -= 3;
        }
        if (state.keys.right) {
            this.position.x += 3;
        }

        if(this.position.x > state.screen.width) this.position.x = 0;
        else if(this.position.x < 0) this.position.x = state.screen.width;
        if(this.position.y > state.screen.height*0.8) this.position.y = 50;
        else if(this.position.y < 50) this.position.y = state.screen.height*0.8;

        const context = state.context;

        // const image=new Image();
        // image.onload=function(){
        //     context.drawImage(image, this.position.x, this.poxition.y);
        // };
        // //image.onerror=function(){alert("image load failed")};
        // image.src=require("./pm.png");

        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.rotation * Math.PI / 180);
        context.strokeStyle = '#ffffff';
        context.fillStyle = '#000000';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(0, -15);
        context.lineTo(10, 10);
        context.lineTo(5, 7);
        context.lineTo(-5, 7);
        context.lineTo(-10, 10);
        context.closePath();
        context.fill();
        context.stroke();
        context.restore();
    }
}