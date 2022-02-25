//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var gameOverSound ,knifeSwoosh;
var restartImage;
var restart,gameover;
function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  restartImage=loadImage("restart.png")


  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  
  //creating sword
   knife=createSprite(width/2,height/2,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
 // create restart
  var restart= createSprite(width/2,height/2,30,30);
  restart.addImage(restartImage);
restart.scale=0.2;
restart.visible=false;

  //create gameover
  var gameover=createSprite(width/2,height/2+40,40,40);
  gameover.addImage(gameOverImage);
  gameover.scale=0.2;
  gameover.visible=false;

  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Call fruits and Monster function
    fruits();
    Monster();
    
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;

  // to invisible gameover,restart



  // Increase score if sword touching fruit
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      
       knifeSwooshSound.play();
      // knifeSwooshSound.play;
      // knifeSwooshSound();
      // knifeSwooshSoundplay();


      // score=score;
      // score=+2;
      // score=2;
       score=score+2;

    }
    else
    {
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife)){
        gameState=END;
      }
        
       
       if(gameState===END){
      restart.visible = true;
      gameover.visible = true;
      
      //gameover sound
        gameOverSound.play()
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        
       
      if (mousePressedOver(gameover)){
        reset();
      }
      
      
      
      }
      
      
       

       
    }
  }
  
  drawSprites();
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}


function Monster(){
  if(World.frameCount%100===0){
    monster=createSprite(width-50,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(50,height-50));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=500;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%60===0){
    fruit=createSprite(400,200,20,20);
    fruit.x = 0    
  //Increase the velocity of fruit after score 4 

       fruit.velocityX= (7+(score/4));
      // fruit.velocityY= (7+(score));
      // fruit.velocity= (7+(score/4));
      // fruit.velocityX= (7);
     
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}
function reset(){
gameState=PLAY;
score=0;
gameover.visible=false;
restart.visible=false;
}