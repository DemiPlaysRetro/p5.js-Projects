const WIDTH = 512;
const HEIGHT = 512;

// Square Values
let sx,sy=1;
let w1 = 50;
let h1 = 50;

// Movable Square Values
let sx2,sy2=1;
let w2 = 50;
let h2 = 50;

// Colors
let bgc = 'white';

function AABB(x,y,w,h,squarex,squarey,squarew,squareh) {
  if ((x>=squarex&&x<=squarex+squarew)||(x+w>=squarex&&x+w<=squarex+squarew)) {
    if ((y>=squarey&&y<=squarey+squareh)||(y+h>=squarey&&y+h<=squarey+squareh)) {
      return 1;
    }
  } 
  // If all else fails
  return 0;
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  rectMode(CORNERS);
  noFill();
  sx=1;
  sy=1;
  sx2=1;
  sy2=1;
}

function draw() {
  
  // Keyboard Input
  // Square 1
  if (keyIsDown(65)) { // A
    sx-=1;
  }
  if (keyIsDown(68)) { // D
    sx+=1;
  }
  if (keyIsDown(87)) { // W
    sy-=1;
  }
  if (keyIsDown(83)) { // S
    sy+=1;
  }
  if (keyIsDown(90)) { // Z
    w1-=1;
  }
  if (keyIsDown(88)) { // X
    w1+=1;
  } 
  // Square 2
  if (keyIsDown(74)) { // J
    sx2-=1;
  }
  if (keyIsDown(76)) { // L
    sx2+=1;
  }
  if (keyIsDown(73)) { // I
    sy2-=1;
  }
  if (keyIsDown(75)) { // L
    sy2+=1;
  }
  if (keyIsDown(78)) { // N
    w2-=1;
  }
  if (keyIsDown(77)) { // M
    w2+=1;
  }
  // Clear Screen
  background(bgc);
  
  // Square 1
  stroke("green");
  rect(sx,sy,sx+w1,sy+h1);
  
  // Square 2
  stroke("blue")
  rect(sx2,sy2,sx2+w2,sy2+h2);
  
  // If colliding
  if (AABB(sx,sy,w1,h1,sx2,sy2,w2,h2)) {
    stroke("red");
    text("Collision.",50,460);
  }
  
  // Back to black stroke
  stroke("black");
}
