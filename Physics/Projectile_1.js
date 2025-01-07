const WIDTH = 512;
const HEIGHT = 512;
let time = 0;
let grav = 9.8
let launAngle = 45;
let togtime = 0;
let ix = WIDTH * (1/3);
let iy = HEIGHT * (1/3);
let x=ix;
let y=iy;
let vel=100; // Something
let resettime = 0;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  angleMode(DEGREES);
  strokeWeight(10);
}

function draw() {
  if (togtime == 1) {
    time = ((frameCount-resettime) * (1000 / frameRate())) / 1000 // Frame count to seconds
  } else {
    if (keyIsDown(32)) { // Space - Step time
      time++;
    }
  }
  if (keyIsDown(69)) { // E - Toggle auto-time
    if (togtime == 1) {
      togtime = 0
    } else {
      togtime = 1;
    }
  }
  if (keyIsDown(82)) { // R - Reset
    time = 0;
    resettime = frameCount;
  }
  
  // Clear screen
  background('white');
  
  x = ((vel*cos(launAngle))*time)+(WIDTH*(1/3));
  y = (-((vel*sin(launAngle))*time - (grav*(time*time))/2))+HEIGHT/2;
  
  point (x,y);
}