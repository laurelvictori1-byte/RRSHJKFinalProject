
// initializes our main character--goober
const goober = {
    x: 0,
    y: 730,
    height: 50,
    width: 50,
    speed: 10,
    jumping: false,
    yVelocity: 0, //goober jump speed
    jHeight: 100,
    // jump here i dont know
    // add name if we want to track
};

const object = [
  { //initializes an object for collision-- should rename
  x: 700,
  y: 0,
  height: 500,
  width: 50,
  },
  {
    x: 500,
    y: 500,
    height: 500,
    width: 50,
  }
  
];

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

//draws our background image onto our canvas
const backgroundImage = new Image();
backgroundImage.src = "images/NYC-Menu-Background-Resized.png"; 
backgroundImage.onload = function() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};

let ani;
// when we clock option, only menu and back button is present, set box to none
option.addEventListener('click', () =>{
  menu.style.display = "block";
  box.style.display = "none"; //box = main screen box content
  back.style.display = "block";
});

//when we press start, go to gameLoop and backgame button is now present
start.addEventListener('click', () =>{
    box.style.display = "none";
    backGame.style.display = "block";
    requestAnimationFrame(gameLoop);
});

backGame.addEventListener('click', () =>{
  backGame.style.display = "none";
  box.style.display = "block";
  cancelAnimationFrame(ani);
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

});

back.addEventListener('click', () =>{
  back.style.display = "none";
  menu.style.display = "none";
  box.style.display = "block";
});
function addPlayer(){ // green square for now. will replace with actual player image
    ctx.fillStyle = "green";
    ctx.fillRect(goober.x, goober.y, goober.width, goober.height);
}

function addObject(){
  ctx.fillStyle = "black";
  object.forEach((object) => {
    ctx.fillRect(object.x, object.y, object.width, object.height);
  });
}




let rightPress = false;
let leftPress = false;
let jumpPress = false;

let initialVelocity = -8;
goober.y == initialVelocity;
let gravity = 0.4;


function movePlayer(){ // have movement using up and down for now until jump mechanic is figured out
    if(rightPress && goober.x < canvas.width- goober.width) {
        goober.x += goober.speed;
    }
   if(leftPress && goober.x > 0) {
        goober.x -= goober.speed;
    }
 if(jumpPress && !goober.jumping){ // if goober is not jumping and we are pressing space then
   goober.yVelocity = -Math.sqrt(2* goober.jHeight *gravity); // we calculate jumpspeed or like the velocity of y
    goober.jumping = true; // and then set jumping to true

 }
   // add gravity to move down
  goober.yVelocity += gravity;
  goober.y += goober.yVelocity;
 if(goober.y > canvas.height - goober.height){ // check for bottom bound. if y goes past this point
  goober.y = canvas.height - goober.height; // then we set the y position to that
  goober.jumping = false; // jumping bCK TO false
  goober.yVelocity = 0; // and recent the velocity 
 }

}
document.addEventListener("keydown", (event) => {

  if (event.code === "ArrowRight") {
    rightPress = true;
  }
  if (event.code === "ArrowLeft") {
    leftPress = true;
  }
  if (event.code === "Space") {
    jumpPress = true;
  }
});


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
})

/*
Understanding collision for x axis:
if a is greater than position b-- .x and .width position then overlap-- collision is detected
if a is less than position b(b.x +b.width) then overlap 
*/

function collision(goober, object){
  object.forEach((object) => {
  if(goober.x + goober.width >= object.x && goober.x <= object.width + object.x){
    console.log('colliding');
 document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
     rightPress = false;
    }
  });
  } else{
    document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
     rightPress = true;
    }
  });
  }
});

}
function gameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    movePlayer();
    addPlayer();
    addObject();
    collision(goober, object)
    ani = requestAnimationFrame(gameLoop);
};


function stopGameLoop() {
  cancelAnimationFrame(ani);
}

//requestAnimationFrame(gameLoop);