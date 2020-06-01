var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var detection = 0;
var level = 0;
var c = 0;


$(this).keypress(function() {
  console.log("Handler for .keypress() called.");
  if (detection == 0) {
    $("#level-title").html("Level " + level);
    nextSequence();
    detection = 1;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(gamePattern, userClickedPattern, userClickedPattern.length-1);
})


//randomChosenColour = computer series
//userClickedPattern = user series
//each time next seq is called we need to compare the user input to each entry
//of randomChosenColour array and check if the asnwer is the same

function checkAnswer(gamePattern, userClickedPattern, c) {

    if (gamePattern[c] === userClickedPattern[c]) {
      console.log("success");
      if(gamePattern.length===userClickedPattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      $("#level-title").html("Game Over, Press Any Key to Restart");

    $("body").addClass("game-over");
    setTimeout(RemoveClass, 1000);
    function RemoveClass() {
    $("body").removeClass("game-over");
    }

      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      resart();

    }
}

function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300);
  playSound(randomChosenColour);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass('pressed');
  setTimeout(function() {
    $("#" + currentColour).removeClass('pressed');
  }, 100);
}

function resart(){
  userClickedPattern = [];
  gamePattern = [];
  detection = 0;
  level = 0;
  c = 0;


}
