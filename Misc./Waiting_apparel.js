const WIDTH = 512;
const HEIGHT = 512;
let angle = 0;
let r1=150;
let r2=150;


function setup() {
  createCanvas(WIDTH, HEIGHT);
  angleMode(DEGREES);
}

function draw() {
  if (keyIsDown(65)) {
    angle+=3;
  }
  if (keyIsDown(68)) {
    angle-=3;
  }
  background("white");
  line(WIDTH/2,HEIGHT/2,(WIDTH/2)-r1,HEIGHT/2);
  line((WIDTH/2)-r1,HEIGHT/2,cos(angle)*r2+(WIDTH/2-r1),sin(angle)*r2+(HEIGHT/2));
}