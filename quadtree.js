class QuadTree {
   
  //r and l are point objects
  constructor(l, r) {
    this.l = l;
    this.r = r;
    this.points = [4];
    this.size = 0;
    this.split = false;
    this.ne = null;
    this.nw = null;
    this.sw = null;
    this.se = null;
  }  
  
  contains(x, y) {
     return (x < this.r.x && x >= this.l.x) && (y < this.r.y && y >= this.l.y); 
  }
  
  add(x, y) {
      if(this.contains(x, y)) {
        if(this.split) {
            this.ne.add(x, y);
            this.nw.add(x, y);
            this.se.add(x, y);
            this.sw.add(x, y);
        } else {
           if(this.size >= 4) {
              this.createChildren(); 
              this.add(x, y);
           } else {
              this.points[this.size] = new Point(x, y);
              this.size++;
           }
             
        }
      }
  }

  queryRange(x, y, range) {
    let r = [];
    if(this.queryHelper(x, y, range)) {
      for(let i = 0; i < this.size; i++) {
         if(distance(this.points[i].x, this.points[i].y, x, y) <= range) {
             r.push(this.points[i]);
             returned++;
             checked++;
             stroke(0, 255, 0);
             strokeWeight(pointSize + 4);
             point(this.points[i].x, this.points[i].y);
         } else {
             stroke(0, 0, 255);
             strokeWeight(pointSize + 4);
             checked++;
             point(this.points[i].x, this.points[i].y);
         }
      }
      if(this.split) {
        r.concat(this.ne.queryRange(x, y, range));
        r.concat(this.nw.queryRange(x, y, range));
        r.concat(this.sw.queryRange(x, y, range));
        r.concat(this.se.queryRange(x, y, range));
      }
    }
    return r;
  }
  
    
  queryHelper(x, y, range) {
    if(this.contains(x, y)) {
         return true;
    }
    let xleft = x - range;
    let xright = x + range;
    let ytop = y - range;
    let ybot = y + range;
    if(xright <= this.l.x || xleft > this.r.x) {
      return false;
    }
    if(ybot < this.l.y || ytop >= this.r.y) {
      return false;
    }
    return true;
  }
  
  createChildren() {
      this.split = true;
      let midx = (this.r.x + this.l.x)/2;
      let midy = (this.r.y + this.l.y)/2;
      this.nw = new QuadTree(this.l, new Point(midx, midy));
      this.ne = new QuadTree(new Point(midx, this.l.y), new Point(this.r.x, midy));
      this.sw = new QuadTree(new Point(this.l.x, midy), new Point(midx, this.r.y));
      this.se = new QuadTree(new Point(midx, midy), this.r);
  }
  
  display() {
    strokeWeight(pointSize + 2);
    stroke(0);
    noFill();
     for(let i = 0; i < this.size; i++) {
        point(this.points[i].x, this.points[i].y); 
     }
    if(this.split) {
      this.ne.display();
      this.se.display();
      this.sw.display();
      this.nw.display();
    }
    if(showLines) {
      strokeWeight(2);
      noFill();
      rect(this.l.x, this.l.y, this.r.x, this.r.y);
    }
    
  }
  
}




