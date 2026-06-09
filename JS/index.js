const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// track if we are pressing our keys
let rightPress = false;
let leftPress = false;
let jumpPress = false;
let shiftPress = false;
let gravity = 0.4; //sets our gravity to bring goober back down
let ani;

// const win =  {x: 1380, y: 65, width: 40, height: 40};


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
const hurtSound = document.getElementById('hurt');
const musicbgm = document.getElementById('musicbgm');


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
    collision(object)
    collisionObstacles(obstacles)
   // collisionObstacle(obstacles)
    addWin();
     
    ani = requestAnimationFrame(gameLoop);
    collisionWin(win)
   
};


function stopGameLoop() {
  cancelAnimationFrame(ani);
}

function audioPlay() {
  var audio = document.getElementById("musicbgm");
  audio.play();
  audio.loop = true;
}

function setVolume(sfx, volume) {
  const audioElements = document.querySelectorAll(sfx);
  for (let i = 0; i < audioElements.length; i++) {
    audioElements[i].volume = volume / 100;
  }
}

function setOtherVolume(music, volume) {
  const audioElements = document.querySelectorAll(music);
  for (let i = 0; i < audioElements.length; i++) {
    audioElements[i].volume = volume / 100;
  }
}

sfxVolumeSlider.addEventListener('input', function() {
  setVolume(".sfx", this.value);
});

musicVolumeSlider.addEventListener('input', function() {
  setOtherVolume(".music", this.value);
});

//requestAnimationFrame(gameLoop);