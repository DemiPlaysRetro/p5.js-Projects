const WIDTH = 512;
const HEIGHT = 512;

ox = WIDTH/2;
oy = HEIGHT/2;
w = 100;
h = 100;
a = 0;


function rotAboutPoint(x,y,a,ox = 0,oy = 0) {
  return [(x*cos(a)-y*sin(a))+ox,(x*sin(a)+y*cos(a))+oy];
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  angleMode(DEGREES)
}

function draw() {
  a+=1
  
  // Clear the screen
  background('white');
  
  // Draw square
  let v1=[ox-w/2,oy-h/2];
  let v2=[ox+w/2,oy-h/2];
  let v3=[ox-w/2,oy+h/2];
  let v4=[ox+w/2,oy+h/2];
  
  v1 = rotAboutPoint(v1[0],v1[1],a);
  v2 = rotAboutPoint(v2[0],v2[1],a);
  v3 = rotAboutPoint(v3[0],v3[1],a);
  v4 = rotAboutPoint(v4[0],v4[1],a);
  
  line(v1[0],v1[1],v2[0],v2[1]);
  line(v2[0],v2[1],v4[0],v4[1]);
  line(v4[0],v4[1],v3[0],v3[1]);
  line(v3[0],v3[1],v1[0],v1[1]);
}