const goober = {
    x: 0,
    y: 700,
    height: 50,
    width: 50,
    speed: 10,
    // jump here i dont know
    // add name if we want to track
};

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


function addPlayer(){ // green square for now. will replace with actual player image
    ctx.fillStyle = "green";
    ctx.fillRect(goober.x, goober.y, goober.width, goober.height)
}

let rightPress = false;
let leftPress = false;

function movePlayer(){
    if(rightPress && goober.x < canvas.width- goober.width) {
        goober.x += goober.speed;
    }
   if(leftPress && goober.x > 0) {
        goober.x -= goober.speed;
    }
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
});
document.addEventListener("keyup", (event) => {
  if (event.code === "ArrowRight") {
    rightPress = false;
  }
  if (event.code === "ArrowLeft") {
    leftPress = false;
  }
})
requestAnimationFrame(gameLoop);