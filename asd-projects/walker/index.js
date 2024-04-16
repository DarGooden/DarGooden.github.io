/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    ENTER: 13,
    LEFT: 65,
    UP: 87,
    RIGHT: 68,
    DOWN: 83,

    A: 37,
    W: 38,
    D: 39,
    S: 40,
  };

  var walker = {
    positionX: 0,
    speedX: 0,
    positionY: 0,
    speedY: 0,
    top: 0,
    left: 0,

  }

  var Runner = {
    positionX: 0,
    speedX: 0,
    positionY: 0,
    speedY: 0,
    top: 0,
    left: 0,

  }



  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                         // change 'eventType' to the type of event you want to handle
  //$(document).on('keyup', handleKeyUp); 

  //Fast spinny movements > start and stop 
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    wallCollision();
    redrawGameItem();



  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.ENTER) {
    }

    if (event.which === KEY.LEFT) {
      walker.speedX = -5;
    }
    if (event.which === KEY.UP) {
      walker.speedY = -5;
    }
    if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
    }

    if (event.which === KEY.DOWN) {
      walker.speedY = 5;
    }

    //Arrowkeys at the bottom because of course i'm not changing it.... So controls for Runner 


    if (event.which === KEY.A) {
      Runner.speedX = -5;
    }
    if (event.which === KEY.W) {
      Runner.speedY = -5;
    }
    if (event.which === KEY.D) {
      Runner.speedX = 5;
    }

    if (event.which === KEY.S) {
      Runner.speedY = 5;
    }
  }
  function handleKeyUp(event) {
    if (event.which === KEY.LEFT || event.which === KEY.UP || event.which === KEY.RIGHT || event.which === KEY.DOWN) {
      walker.speedX = 0
      walker.speedY = 0
    }
    if (event.which === KEY.A || event.which === KEY.W || event.which === KEY.D || event.which === KEY.S) {
      Runner.speedX = 0
      Runner.speedY = 0
    }
  }


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  function repositionGameItem() {
    walker.positionX += walker.speedX;
    walker.positionY += walker.speedY;
    
    Runner.positionX += Runner.speedX;
    Runner.positionY += Runner.speedY;

  }


  function redrawGameItem() {
    $("#walker").css("left", walker.positionX);
    $("#walker").css("top", walker.positionY);

    $("#Runner").css("left", Runner.positionX);
    $("#Runner").css("top", Runner.positionY);

  }
  function wallCollision() {
    var Char1H = $("#walker").height()
    var Char1W = $("#walker").width()

    var boardWidth = $("#board").width() - Char1W
    var boardHeight = $("#board").height() - Char1H

    var Char2H = $("#Runner").height() 
    var Char2W = $("#Runner").width() 

    var boardWidth = $("#board").width() - Char2W
    var boardHeight = $("#board").height() - Char2H

    if (walker.positionX < 0) { walker.positionX = 0 }
    if (walker.positionY < 0) { walker.positionY = 0 }
    if (walker.positionX > boardWidth) { walker.positionX = boardWidth }
    if (walker.positionY > boardHeight) { walker.positionY = boardHeight }
    
    //runner
    
    if (Runner.positionX < 0) { Runner.positionX = 0 }
    if (Runner.positionY < 0) { Runner.positionY = 0 }
    if (Runner.positionX > boardWidth) { Runner.positionX = boardWidth }
    if (Runner.positionY > boardHeight) { Runner.positionY = boardHeight }

    

  }
}
