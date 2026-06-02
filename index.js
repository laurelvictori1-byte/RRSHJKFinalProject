
// initializes our main character--goober
const goober = {
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

const object = [
  { //initializes our platforms-- maybe rename
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


  
  
];

const obstacles = [
  {
    x: 600,
    y: 0,
    height: 500,
    width: 50,
  }
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

//draws our background image onto our canvas
const backgroundImage = new Image();
backgroundImage.src = "images/NYC-Menu-Background-Resized.png"; 
backgroundImage.onload = function() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};


let ani;

// when we click option, only menu and back button is present, set box to none
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
// goes back to title screen. BUG: Doesnt reset game only brings you back
backGame.addEventListener('click', () =>{
  backGame.style.display = "none";
  box.style.display = "block";
  cancelAnimationFrame(ani);
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

});

// the back button taking us out of our options menu 
back.addEventListener('click', () =>{
  back.style.display = "none";
  menu.style.display = "none";
  box.style.display = "block";
});

function addGoober(){ // green square for now. will replace with actual goober image
    ctx.fillStyle = "green";
    ctx.fillRect(goober.x, goober.y, goober.width, goober.height);
}
function addObject(){
  ctx.fillStyle = "black";
  object.forEach((object) => {
    ctx.fillRect(object.x, object.y, object.width, object.height);
  });
}

function addObstacle(){
  ctx.fillStyle = "red";
  obstacles.forEach((obstacles) => {
    ctx.fillRect(obstacles.x, obstacles.y, obstacles.width, obstacles.height);
  });
}

// track if we are pressing our keys
let rightPress = false;
let leftPress = false;
let jumpPress = false;


let gravity = 0.4; //sets our gravity to bring goober back down


function moveGoober(){ // have movement using up and down for now until jump mechanic is figured out
  
    if(rightPress && goober.x < canvas.width- goober.width ) {
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
  goober.yVelocity += gravity; // add gravity to yVelocity
  goober.y += goober.yVelocity; // then add new velocity to y position bringing goober down

 if(goober.y > canvas.height - goober.height){ // check for bottom bound. if y goes past this point
  goober.y = canvas.height - goober.height; // then we set the y position to that
  goober.jumping = false; // jumping bCK TO false
  goober.yVelocity = 0; // and recent the velocity 
 }

}
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
})

/*
Understanding collision for x axis:
if a is greater than position b-- .x and .width position then overlap-- collision is detected
if a is less than position b(b.x +b.width) then overlap 

Understanding collision for y axis
if a + height is greater than b.y and 
if a.y is less than b.y + b.height
*/

function collision(object){ 
  let colliding = false;
  object.forEach((object) => {
  if(goober.x + goober.width >= object.x && goober.x <= object.width + object.x&&goober.y + goober.height >= object.y && goober.y <= object.y + object.height){
    console.log('colliding'); // shows us that its colliding in our console
    colliding = true;
     detection(object); // call the collision detection 
  
  } 
 });

 return colliding;
}
// detect overlap then push goober out 
function detection(object){
  //checks for overlap
  let top = Math.abs(goober.y - (object.y + object.height)); // player top obj bottom
  let right = Math.abs((goober.x + goober.width) - object.x); // player right obj left
  let left = Math.abs((goober.x-(object.x+object.width)));//etc
  let bottom = Math.abs((goober.y + goober.height) - object.y); //etc
  
  if ((goober.y <= object.y + object.height && goober.y + goober.height > object.y + object.height) && (top < right&& top < left)){
       goober.y = object.y + object.height;
      goober.yVelocity = 0;
  }
  if((goober.y + goober.height >= object.y && goober.y < object.y) && (bottom < right && bottom < left)){
      goober.y = object.y - goober.height; 
      goober.jumping = false;
      goober.yVelocity = 0;
  }
  if((goober.x + goober.width >= object.x && goober.x < object.x) && (right < top && right < bottom)){
      goober.x = object.x - goober.width;
  }
  if((goober.x <= object.x + object.width && goober.x + goober.width > object.x + object.width) && (left < top && left < bottom)){
      goober.x = object.x + object.width;
  }
}

function collisionObstacle(object){ 
  let colliding = false;
  obstacles.forEach((obstacles) => {
  if(goober.x + goober.width >= obstacles.x && goober.x <= obstacles.width + obstacles.x && goober.y + goober.height >= obstacles.y && goober.y <= obstacles.y + obstacles.height){
    console.log('colliding'); // shows us that its colliding in our console
    colliding = true;
    detectObstacle(object); // call the collision detection 
  
  } 
 });
  return colliding;
}


function detectObstacle(object){
  console.log('game over');
  gameOver();
}

function gameOver(){
  cancelAnimationFrame(ani);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "50px Arial";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
}

function gameLoop(){
  const backgroundImage = new Image();
  backgroundImage.src = "images/NYC-Background.png"; 
  backgroundImage.onload = function() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  };
   // ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveGoober();
    addGoober();
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