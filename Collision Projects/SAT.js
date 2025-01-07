const WIDTH = 512;
const HEIGHT = 512;

let speed = 5;

class Vector {
  static getPerp(x,y) {
    return [y,-x];
  }
  
  static subtract(x1,y1,x2,y2) { // X1,Y1 - X2,Y2
    return [x1-x2,y1-y2]
  }
  
  static dot(x1,y1,x2,y2) { // X1,Y1 onto X2,Y2, returns scalar
    return (x1*x2)+(y1*y2);
  }
  
  static magnitude(x,y) { // X,Y's distance from 0,0
    return sqrt(x*x+y*y);
  }
  
  static normalize(x,y) {
    return [x/this.magnitude(x,y),y/this.magnitude(x,y)]; // Xnorm + Ynorm = 1
  }
  
  static add(x1,y1,x2,y2) { // Literally cant be any simpler
    return [x1+x2,y1+y2];
  }
}

class Box {
  constructor(x,y,w,h,a=0) {
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.a = a;
  }
  
  get vertexArray() { // Rotated array of vertices, process of elimination people
    return this.rotSquare(this.a);
  }
  
  get vertexArrayNR() { // No rotation array of vertices
    return this.rotSquare(0);
  }
  
  get edgeVectors() {
    const vertices = this.vertexArray;
    let edgeVecs = [];

    for (let i = 0; i < vertices.length; i++) {
      let curVec = vertices[i];
      if (vertices[i + 1] != null) {
        let nexVec = vertices[i + 1];
        edgeVecs.push(Vector.subtract(curVec[0], curVec[1], nexVec[0], nexVec[1]));
      } else {
        let firstVec = vertices[0]; // Connect the last vertex to the first
        edgeVecs.push(Vector.subtract(curVec[0], curVec[1], firstVec[0], firstVec[1]));
      }
    }

    return edgeVecs;
  }
  
  get edgeNormals() {
    const edgeVecs = this.edgeVectors;
    let edgeNorms = [];
    
    for (const edgeVec of edgeVecs) {
      edgeNorms.push(Vector.getPerp(edgeVec[0],edgeVec[1]));
    }
    return edgeNorms;
  }
  
  projVerticesOnAxis(axis) {
    const vertices = this.vertexArray;
    let min = Vector.dot(vertices[0][0],vertices[0][1],axis[0],axis[1]);
    let max = min;
    
    for (let i = 1; i < vertices.length; i++) {
      let projection = Vector.dot(vertices[i][0],vertices[i][1],axis[0],axis[1]);
      if (projection < min) {
        min = projection
      } else if (projection > max) {
        max = projection
      }
    }
    
    return [min,max];
  }
  
  drawSquare(drawAsDot = 0) {
    let vertices = this.rotSquare(this.a);
    if (drawAsDot == 1) {
      for (const vertex of vertices) {
        point(vertex[0],vertex[1]);
      }
    } else {
      line(vertices[0][0], vertices[0][1], vertices[1][0], vertices[1][1]);
      line(vertices[1][0], vertices[1][1], vertices[3][0], vertices[3][1]);
      line(vertices[3][0], vertices[3][1], vertices[2][0], vertices[2][1]);
      line(vertices[2][0], vertices[2][1], vertices[0][0], vertices[0][1]);
    }
  }
  
  
  // Lord bless the inventors of copy and paste, I wouldn't be able to live without you
  rotSquare(angul) {
    if (this.w>0 && this.h>0) {
      let v1 = [0-this.w/2,0-this.h/2]; // TL
      let v2 = [0+this.w/2,0-this.h/2]; // TR
      let v3 = [0-this.w/2,0+this.h/2]; // BL
      let v4 = [0+this.w/2,0+this.h/2]; // BR

      return [
        [(v1[0]*cos(angul)-v1[1]*sin(angul))+this.x,(v1[0]*sin(angul)+v1[1]*cos(angul))+this.y],
        [(v2[0]*cos(angul)-v2[1]*sin(angul))+this.x,(v2[0]*sin(angul)+v2[1]*cos(angul))+this.y],
        [(v3[0]*cos(angul)-v3[1]*sin(angul))+this.x,(v3[0]*sin(angul)+v3[1]*cos(angul))+this.y],
        [(v4[0]*cos(angul)-v4[1]*sin(angul))+this.x,(v4[0]*sin(angul)+v4[1]*cos(angul))+this.y],
      ];
    } else {
      print ("ERR: Height = " + this.h + " and Width = " + this.w + ".")
      print ("Why in god's name are you even TRYING to make a square with 0 width and 0 height?");
      print ("That makes 0 goddamn sense, if I were to walk up to you and ask for 0 cents, what do you do?");
      print ("What is a logical response in that situation, exactly, nothing, you idiot.")
    }
  }
}

