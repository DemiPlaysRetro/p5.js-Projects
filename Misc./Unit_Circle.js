const WIDTH = 512;
const HEIGHT = 512;

// Radius
let circlepad = 30;
let cr;
let cx = WIDTH/2;
let cy = WIDTH/2;

// Line values
let ta = 0; // Triangle Angle
let distx,disty;
let tx,ty;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  // Make circle radius
  cr = (WIDTH-(circlepad*2))/2;
  noFill();
  ellipseMode(RADIUS);
}

function draw() {
  // Computate Values
  distx = mouseX-cx;
  disty = mouseY-cy;
  ta = atan(disty/distx);
  tx=cos(ta)*-cr;
  ty=sin(ta)*-cr;
  // Clear Screen
  background("white");
  // Draw Lines
  if (mouseX >= cx) {
    line(cx,cy,cx,cy-ty);
    line(cx,cy-ty,cx-tx,cy-ty);
    line(cx,cy,cx-tx,cy-ty);
  } else if (mouseX < cx) {
    line(cx,cy,cx,cy+ty);
    line(cx,cy+ty,cx+tx,cy+ty);
    line(cx,cy,cx+tx,cy+ty);
  }
  // Draw Circle
  ellipse(cx,cy,-cr);
}