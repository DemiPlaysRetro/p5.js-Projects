const WIDTH = 512;
const HEIGHT = 512;
// Arm 1
// Upp
let px,py,pa,astep,rad;
// For
let fx,fy;
// Arm 2
// Upp
let pa2,astep2,rad2;
// For
let fx2,fy2;
// Hand
let wi,hi,hx;

function D2R(degrees) {
  return degrees*(PI/180);
}

function R2D(radians) {
  return radians*(180/PI);
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  stroke("black");
  pa=0;
  pa2=0;
  astep=5;
  astep2=astep;
  rad=100;
  rad2=85;
  wi=50;
  hi=50;
}

function draw() {
  // Input
  if (keyIsDown(81)) { // Q
    pa-=D2R(astep);
  }
  if (keyIsDown(69)) { // E
    pa+=D2R(astep);
  }
  if (keyIsDown(65)) { // A
    pa2-=D2R(astep2);
  }
  if (keyIsDown(68)) { // D
    pa2+=D2R(astep2);
  }
  // Clear Screen
  background("white");
  
  // Draw
  px=WIDTH/2;
  py=HEIGHT/2;
  fx=(sin(pa)*rad)+px;
  fy=(cos(pa)*rad)+py;
  fx2=(sin(pa2)*rad2)+fx;
  fy2=(cos(pa2)*rad2)+fy;
  // Upper Arm
  line(px,py,fx,fy);
  // Fore Arm
  line(fx,fy,fx2,fy2);
  // Hand
  line(fx2-(wi/2),fy2,fx2+(wi/2),fy2);
  line(fx2-(wi/2),fy2,fx2-(wi/2),fy2+(hi/2));
  line(fx2+(wi/2),fy2,fx2+(wi/2),fy2+(hi/2));
  
}
