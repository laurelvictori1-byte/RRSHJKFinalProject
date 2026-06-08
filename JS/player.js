/*const goober = {
    x: 0, // x and y starting position on canvas
    y: 680,
    height: 40,
    width: 30,
    speed: 5,
    jumping: false,
    yVelocity: 0, //goober jump speed
    jHeight: 90, // jump height
    // add name if we want to track for a storyline maybe
};
*/
class Goober {
    constructor(){
        this.x = 0;
        this.y = 680;
        this.height = 40;
        this.width = 50;
        this.speed = 5;
        this.jumping = false;
        this.yVelocity = 0;
        this.jHeight = 90;
        this.direction = 0;
        this.size=0;
        this.goob = new Image();
        this.goob.src = 'images/Goober-Run2.png';
        this.goob2 = new Image();
        this.goob2.src = 'images/Goob-Sprite.png';
    }
   
    draw(){
        if(flip){
        
            ctx.drawImage(
                this.goob2,
                this.x,
                this.y,
                this.width,
                this.height
            );
            flip = false;
        }
        else if(!flip){
        ctx.drawImage(
            
            this.goob,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
    }
}
const goober = new Goober();

class Win {
    constructor(){
        this.x = 1330;
        this.y = 40; 
        this.width = 100; 
        this.height = 100;
        this.bubblePipe = new Image();
        this.bubblePipe.src = 'images/Bubble-Pipe.png';
    }
    draw(){
        ctx.drawImage(
            this.bubblePipe,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
const win = new Win();
