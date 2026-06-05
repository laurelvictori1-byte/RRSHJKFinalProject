// track if we are pressing our keys
let rightPress = false;
let leftPress = false;
let jumpPress = false;
let shiftPress = false;


let gravity = 0.4; //sets our gravity to bring goober back down


const object = [
  {
  x: 0,
  y: 700,
  height: 300,
  width: 250,
  },
  {
  x: 450,
  y: 720,
  height: 25,
  width: 140,
  },
  {
  x: 650,
  y: 670,
  height: 25,
  width: 60,
  },
  {
  x: 750,
  y: 630,
  height: 25,
  width: 90,
  },
  {
  x: 870,
  y: 715,
  height: 25,
  width: 130,
  },
  {
  x: 1180,
  y: 660,
  height: 25,
  width: 100,
  },
  {
  x: 1370,
  y: 600,
  height: 25,
  width: 80,
  },
  {
  x: 1418,
  y: 515,
  height: 25,
  width: 35,
  },
  {
  x: 1300,
  y: 440,
  height: 120,
  width: 25,
  },
   {
  x: 1240,
  y: 440,
  height: 25,
  width: 85,
  },
  {
  x: 1085,
  y: 515,
  height: 25,
  width: 35,
  },
  // {
  // x: 880,
  // y: 445,
  // height: 140,
  // width: 25,
  // },
  {
  x: 880,
  y: 565,
  height: 25,
  width: 100,
  },
  {
  x: 820,
  y: 440,
  height: 25,
  width: 85,
  },

];

const obstacles = [
  {
    x: 250,
    y: 778,
    height: 2,
    width: 1600,
  },
  {
  x: 870,
  y: 710,
  height: 4,
  width: 40,
  },
   {
  x: 880,
  y: 565,
  height: 4,
  width: 100,
  },

]



const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");




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

function addGoober(){ // green square for now. will replace with actual goober image
    ctx.fillStyle = "green";
    ctx.fillRect(goober.x, goober.y, goober.width, goober.height);
}

let ani;

// when we click option, only menu and back button is present, set box to none
option.addEventListener('click', () =>{
  menu.style.display = "block";
  box.style.display = "none"; //box = main screen box content
  back.style.display = "block";
});

//when we press start, go to gameLoop and backgame button is now present
start.addEventListener('click', () =>{
   startGame.play();
    box.style.display = "none";
    backGame.style.display = "block";
    requestAnimationFrame(gameLoop);
});
// goes back to title screen. BUG: Doesnt reset game only brings you back
backGame.addEventListener('click', () =>{
  backGame.style.display = "none";
  box.style.display = "block";
  cancelAnimationFrame(ani);
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  gameOver();

});

// the back button taking us out of our options menu 
back.addEventListener('click', () =>{
  back.style.display = "none";
  menu.style.display = "none";
  box.style.display = "block";
});

//function addGoober(){ // green square for now. will replace with actual goober image
  //  ctx.fillStyle = "green";
    //ctx.fillRect(goober.x, goober.y, goober.width, goober.height);
//}






// when we press the key, we set our variables to true
document.addEventListener("keydown", (event) => {

  if (event.code === "ArrowRight") {
    rightPress = true;
  }
  if (event.code === "ArrowLeft") {
    leftPress = true;
  }
  if (event.code === "Space") {
    jumpPress = true;
    jumpSound.play();
  }
  if (event.code === "Shift") {
    shiftPress = true;
  }
});

// when we lift up from our key, we set our variables to false
document.addEventListener("keyup", (event) => {
  if (event.code === "ArrowRight") {
    rightPress = false;
  }
  if (event.code === "ArrowLeft") {
    leftPress = false;
  }
  if( event.code === "Space") {
    jumpPress = false;
  }
  if (event.code === "Shift") {
    shiftPress = false;
  }
})

function gameLoop(){
  const backgroundImage = new Image();
  backgroundImage.src = "images/NYC-Background.png"; 
  backgroundImage.onload = function() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  };
   // ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveGoober();
    goober.draw();
    //addGoober();
    addObject();
    addObstacle();
    collision(object);
    collisionObstacle(obstacles)
    ani = requestAnimationFrame(gameLoop);
};


function stopGameLoop() {
  cancelAnimationFrame(ani);
}

//requestAnimationFrame(gameLoop);