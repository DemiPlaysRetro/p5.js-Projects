// Map Variables
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
let MapSize,MapX,MapY,MapColor,CellSize;

// Player Variables
let px,py,ps,pa,pc,speed,rotmod,fov; //Player X, Player Y, Player Radius, Player Angle, Player Color,Speed,RotationStep,FOV

// Ray Variables
let RayColor,ra,vry,vrx,vxo,vyo,hry,hrx,hxo,hyo,mx,my,cat,testr,lengthv,lengthh,sa,ea,anglestep;
// Ready?...

// RayColor,RayAngle,Vertical Ray Y,Vertical Ray X, Vertical Ray X-Step, Vertical Ray Y-Step
// Horizontal Ray Y, Horizontal Ray X, Horizontal Ray X-Step, Horizontal Ray Y-step
// Map X, Map Y, Testing value (To turn on and off stuff), Length Vertical, Length Horizontal
// Start Angle, End Angle, Angle Step

// Other Variables
let Guidelength,GuideColor;
let BackgroundColor;


function setup() {
  createCanvas(512, 512);
  MapX = 8;
  MapY = 8;
  CellSize = 64;
  MapSize = MapX*MapY;
  MapColor = "white";
  px = 5*CellSize;
  py = 5*CellSize;
  ps = 16;
  pa = 1;
  pc = "cyan";
  speed = 3;
  rotmod = radians(5);
  Guidelength = 45;
  GuideColor  = "darkred";
  BackgroundColor = "grey";
  RayColor = "lime";
  fov = 90;
  testr=0;
  lengthv = 0;
  lengthh = 0;
  anglestep=1;
}

function wait(milliseconds) {
  setTimeout(() => {},milliseconds);
}

function draw() {
  
  // Handle Input
  if (keyIsDown(87)) { // W
    py-=speed;
  }  
  
  if (keyIsDown(83)) { // S
    py+=speed;
  }
  
  if (keyIsDown(65)) { // A
    px-=speed;
  }
  
  if (keyIsDown(68)) { // D
    px+=speed;
  }
  
  if (keyIsDown(81)) { // E
    pa-=rotmod;
  }
  
  if (keyIsDown(69)) { // Q
    pa+=rotmod;
  }
  if (keyIsDown(32)) { // Space (Tester)
    print(rx);
    print(mx*64);
  }
  
  // Clear screen
  background(BackgroundColor);
  
  // Draw Map
  fill(MapColor);
  for (i=0;i<8;i++) {
    for(let r=0;r<8;r++) {
      if (map[r][i]==1) {
        rect(i*CellSize,r*CellSize,CellSize,CellSize);
      }
    }
  }
  fill('white');
  
  // Draw Player
  fill(pc);
  circle(px,py,ps);
  fill("white");
  
  // Draw the 
  sa = pa - (radians(fov/2))
  ea = pa + (radians(fov/2))
  for (ra=sa;ra<ea;ra+=radians(anglestep)) {
    //ra+=(radians(i2));
    //ra+=radians(i2);
    let detv = 0;
    let deth = 0;
    if (testr==0) {
    if (sin(ra)<0) { // Looking up
      cat=-1/tan(ra);
      hry = floor(py/CellSize)*CellSize-1;
      hrx = ((py-hry)*cat)+px;
      hyo = CellSize;
      hxo = (CellSize*(-cat));
      while ((deth!=1)&&(hrx>=0)&&(hrx<=512)) {
        mx = floor(hrx/CellSize);
        my = floor(hry/CellSize);
        if (map[my][mx]==1) {
            deth=1;
        } else {
          hry-=hyo;
          hrx-=hxo;
        }
      }
    } else if (sin(ra)>0) { // Looking Down
      //print("Looking down");
      cat=1/tan(ra);
      hry = floor(py/CellSize)*CellSize+64;
      hrx = ((hry-py)*cat)+px;
      hyo = CellSize;
      hxo = (CellSize*(cat));
      while ((deth!=1)&&(hrx>=0)&&(hrx<=512)) {
        mx = floor(hrx/CellSize);
        my = floor(hry/CellSize);
        if (map[my][mx]==1) {
            deth=1;
        } else {
          hry+=hyo;
          hrx+=hxo;
        }
      }
    }}
    
    if(cos(ra)>0) { // Looking Right
      // Cosine is always positive when looking right
      vrx=(ceil(px/CellSize)*CellSize);
      vry=py-(-tan(ra)*(vrx-px));
      vxo=CellSize;
      vyo=tan(ra)*vxo;
      
      while ((detv!=1)&&(vry>=0)&&(vry<=512)) {
        mx = floor(vrx/CellSize);
        my = floor(vry/CellSize);
        if (map[my][mx]==1) {
          detv=1;
        } else {
          vry+=vyo;
          vrx+=vxo;
        }
      }
    } else if (cos(ra)<0) { // Looking Left
      vrx=(floor(px/CellSize)*CellSize-1);
      vry=py-(tan(ra)*(px-vrx));
      vxo=CellSize;
      vyo= tan(ra)*vxo;
      
      while ((detv!=1)&&(vry>=0)&&(vry<=512)) {
        mx = floor(vrx/CellSize);
        my = floor(vry/CellSize);
        if (map[my][mx]==1) {
          detv=1;
        } else {
          vry-=vyo;
          vrx-=vxo;
        }
      }
    }
    
    if ((detv==1)||(deth==1)) {
      lengthh = sqrt((hrx - px) * (hrx - px) + (hry - py) * (hry - py));
      lengthv = sqrt((vrx - px) * (vrx - px) + (vry - py) * (vry - py));
      // ^ Works cause the square root of a negative recipriocal is the same as it's positive value
      //      (I did not know this, thanks chatgpt)
      if (lengthh<lengthv) {
        line(px,py,hrx,hry)
      } else if (lengthh>lengthv) {
        line(px,py,vrx,vry);
      }
    }
      // Draw Guideline
  stroke(GuideColor);
  line(px,py,cos(pa)*Guidelength+px,sin(pa)*Guidelength+py);
  stroke("black");
    
  }
}
