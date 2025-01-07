const WIDTH = 512;
const HEIGHT = 512;
let ox = WIDTH/2;
let oy = HEIGHT/2;
let w = 50;
let h = 100;
let a = 0; // ANgle

function rotSquare(mx,my,a,w,h) {
  if (w>0 && h>0) {
    let v1 = [0-w/2,0-h/2]; // TL
    let v2 = [0+w/2,0-h/2]; // TR
    let v3 = [0-w/2,0+h/2]; // BL
    let v4 = [0+w/2,0+h/2]; // BR
    
    return [
      [(v1[0]*cos(a)-v1[1]*sin(a))+mx,(v1[0]*sin(a)+v1[1]*cos(a))+my],
      [(v2[0]*cos(a)-v2[1]*sin(a))+mx,(v2[0]*sin(a)+v2[1]*cos(a))+my],
      [(v3[0]*cos(a)-v3[1]*sin(a))+mx,(v3[0]*sin(a)+v3[1]*cos(a))+my],
      [(v4[0]*cos(a)-v4[1]*sin(a))+mx,(v4[0]*sin(a)+v4[1]*cos(a))+my],
    ];
  } else {
    print ("ERR: Height = " + h + " and Width = " + w + ".")
  }
}

/*
Rot square returns an array of vertices as arrays themselves, representing the rotated x and y values for each respective vertex
0 indexed obv. Maybe now that I've made this I can finally be at peace

btw this was made with a rotation matrix, idk why they couldnt js put them things into equations to begin with
but mathematicians hate programmers ig.
*/

function setup() {
  createCanvas(WIDTH, HEIGHT);
  angleMode(DEGREES);
}

function draw() {
  a+=1;
  
  // Clear screen
  background('white');
  
  // Draw square
  let sqr = rotSquare(ox,oy,a,w,h);
  
  line(sqr[0][0], sqr[0][1], sqr[1][0], sqr[1][1]);
  line(sqr[1][0], sqr[1][1], sqr[3][0], sqr[3][1]);
  line(sqr[3][0], sqr[3][1], sqr[2][0], sqr[2][1]);
  line(sqr[2][0], sqr[2][1], sqr[0][0], sqr[0][1]);
  
  // Center point for flair
  point(ox,oy);
}