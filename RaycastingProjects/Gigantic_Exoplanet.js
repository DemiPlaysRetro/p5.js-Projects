//Player Vars
let px, py, pa, ps; // Player X, Player Y, Player Angle, Player Size (Radius)

//Ray vars

//Other Vars
let MapX, MapY, MapSize, CellSize, Guidelength, Rotmod, speed;

//Map
let map = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1]
];

function setup() {
  createCanvas(512, 512);
  ps = 16;
  pa = 1;
  Guidelength = 35;
  speed = 4;
  Rotmod = radians(5);
  MapSize = 64;
  MapX=8;
  MapY=8;
  CellSize = 64;
  px = 3 * CellSize;
  py = 5 * CellSize;
}

function draw() {
  // Handle player inputs
  if (keyIsDown(87)) {
    //W
    py -= speed;
  }
  if (keyIsDown(83)) {
    //S
    py += speed;
  }
  if (keyIsDown(65)) {
    //A
    px -= speed;
  }
  if (keyIsDown(68)) {
    //D
    px += speed;
  }
  if (keyIsDown(81)) {
    //Q
    pa -= Rotmod;
  }
  if (keyIsDown(69)) {
    //E
    pa += Rotmod;
  }

  // Clear the screen
  background("grey");

  // Draw the map
  for (let i = 0; i < 8; i++) {
    for (let i2 = 0; i2 < 8; i2++) {
      if (map[i2][i] == 1) {
        rect(i * 64, i2 * 64, CellSize, CellSize);
      }
    }
  }

  // Draw the player
  fill("cyan");
  circle(px, py, ps);
  fill("white");

  // Draw the guideline
  stroke("darkred");
  //print(py);
  line(px, py, cos(pa) * Guidelength + px, sin(pa) * Guidelength + py);
  stroke("black");

  pa=ra;
  for (let i3;i3<1;i3++) {
    if(ra>PI){
      ry=
     }
  }
}
