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

function moveGoober(){ // have movement using up and down for now until jump mechanic is figured out
   if(shiftPress){
    goober.speed = 10;
  }
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
  goober.yVelocity = 0; // and reset the velocity 
 }
}

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
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
    goober.x = 0; // x and y starting position on canvas
    goober.y = 680;
    goober.jumping = false;
    goober.yVelocity = 0; //goober jump speed
}