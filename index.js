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

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const start = document.getElementById("start")
const option = document.getElementById("option")
const menu = document.getElementById("menu")

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

start.addEventListener('click', () =>{
    start.style.display = "none";
    option.style.display = "none";
    menu.style.display = "none";
    requestAnimationFrame(gameLoop);
});
function addPlayer(){ // green square for now. will replace with actual player image
    ctx.fillStyle = "green";
    ctx.fillRect(goober.x, goober.y, goober.width, goober.height)
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
    requestAnimationFrame(gameLoop);
};
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