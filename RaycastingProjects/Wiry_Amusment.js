let map = [
  [1,1,1,1,1,1,1,1],
  [1,0,1,0,0,0,0,1],
  [1,0,1,0,0,0,0,1],
  [1,0,0,0,1,1,1,1],
  [1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1],
  [1,0,1,0,0,0,0,1],
  [1,1,1,1,1,1,1,1]
]

let px,py,pa,ps,pc,speed,Rotmod; // Player information: X,Y,Angle,Size(Radius),Player color,Speed,RotationSpeed
//(2,4)
px = 2*64;
py = 4*64;
pa = 1;
ps = 16;
pc = "cyan";
speed = 2;
let gll = 25; //Guideline Length
let MapX,MapY = 8;
let Maps = 64; // Map Size
// Depth of field, Ray Y, Ray X, Ray Angle, Map X, Map Y, Cotangent

function setup() {
  createCanvas(512, 512);
  Rotmod = radians(4);
}

function draw() {

  // Player inputs
  if (keyIsDown(87)) { //W
    py-=speed;
  }
  if (keyIsDown(83)) { //S
    py+=speed;
  }
  if (keyIsDown(65)) { //A
    px-=speed;
  }
  if (keyIsDown(68)) { //D
    px+=speed;
  }
  if (keyIsDown(81)) { //Q
    pa-=Rotmod;
  }
  if (keyIsDown(69)) { //E
    pa+=Rotmod;
  }
  // Clear screen
  background("grey");
  
  // Draw map
  fill("white")
  for (let i=0;i<8;i++) {
    for (let i2=0;i2<8;i2++) {
      if (map[i2][i]==1){
      rect(i*64,i2*64,64,64);}
    }
  }
  
  // Draw player
  fill(pc);
  circle(px,py,ps);
  
  // Draw rays
  let dof,ry,rx,ra,mx,my,aTan,mp,xo,yo;
  ra=pa;
  for(let i3=0;i3<1;i3++) 
  {
  aTan=1/tan(ra);
  if (ra<PI) {
    ry = floor(py/64)*64-0.001;
        // Adjacent
    rx = ((py-ry)*aTan)+px;
    yo=64;
    xo=64*aTan;
  } // Looking up
    
  mx=ceil(rx/64)-1;
  my=ceil(ry/64)-1;
  if(map[my][mx] != 1) {
    ry-=yo;
    rx-=xo;
  } else {
    print(mx+"mx");
    print(my+"my");
  }
  
  
  stroke("lime");
  //print(rx);
  //print(ry);
  line(px,py,rx,ry); // rx is NaN
  stroke("black"); 
   
  }
  // Draw Guideline
  //stroke("red");
  //line(px,py,cos(pa)*gll+px,sin(pa)*gll+py)
  //stroke("black");
}
