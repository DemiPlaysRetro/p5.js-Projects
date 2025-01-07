let angle;
let distX;
let distY;
let distXY;
let mx,my

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  angle = 359;
}

function draw() {
  mx=mouseX;
  my=mouseY;
  distX=200-mx; // Negative = Right, Positive = left
  distY=200-my; // Negative = Below, Positive = Above
  distXY=sqrt(distX*distX+distY*distY);
  angle=atan(distY/distX)
  if (distX>0) {
    angle+=180;
  }
  if (distX==0) {
    angle = 90;
  }
  
  background(220);
  ellipse(200,200,200,200);
  stroke("green");
  line(200,200,200+cos(0)*100,200+sin(0)*100)
  stroke("black");
  line(200,200,200+cos(angle)*100,200+sin(angle)*100)
}