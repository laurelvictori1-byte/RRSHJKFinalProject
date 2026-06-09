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
  victoryScreen.style.display = "none";
  canvas.style.display = "block";
  box.style.display = "block";
  cancelAnimationFrame(ani);
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  //gameOver();

});

// the back button taking us out of our options menu 
back.addEventListener('click', () =>{
  back.style.display = "none";
  menu.style.display = "none";
  box.style.display = "block";
});

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