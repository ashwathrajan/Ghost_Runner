var PLAY = 1;
var END = 0;
var gameState = PLAY;
var tower, towerImg;
var door,doorImg,doorGroup;
var climber,climberImg,climberGroup;
var ghost,ghostImg;
var Invisible, InvisibleGroup;
var spookySound;
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png"); 
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300)
  tower.addImage(towerImg);
  tower.velocityY = 1;
  doorGroup = createGroup();
  climberGroup = createGroup();
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  InvisibleGroup = createGroup();
}

function draw(){
  background(0);
  if(gameState === PLAY){
    
  if(tower.y > 400){
    tower.y = 300;
  }
  if(keyDown("space"))
{
  ghost.velocityY = -5;
}
  ghost.velocityY = ghost.velocityY + 0.8;
  if(keyDown("right"))
    {
      ghost.x = ghost.x + 2;
    }
  if(keyDown("left"))
    {
      ghost.x = ghost.x -2;
    }
  if(climberGroup.isTouching(ghost))
    {
      ghost.velocityY = 0;
    }
  spawnDoors();
   if(InvisibleGroup.isTouching(ghost) || ghost.y > 600){
     ghost.destroy();
     gameState = END;
   }
  drawSprites();
  }
    if (gameState === END)
    {
      stroke("yellow"); 
      fill("yellow"); 
      textSize(30); 
      text("Game Over", 300,200);
    }
}
function spawnDoors(){
  if(frameCount % 240===0){
    door = createSprite(200,-50);
    climber = createSprite(200,10);
    Invisible = createSprite(200,15);
    Invisible.width = climber.width;
    Invisible.height = 2;
    door.addImage(doorImg);
    climber.addImage(climberImg);
    door.velocityY = 1;
    climber.velocityY = 1;
    Invisible.velocityY = 1;
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    Invisible.x = door.x;
    door.lifetime = 700;
    climber.lifetime = 700;
    Invisible.lifetime = 700;
    doorGroup.add(door);
    climberGroup.add(climber);
    InvisibleGroup.add(Invisible);
    ghost.depth = door.depth;
    ghost.depth = ghost.depth +1;
    Invisible.debug = true;
  }
}