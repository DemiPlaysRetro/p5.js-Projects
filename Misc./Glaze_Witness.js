const WIDTH = 512;
const HEIGHT = 512;

function setup() {
  createCanvas(WIDTH, HEIGHT);
}

function draw() {
  background('white');
  
  let dist = sqrt(((mouseX+WIDTH/2)^2)+((mouseY+HEIGHT/2)^2));
  print(dist);
  line(WIDTH/2,HEIGHT/2,mouseX,mouseY);
}