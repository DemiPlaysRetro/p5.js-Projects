const WIDTH=512;
const HEIGHT=512;

// Data
let data=[45,45,90];
let datasum=0;
let size=0;
let lengthclamp=1;

// Graphics
let curSum=0;

// X, Y, Value
let lines = [];

// Border X,Y,Width,Height
let sx,sy,spx,spy,sh,sw;

// Other
let step=1;

function setup() {
  // Init some values
  spx=50;
  spy=200;
  sh=HEIGHT-(spy*2);
  sw=WIDTH-(spx*2);
  sx=spx;
  sy=spy;
  // Create canvas
  createCanvas(WIDTH, HEIGHT);
}

function draw() {
  // Handle input
  // Line 1
  if (keyIsDown(81)) { // Q
    data[0] -= step;
  }
  if (keyIsDown(87)) { // W
    data[0] += step;
  }
  
  // Line 2
  if (keyIsDown(65)) { // A
    data[1] -= step;
  }
  if (keyIsDown(83)) { // S
    data [1] += step;
  }
  
  // Line 3
  if (keyIsDown(90)) { // Z
    data [2] -= step;
  }
  if (keyIsDown(88)) { // X
    data [2] += step;
  }
  
  // Clamp Data
  for (let i = 0; i < size; i++) {
    if (data[i] < 0) {
      data[i] = 0;
    }
  }
  
  // Initialize respective values
  datasum=0;
  size=0;
  data.forEach((element) => {
    datasum+=element;
    size+=1;
  });
  // Empty and refill array
  lines = [];
  // Fill array
  for (let i = 0; i < size; i++) {
    lines.push([0,0,0,0]);
  }
  // Computate all clamped values
  // Sigma notation
  // n=1-(Size) = x subscript i
  curSum=0
  for (let i = 0; i<size;i++) {
    lines[i][2] = (data[i]/datasum)*lengthclamp;
    lines[i][3] = lines[i][2]+curSum
    lines[i][0] = (lines[i][3]*sw)+spx;
    lines[i][1] = spy;
    curSum+=lines[i][2];
  }
  // Draw phase
  // Background
  background("white");
  // Bounding Box
  rect(sx,sy,sw,sh);
  // Lines
  for (let i = size-1; i > -1; i--) {
    line(lines[i][0],lines[i][1],lines[i][0],lines[i][1]+sh);
    text(i+"m",lines[i][0]-10,(lines[i][1]+sh)/2);
    text(round(lines[i][2],2),lines[i][0]-10,(lines[i][1]+sh)/2.5);
    text(lines[i][2]*180,10,375+(50*i));
  }
}