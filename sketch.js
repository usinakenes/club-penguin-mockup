let plaza;
let cp_down;
let cp_downleft;
let cp_left;
let cp_topleft;
let cp_top;
let cp_topright;
let cp_right;
let cp_downright;
let bubble;
let shrek;

let penguin;
let message;

let timer;
let msgCounter;

let dx;
let dy;
let distance;
let factor;
let target;
let currentDistance;
let angle;

let username;

function preload(){
  plaza = loadImage("./imgs/Plaza.png");
  bubble = loadImage("./imgs/bubble.png");
  shrek = loadImage("./imgs/shrek.png");
  cp_down = loadImage("./imgs/cp-down.png");
  cp_downleft = loadImage("./imgs/cp-downleft.png");
  cp_left = loadImage("./imgs/cp-left.png");
  cp_topleft = loadImage("./imgs/cp-topleft.png");
  cp_top = loadImage("./imgs/cp-top.png");
  cp_topright = loadImage("./imgs/cp-topright.png");
  cp_right = loadImage("./imgs/cp-right.png");
  cp_downright = loadImage("./imgs/cp-downright.png");
}

function setup() {
  createCanvas(1560, 1080);
  penguin = new Penguin(800, 800)
  message = new Message("izlenir");
  target = {
    x: 800,
    y: 800
  }
  
  username = "jedisirin";

}

function draw() {
  background(255);
  imageMode(CORNER);
  image(plaza,0,0,1560,1080);
  textSize(18);
  textFont("Montserrat")
  textStyle(BOLD)
  image(shrek, 755, 223, 200, 120)
  
  
  penguin.show();
  
  penguin.x += penguin.xVel;
  penguin.y += penguin.yVel;
  
  currentDistance = sqrt((target.x-penguin.x)**2 + (target.y-penguin.y)**2);
  
  if(currentDistance <= 5){
    penguin.xVel = 0;
    penguin.yVel = 0;
  }
  
  if(penguin.xVel !== 0 && penguin.yVel !== 0){
    penguin.y = Math.abs(Math.sin(timer) * 1 + penguin.y);
    timer += 0.5;
  } else {
    timer = 0;
  }
  
  if(msgCounter >= 0){
    message.show();
    msgCounter--;
  }
}

function keyPressed(){
  if(keyCode == ENTER){
    msgCounter = 100;
  }
}

function mousePressed(){
    target.x = mouseX;
    target.y = mouseY;
    dx = mouseX - penguin.x;
    dy = mouseY - penguin.y;
    
    distance = sqrt(dx*dx + dy*dy)
    
    factor = distance / penguin.vel
    
    penguin.xVel = dx /factor;
    penguin.yVel = dy/factor;
  
    angle = atan2(-dy,dx);
  
    print(angle, -7*Math.PI, -5*Math.PI);
  
    
    if(angle <= Math.PI/8 && angle >= -Math.PI/8){
      penguin.facing = cp_right;
    } 
    if(angle <= 3*Math.PI/8 && angle > Math.PI/8){
      penguin.facing = cp_topright;
    }
    if(angle <= 5*Math.PI/8 && angle > 3*Math.PI/8){
      penguin.facing = cp_top;
    }
    if(angle <= 7*Math.PI/8 && angle > 5*Math.PI/8){
      penguin.facing = cp_topleft;
    }
    if(angle > 7*Math.PI/8 || angle <= -7*Math.PI/8){
      penguin.facing = cp_left;
    }
    if(angle <= -5*Math.PI/8 && angle >= -7*Math.PI/8){
      penguin.facing = cp_downleft;
    }
    if(angle <= -3*Math.PI/8 && angle >= -5*Math.PI/8){
      penguin.facing = cp_down;
    }
    if(angle <= -Math.PI/8 && angle >= -3*Math.PI/8){
      penguin.facing = cp_downright;
    }
  
}


class Penguin{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.xVel = 0;
    this.yVel = 0;
    this.vel = 6;
    this.facing = cp_down;
    this.w = 72;
    this.h = 80;
  }
  
  show(){
     
    imageMode(CENTER);
    image(this.facing, this.x, this.y, this.w, this.h);
    textSize(14);
    textStyle(NORMAL)
    text(username, this.x-this.w/2.8, this.y + 50);
  
  }
}

class Message{
  constructor(msg){
    this.x = penguin.x+50;
    this.y = penguin.y-50;
    this.msg = msg;
  }
  
  show(){
    imageMode(CENTER)
    image(bubble,penguin.x + 50, penguin.y - 70, 110, 50);
    textSize(16);
    text(this.msg, penguin.x + 28, penguin.y - 70);
  }
}

