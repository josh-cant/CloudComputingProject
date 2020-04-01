let capacity = 4;
let range = 75;
let points;
let quad;
let pointSize = 4;
let showLines = false;
let start = false;
let total = 0;
let checked = 0;
let returned = 0;
let clickRandom = 30;
let startAmount = 200;
let query = true;

function setup() {
  createCanvas(500, 530);
  rectMode(CORNERS);
  quad = new QuadTree(new Point(0,0), new Point(width, height - 30));
  strokeWeight(6);
  
  createP("Keyboard Commands:");
  createP("  [space]: toggle quad tree lines on and off");
  createP("  [a | t]: add [100 | 1000] random points");
  createP("  Numbers 1-4: change radius size");
  createP("  p: increase size of canvas");
  createP("  o: decrease size of canvas");
  createP("  r: remove all points");
  createP("  Mouse Click: add 30 points close to mouse");
  
}

function draw() {
  background(240);
  
  if(start == false) {
    textSize(20);
    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    text("Click to begin", width /2, height/2);
  } else {
    quad.display();
    points = [];
    if(query) {
      points = quad.queryRange(mouseX, mouseY, range);
      stroke(0, 255, 0);
      strokeWeight(6);
      for(let i = 0; i < points.length; i++) {
          point(points[i].x, points[i].y);
      }
      strokeWeight(2);
      stroke(0,255,0);
      noFill();
      circle(mouseX, mouseY, range * 2);
    }
  }

  fill(220);
  stroke(0);
  strokeWeight(4);
  line(0, height - 28, width, height - 28);
  rect(0, height - 28, width, height);
  noStroke();
  fill(0);
  textSize(16);
  text("Total: " + total, width / 4 - 10, height - 14);
  fill(0, 0, 255);
  text("Checked: " + checked, width / 4 * 2 - 10, height - 14);
  fill(0, 200, 0);
  text("Returned: " + returned, width / 4 * 3 - 10, height - 14);
  returned = 0;
  checked = 0;
}

function randomQuad(n) {
   for(let i = 0; i < n; i++) {
      quad.add(random(0,width),random(0,height)); 
   }
  total += n;
}

function mousePressed() {
  if(start) {
      for(let i = 0; i < clickRandom; i++) {
      quad.add(random(mouseX - range,mouseX + range),random(mouseY - range,mouseY + range)); 
   }
    total += clickRandom;
  } else {
    start = true;
    randomQuad(startAmount);
  }
  //quad.add(mouseX, mouseY);
}

function keyPressed() {
  if(key == ' ') 
    showLines = !showLines; 
  if(key == 'a') {
    randomQuad(100);
  } else if(key == 'r') {
    reset();
  } else if(key == '1') {
     range = 50; 
  } else if(key == '2') {
     range = 75; 
  } else if(key == '3') {
     range = 100; 
  } else if(key == '4') {
     range = 125; 
  } else if(key == 'p') {
     resizeCanvas(width + 50, height + 50);
    reset();
    randomQuad(100);
  } else if(key == 'o') {
     resizeCanvas(width - 50, height - 50); 
    reset();
    randomQuad(100);
  } else if(key == 't') {
     randomQuad(1000); 
  } else if(key == 'm') {
     randomQuad(10); 
  }
    
}

function reset() {
  quad = new QuadTree(new Point(0,0), new Point(width, height));
  total = 0;
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function distance(x1, y1, x2, y2) {
  let x = (x1 - x2) * (x1 - x2);
  let y = (y1 - y2) * (y1 - y2);
  return sqrt(x + y);
}