//사각형 변수
let rx, ry;
const rw=150, rh=30;
//원 변수
let cx, cy;
let cdirx=1, cdiry=-1; //원 이동방향
const cr=15;
const cspeed=5;  //원 움직임속도
//처음 시작 flag
let sflag=true;

function preload(){
  img=loadImage('./img/logo.png');
  song1=loadSound('./sound/blop.mp3');
  song2=loadSound('./sound/blop2.mp3');
}
function setup() {
  createCanvas(400, 400);
  initDraw();
}

function initDraw(){
    
  //사각형 처음위치
  rx=width/2 -rw/2;
  ry=height - rh;
  
  //원 처음위치
  cx= width/2;
  cy= height/2;
  
  //초기 점수
  score =0;
  
  //화면 지우기
  removeElements();
}

//사각형 그리기
function rectDraw(){
  //마우스
  // rx=mouseX;
  //키보드 
  if (keyIsDown(LEFT_ARROW))  rx -= 5;
  if (keyIsDown(RIGHT_ARROW)) rx += 5;
  
  //캔버스 안쪽에서 움직이기
  if (rx>=width-rw) rx=width-rw;
  if (rx<0) rx=0;

  rect(rx,ry,rw,rh);
}
//원 그리기
function circleDraw(){ 
  //막대에 닿은 경우
  if(cx>rx && cx<rx+rw && cy>=ry-cr){
    cdiry=-cdiry;
    score = score+1;
  }
  else if (cy>ry-cr){
    cdiry=-cdiry;
    score = score-1;
  }
  //벽면튕기기
  if(cx>=width-cr||cx<=cr){
    cdirx=-cdirx;
    cx=cx+cdirx*random(cr*2);
  }
  if(cy<=cr||cy>=height-cr){
    cdiry=-cdiry;
    cy=cy+cdiry*random(cr*2);
  }
  //새로운 중심
  cx=cx+cdirx*cspeed;
  cy=cy+cdiry*cspeed;
  
  circle(cx, cy, cr*2);
}
function showScore(){
  textSize(20);
  text('점수 : '+score, 10, 30);
}
function startBt(){
  image(img,100,50,200,200);
  button=createButton('시작하기');
  button.size(200,50);
  button.position(width/2-90, height/5*3.5);
  button.style('font-size','24px');
  button.mousePressed(changeFlag);
}
function stopBt(){
  removeElements();
  background(255);
  image(img,100,50,200,200);
  textSize(32);
  text('Game Over', width/2-80, height/5*3.5);
  button=createButton('다시하기');
  button.size(200,50);
  button.position(width/2-100, height/5*4);
  button.style('font-size','24px');
  button.mousePressed(initDraw);
}
//시작하기
function changeFlag(){
  removeElements();
  sflag=false;
}
function draw() {    
  if(sflag){
    background(255);
    startBt();
  }
  else {
    if (score < -5){
      stopBt();
    }
    else{ 
      background(220);
      showScore();
      rectDraw();
      circleDraw();
    }    
  }
}