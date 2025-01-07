const WIDTH = 512;
const HEIGHT = 512;
let x,y,step;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  x=WIDTH/2;
  y=HEIGHT/2;
  step=1;
}

function draw() {
  let r = random(0,1);
  
  if (r>=0&&r<0.5) {
    x+=step;
  }
  if (r>=0.5&&r<0.6) {
    x-=step;
  }
  if (r>=0.6&&r<0.8) {
    y+=step;
  }
  if (r>=0.8&&r<=1) {
    y-=step;
  }
  //background('white');
  point (x,y);
}