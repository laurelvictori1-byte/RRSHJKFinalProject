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
       // this.direction = 0;
        //this.size=0;
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

class Object {
    constructor(x_in, y_in, w_in, h_in, img){
        this.x = x_in;
        this.y= y_in;
        this.width = w_in; 
        this.height = h_in;
        this.image = new Image();
        this.image.src = img;
    }
    draw(){
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

const objects = [
  {x: 0,y: 700,height: 65,width: 250,},{x: 450,y: 720,height: 30,width: 140,},
  {x: 650,y: 670,height: 35,width: 60,},{x: 750,y: 630,height: 35,width: 90,},
  {x: 870,y: 715,height: 30,width: 130,},{x: 1180,y: 660,height: 35,width: 100,},
  {x: 1370,y: 600,height: 35,width: 80,},{x: 1418,y: 515,height: 35,width: 45,},
  {x: 1240,y: 440,height: 35,width: 85,},{x: 1085,y: 515,height: 35,width: 45,},
  {x: 880,y: 550,height: 35,width: 100,},{x: 820,y: 440,height: 35,width: 85,},
  {x: 650,y: 455,height: 25,width: 40,},{x: 420,y: 436,height: 35,width: 60,},
  {x: 200,y: 365,height: 30,width: 45,},{x: 340,y: 280,height: 25,width: 40,},
  {x: 180,y: 200,height: 25,width: 45,},{x: 340,y: 165,height: 40,width: 100,},
  {x: 600,y: 270,height: 25,width: 40,},{x: 800,y: 240,height: 25,width: 40,}, 
  {x: 970,y: 290,height: 25,width: 45,},{x: 1130,y: 204,height: 25,width: 35,},
  {x: 1020, y: 125,height: 35,width: 50,},{x: 1190, y: 115,height: 65,width: 300,}
];

const object = [];
objects.forEach((item, _) => {

    // pick proper img
    if (item.width > 250 ){
        img = "images/Pigeon4.png";
    } else if (item.width > 125) {
        img = "images/Pigeon3.png";
    } else if (item.width > 70) {
        img = "images/Pigeon2.png";
    } else {
        img = "images/Pigeon1.png";
    }

    // make temp object
    obj = new Object(item.x, item.y, item.width, item.height, img);

    // add object to list
    object.push(obj);

});

class Obstacles {
    constructor(x_in, y_in, w_in, h_in, img) {
        this.x = x_in;
        this.y= y_in;
        this.width = w_in; 
        this.height = h_in;
        this.image = new Image();
        this.image.src = img;
    }
    draw(){
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

const obstacle = [
    {x: 250, y: 778,height: 2,width: 1600,},
    {x: 870, y: 715,height: 2,width: 40,},
    {x: 880, y: 535,height: 3,width: 100,},
    {x: 340, y: 172,height: 2,width: 35,},
    {x: 1020, y: 110,height: 3,width: 50,}
];

const obstacles = [];
obstacle.forEach((item, _) => {
        img = "images/Acid-Puddle.png";

    obs = new Obstacles(item.x, item.y - 35, item.width, item.height * 20, img);

    obstacles.push(obs);

});