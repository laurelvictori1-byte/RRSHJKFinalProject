const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// track if we are pressing our keys
let rightPress = false;
let leftPress = false;
let jumpPress = false;
let shiftPress = false;
let gravity = 0.4; //sets our gravity to bring goober back down
let ani;

const object = [
  {x: 0,y: 700,height: 300,width: 250,},{x: 450,y: 720,height: 25,width: 140,},
  {x: 650,y: 670,height: 25,width: 60,},{x: 750,y: 630,height: 25,width: 90,},
  {x: 870,y: 715,height: 25,width: 130,},{x: 1180,y: 660,height: 25,width: 100,},
  {x: 1370,y: 600,height: 25,width: 80,},{x: 1418,y: 515,height: 25,width: 35,},
  {x: 1300,y: 440,height: 120,width: 25,},{x: 1240,y: 440,height: 25,width: 85,},
  {x: 1085,y: 515,height: 25,width: 35,},{x: 880,y: 565,height: 25,width: 100,},
  {x: 820,y: 440,height: 25,width: 85,},
];

const obstacles = [
  {x: 250, y: 778,height: 2,width: 1600,},
  {x: 870,y: 710,height: 4,width: 40,},
  {x: 880,y: 565,height: 4,width: 100,},
]

const win =  {x: 700, y: 400, width: 40, height: 40};


// getting a bunch of stuff from html file
const start = document.getElementById("start");
const option = document.getElementById("option");
const box = document.querySelector(".box");
const menu = document.getElementById("menu");
const exit = document.getElementById("exit");
const back = document.getElementById("back");
const backGame = document.getElementById("backGame");

const jumpSound = new Audio('audio/jumpsfx.mp3');
const startGame = new Audio('audio/startGame.mp3');


//draws our background image onto our canvas
const backgroundImage = new Image();
backgroundImage.src = "images/NYC-Menu-Background-Resized.png"; 
backgroundImage.onload = function() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};


function gameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveGoober();
    goober.draw();
    //addGoober();
    addObject();
    addObstacle();
    collision(object);
    collisionObstacles(obstacles)
   // collisionObstacle(obstacles)
    addWin();
     
    ani = requestAnimationFrame(gameLoop);
    collisionWin(win)
   
};


function stopGameLoop() {
  cancelAnimationFrame(ani);
}

//requestAnimationFrame(gameLoop);