function coordOverlap(a1,a2,b1,b2) { // 1D space    A1-----A2  B1======B2
  if (b1 > b2) {
    let tb2 = b2;
    b2 = b1;
    b1 = tb2;
  }
  if (a1 > b2) {
    let ta2 = a2;
    a2 = a1;
    a1 = ta2;
  }
  if (a1 == b1 || a1 == b2 || a2 == b1 || a2 == b2) { // A1B1-=-=-=A2B2
    return true;
  } else
  if (a1 < b2 && a2 > b2) { // B1===A1---B2---A1
    return true;
  } else
  if (a2 > b1 && a1 < b1) { // A1---B1---A2===B2
    return true;
  } else
  if (a1 > b1 && a2 < b2) { // B1==A1---A2==B2
    return true;
  } else
  if (a1 < b1 && a2 > b2) { // A1----B1=====B2----A2
    return true
  } else {
    return false;
  }
}

function SAT(box1,box2) {
  let box1axes = box1.edgeNormals;
  let box2axes = box2.edgeNormals;
  
  // Check for overlap on box 1 axes
  for (let i = 0; i < box1axes.length; i++) {
    let axis = box1axes[i];
    
    let proj1 = box1.projVerticesOnAxis(axis);
    let proj2 = box2.projVerticesOnAxis(axis);
    
    if (!coordOverlap(proj1[0],proj1[1],proj2[0],proj2[1])) {
      return false; // They aren't touching
    }
  }
  
  for (let i2 = 0; i2 < box1axes.length; i2++) {
    let axis = box2axes[i2];
    
    let proj1 = box1.projVerticesOnAxis(axis);
    let proj2 = box2.projVerticesOnAxis(axis);
    
    if (!coordOverlap(proj1[0],proj1[1],proj2[0],proj2[1])) {
      return false; // They aren't touching
    }
  }
  
  return true; // No axis of separation, they are touching
}

let square1 = new Box(WIDTH*(1/3),HEIGHT/2,50,50);

let square2 = new Box(WIDTH*(2/3),HEIGHT/2,50,50);

function setup() {
  createCanvas(WIDTH, HEIGHT);
  angleMode(DEGREES);
}

function draw() {
  
  // Mouse to angle
  
  let distX = square1.x - mouseX; // Negative = Rightside | Positive = leftside
  let distY = square1.y - mouseY; // Negative = Bottom | Positive = top
  
  if (distX == 0) {
    if (distY > 0) {
      square1.a = 270;
    } else {
      square1.a = 90;
    }
  }
  
  if (distY == 0) {
    if (distX > 0) {
      square1.a = 180;
    } else {
      square1.a = 0;
    }
  }
  
  square1.a = atan(distY/distX);
  
  if (distX > 0) {
    square1.a += 180;
  }
  
  // Handle keyboard input
  
  if (keyIsDown(87)) {
    square1.x += speed*cos(square1.a);
    square1.y += speed*sin(square1.a);
  }
  if (keyIsDown(83)) {
    square1.x -= speed*cos(square1.a);
    square1.y -= speed*sin(square1.a);
  }
  
  // Clear the screen
  background('white');
  
  square1.drawSquare();
  square2.drawSquare();
  
  //print(square1.projVerticesOnAxis(square2.edgeNormals[0]));
  //print(SAT(square1,square2)); OH MY GOD IT ACTUALLY WORKS WHAT THE HELL
}