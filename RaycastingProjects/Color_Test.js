let col;
let r = 64;
let g = 222;

function setup() {
  createCanvas(400, 400);
  col = color(r,g,0);
}

function draw() {
  if (keyIsDown(UP_ARROW)) {
    r+=1;
    g+=1;
    col = color(r,g,0);
  }
  if ((keyIsDown(DOWN_ARROW))) {
    r-=1;
    g-=1;
    col = color(r,g,0);
  }
  
  background(col);
}
