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
  {x: 820,y: 440,height: 25,width: 85,},{x: 650,y: 455,height: 25,width: 40,},
  {x: 420,y: 436,height: 25,width: 60,},{x: 200,y: 365,height: 25,width: 45,},
  {x: 340,y: 280,height: 25,width: 40,},{x: 180,y: 200,height: 25,width: 45,},
  {x: 350,y: 155,height: 25,width: 100,},{x: 600,y: 270,height: 25,width: 40,},
  {x: 800,y: 240,height: 25,width: 40,}, {x: 970,y: 290,height: 25,width: 25,},
  {x: 1130,y: 204,height: 25,width: 35,},{x: 1020, y: 125,height: 25,width: 50,},
  {x: 1190, y: 115,height: 25,width: 300,}
];

const obstacles = [
  {x: 250, y: 778,height: 2,width: 1600,},
  {x: 870,y: 710,height: 4,width: 40,},
  {x: 880,y: 565,height: 4,width: 100,},
  {x: 350,y: 152,height: 4,width: 35,},
  {x: 1020, y: 125,height: 4,width: 50,}
]

const win =  {x: 1380, y: 65, width: 40, height: 40};


// getting a bunch of stuff from html file
const start = document.getElementById("start");
const option = document.getElementById("option");
const box = document.querySelector(".box");
const menu = document.getElementById("menu");
const exit = document.getElementById("exit");
const back = document.getElementById("back");
const backGame = document.getElementById("backGame");
const victoryScreen = document.getElementById("victoryScreen")

const musicVolumeSlider = document.getElementById("music_slider");
const sfxVolumeSlider = document.getElementById("sfx_slider");

const jumpSound = document.getElementById('jump');
const startGame = document.getElementById('startG');
const end = document.getElementById('finish');


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

function setVolume(sfx, volume) {
  const audioElements = document.querySelectorAll(sfx);
  for (let i = 0; i < audioElements.length; i++) {
    audioElements[i].volume = volume / 100;
  }
}

sfxVolumeSlider.addEventListener('input', function() {
  setVolume(".sfx", this.value);
});

//requestAnimationFrame(gameLoop);