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
        this.width = 30;
        this.speed = 5;
        this.jumping = false;
        this.yVelocity = 0;
        this.jHeight = 90;
        this.goob = new Image();
        this.goob.src = 'images/Goob-Sprite.png';
    }
    draw(){
        ctx.drawImage(
            this.goob,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
const goober = new Goober();