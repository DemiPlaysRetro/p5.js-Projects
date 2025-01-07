const WIDTH = 512;
const HEIGHT = 512;

// Map
let map1 = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
]
let cols,rows;
cols = 16;
rows = 8;
CellSize = 64;

// Player Values
let px,py,potx,poty,pvx,pvy,pc,pcs,pcf;
let wsp,jsp,ong;
let termx,termy;
let damp;

// Camera Values
let cx,cy,tfx,tfy,sfx,sfy,visx,visy;

// Other Values
let strkc,fillc,bgc;
strkc = "lime";
fillc = "black";
bgc = "black";
pcs = "blue";
pcf = bgc;
wsp = 20;
jsp = 15;
grav=25;

px=1;
py=1;
termx=10;
termy=10;
damp=5;

function sign(num) {
  if (num > 0) {
    return 1;
  } else if (num < 0) {
    return -1;
  } else {
    return 0;
  }
}

function GT(x,y) { // Get Tile
  if (x>=0&&x<cols*CellSize&&y>=0&&y<rows*CellSize) { // OOB Check
    if (y<rows&&x<cols)
    return map1[floor(y)][floor(x)];
  } else {
    return 0;
  }
}

function ST(x,y,t) { // Set Tile
  // Not Implemented
}

function setup() {
  createCanvas(WIDTH,HEIGHT);
  pvx=0;
  pvy=0;
}

function draw() {
  // Handle Input
  if (keyIsDown(87)) { // W
    if (ong==1) {
      pvy=-jsp;
      ong=0;
    }
  }
  if (keyIsDown(65)) { // A
    pvx+= -wsp/2.5;
  }
  if (keyIsDown(68)) { // D
    pvx+=wsp/2.5;
  }
  
  // Damp X/
  if (abs(pvx)>0) {
    if (pvx>0) {
      pvx-=damp;
    } else if (pvx<0.5) {
      pvx+=damp;
    }
  }
  
  // Check Terminal
  if (pvx>termx) {
    pvx=termx;
  } else if (pvx<-termx) {
    pvx=-termx;
  }
  
  // Dampening
  if (abs(pvx)<0.25) {
    pvx=0;
  } else {
    pvx-=damp * 0.015 * ((pvx>0) ? 1 : -1);
  }
  
  // Gravity
  pvy+=grav*0.015;
  
  // Potential Position
  potx = px + pvx * 0.015;
  poty = py + pvy * 0.015;
  
  // Collision
  if (pvx <= 0) { // Left
    if (GT(potx,py)==2||GT(potx,py+0.9)==2) {
      potx=floor(potx+1);
      pvx=0;
    }
  } else {
    if (GT(potx+0.9,py)==2||GT(potx+0.9,py+0.9)==2) { // Right
      potx=floor(potx);
      pvx=0;
    }
  }
  
  if (pvy >=0) { // Down
    if (GT(px,poty+1)==2||GT(px+0.9,poty+1)==2) {
      poty=floor(poty);
      pvy=0;
      ong=true;
    }
  } else {
    if (GT(px,poty)==2||GT(px+0.9,poty)==2) {
      poty=floor(poty)+1;
      pvy=0;
    }
  }
  
  // Updoot
  px=potx;
  py=poty;
  
  // Camera Update
  cx = px;
  cy = py;
  
  // Visible tiles
  visx=WIDTH/CellSize;
  visy=HEIGHT/CellSize;
  
  // Get leftmost visible tile
  tfx=cx-(visx/2);
  tfy=cy-(visy/2);
  
  // Clamp tile offset
  if (tfx<0) tfx=0;
  if (tfy<0) tfy=0;
  if (tfx>cols-visx) tfx=cols-visx;
  if (tfy>rows-visy) tfy=rows-visy;
  
  sfx = (tfx-floor(tfx))*CellSize;
  sfy = (tfy-floor(tfy))*CellSize;
  
  // Clear Screen
  background(bgc);
  
  // Draw Map
  for (let r = 0; r<visx+1; r++) {
    for (let c = 0; c<visy+1; c++) {
      let curT=GT(c+tfx,r+tfy);
      switch (curT) {
        case 0: // ERR
          break;
        case 1: // Nothing
          break;
        case 2: // Wall
          rect(c*CellSize-sfx,r*CellSize-sfy,CellSize,CellSize);
          break
        case 3: // Spawn
          break;
        default:
          break;
      }
    }
  }
  
  // Draw Player
  rect((px+tfx)*CellSize,(py+tfy)*CellSize,CellSize,CellSize);
}
