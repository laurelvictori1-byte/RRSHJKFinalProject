const goober = {
    x = 0,
    y = 0,
    height = 50,
    width = 50,
    speed = 10,
};

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


function addPlayer(){ // green square for now. will replace with actual player image
    ctx.fillStyle = "green";
    ctx.fillRect(addPlayer.x, addPlayer.y, addPlayer.width, addPlayer.height)
}

let rightPress = false;
let leftPress = false;

