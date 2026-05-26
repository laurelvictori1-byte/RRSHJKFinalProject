const goober = {
    x = 0,
    y = 0,
    height = 50,
    width = 50,
    speed = 10,
    // jump here i dont know
};

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


function addPlayer(){ // green square for now. will replace with actual player image
    ctx.fillStyle = "green";
    ctx.fillRect(addPlayer.x, addPlayer.y, addPlayer.width, addPlayer.height)
}

let rightPress = false;
let leftPress = false;

function movePlayer(){
    if(rightPress && player.x < canvas.width- player.width) {
        player.x += player.speed;
    }
    if(leftPress && player.x > 0) {
        player.x -= player.speed;
    }
}

function gameLoop(){
    movePlayer();
    addPlayer();
    requestAnimationFrame(gameLoop);
}