function rotAboutPoint(x,y,a,ox = 0,oy = 0) {
    return [(x*cos(a)-y*sin(a))+ox,(x*sin(a)+y*cos(a))+oy];
  }
  
  function rotSquare(mx,my,a,w,h,rn=0) {
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