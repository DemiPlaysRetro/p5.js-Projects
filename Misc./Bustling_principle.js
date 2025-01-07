const WIDTH = 512;
const HEIGHT = 512;

let a,b,c,h;
let a1,a2;
let aa,bb,cc;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  angleMode(DEGREES);
  a=WIDTH*0.75;
  a1=random(a);
  a2=a-a1;
  h=random((HEIGHT/2)*0.5)+100;
  b=sqrt(h*h+a1*a1);
  c=sqrt(h*h+a2*a2);
  bb=atan(h/a2);
  cc=atan(h/a1);
  aa=180-(bb+cc);
}

function draw() {
  background("white");
  stroke("black");
  line(WIDTH*(0.25/2),HEIGHT/2,WIDTH*(0.25/2)+a,HEIGHT/2);
  line(WIDTH*(0.25/2),HEIGHT/2,WIDTH*(0.25/2)+(cos(bb)*c),HEIGHT/2-(sin(bb)*c));
  line(WIDTH*(0.25/2)+a,HEIGHT/2,WIDTH*(0.25/2)+a-(cos(cc)*b),HEIGHT/2-(sin(cc)*b));
  text(a2,WIDTH*(0.25/2)+a-50,HEIGHT/2+45);
  text(a1,WIDTH*(0.25/2)-50,HEIGHT/2+45);
  text(c,WIDTH*(0.25/2)+(cos(bb)*(c/2)),HEIGHT/2-(sin(bb)*(c/2)));
  text(b,WIDTH*(0.25/2)+(cos(cc)*(b/2)),HEIGHT/2-(sin(cc)*(b/2)));
}