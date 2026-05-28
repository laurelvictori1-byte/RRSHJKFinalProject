// initializes our main character--goober
const goober = {
    x: 0,
    y: 730,
    height: 50,
    width: 50,
    speed: 10,
    jumping: false,
    yVelocity: 0,
    // jump here i dont know
    // add name if we want to track
};
const object = { //initializes an object for collision-- should rename
  x: 500,
  y: 500,
  height: 500,
  width: 50,
}

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


//sound-- not working 
//const hover = document.getElementById("hover");
//hover.addEventListener("mouseenter", (event) => {
  //  hover.play();
//});

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
  ctx.fillRect(object.x, object.y, object.width, object.height);
}

let rightPress = false;
let leftPress = false;
let jumpPress = false;

//let jumpHeight = 100;
//let jumpTime = 50;
//let gravity = (2*jumpHeight)/jumpTime**2;
//let jumpSpeed = -(sqr(2*jumpHeight*gravity)); 

//function gooberJump(){//doesnt work, just vanishes
   // let gravity = (2*jumpHeight)/pow(jumpTime, 2);
    //let jumpSpeed = -(sqr(2*jumpHeight*gravity));
    
//}
function movePlayer(){
    if(rightPress && goober.x < canvas.width- goober.width) {
        goober.x += goober.speed;
    }
   if(leftPress && goober.x > 0) {
        goober.x -= goober.speed;
    }
    
    //formula for jumping: gravity = (2*max jump height)/jump time^2
    //  jump speed = -(sqr(2*jump height*gravity))
 
}

function gameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    movePlayer();
    addPlayer();
    addObject();
    ani = requestAnimationFrame(gameLoop);
};


function stopGameLoop() {
  cancelAnimationFrame(ani);
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
//requestAnimationFrame(gameLoop);