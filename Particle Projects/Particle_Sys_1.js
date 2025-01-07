const WIDTH=512;
const HEIGHT=512;

// Particle list
// Format: 0 = X, 1 = Y, 2 = Charge, -1 for neg, 1 for pos, 3=ID
let particles = [];

let particlestomake = 50;

function AABB(x,y,w,h,squarex,squarey,squarew,squareh) {
  if ((x>=squarex&&x<=squarex+squarew)||(x+w>=squarex&&x+w<=squarex+squarew)) {
    if ((y>=squarey&&y<=squarey+squareh)||(y+h>=squarey&&y+h<=squarey+squareh)) {
      return 1;
    }
  } 
  // If all else fails
  return 0;
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  noFill();
  ellipseMode(RADIUS);
  stroke("white");
  strokeWeight(5);
  angleMode(DEGREES);
  for (let i = 0; i<particlestomake;i++) {
    particles.push([random(0,WIDTH),random(0,HEIGHT),random(-1,1),i]);
  }
  background("black");
}

function draw() {
  // Clear Screen
  background('black');
  
  particles.forEach((p) => {
    // Particles near me?
    //let attraction=0;
    particles.forEach((p2) => {
      if (p2[3]!=p[3]) {
        let distx=p[0]-p2[0];
        let disty=p[1]-p2[1];
        let distxy=sqrt(distx*distx+disty*disty);
        let att = 0;
        att=((p[2]*p2[2])/distxy)*25;
        //print(att);
        // - = attracted
        // + = repulsed
        let distangle = atan(disty/distx);
        // Quadrant adjust
        if (distx<0) { // Quad 2 or 3
          distangle+=180;
        } else if (distx>0&&disty<0) { // Quad 4
          distangle+=360;
        }
        if (att<0) { // Attracted
          p[0]+=cos(distangle)*att;
          p[1]+=sin(distangle)*att;
        } else {
          p[0]-=cos(distangle+180)*att;
          p[1]-=sin(distangle+180)*att;
        }
      }
    });
  
    // Add noise
  
    
    // Clamp
    if (p[0]<0) {
      p[0]=0;
    } else if (p[0]>WIDTH) {
      p[0]=WIDTH;
    }
    if (p[1]<0) {
      p[0]=0;
    }
    if (p[1]>HEIGHT) {
      p[1]=HEIGHT;
    }
  
    // Draw points
    point(p[0],p[1]);
  });
}