
var sadDog,happyDog,bedRoomImg,dogvacImg,foodstockImg,injectionImg,GardenImg,VaccinationImg,runningLeftImg,runningImg,livingroomImg,washRoomImg;
var foodObj;
var foodS, foodStock;
var fedTime, lastFed, feed, addFood;    

function preload(){
         sadDog = loadImage("Images/Dog.png");
       happyDog = loadImage("Images/happy dog.png");
     bedRoomImg = loadImage("Images/Bed Room.png");
      dogvacImg = loadImage("Images/dogVaccination.png");
   foodstockImg = loadImage("Images/Food Stock.png");
   injectionImg = loadImage("Images/Injection.png");
      GardenImg = loadImage("Images/Garden.png");
 VaccinationImg = loadImage("Images/Vaccination.jpg");
  runningLeftImg = loadImage("Images/runningLeft.png");
    runningImg = loadImage("Images/running.png");
  livingroomImg = loadImage("Images/Living Room.png");
    washRoomImg = loadImage("Images/Wash Room.png");

}

function setup() {
  database = firebase.database()
  createCanvas(1000,400);
  
  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.addImage(happyDog);
  dog.addImage(runningImg);
  dog.addImage(washRoomImg);
  dog.addImage(livingroomImg);
  dog.addImage(runningLeftImg);
 

  dog.scale=0.15;

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


}

function draw() {

  console.log(hour());

  background("green");
currentTime = hour();
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data){
    lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);

  if(hour === lastFed +1){

foodObj.washRoomImg();
happyDog.hide();
sadDog.hide();
  }
  else if(hour === lastFed +2){

    foodObj.runningLFTImg();

    happyDog.hide();
    sadDog.hide();

      }
      else if(hour === lastFed +3){

        foodObj.runningImg();

        happyDog.hide();
        sadDog.hide();

          }
          else if(hour === lastFed +4){

            foodObj.livingroomImg();

            happyDog.hide();
            sadDog.hide();

              }
  if (lastFed >= 12) {
    text("Last Feed: " + lastFed %12 + "PM", 350, 30);
  }
  else if(lastFed == 0) {
    text("Last Feed: 12AM ", 350, 30);
  }
  else {
    text("Last Feed:  " + lastFed + "AM", 350, 30);
  }

  drawSprites();

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

  function feedDog() {
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food: foodObj.getFoodStock(),
      FeedTime : hour()
    })
  }


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}


