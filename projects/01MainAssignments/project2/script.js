//button
let buttons = []; 
let moveCount = 0;
let buttonState2 = false;
let pressed = false;
let finalPressed = false;
let buttonState3 = false;
let nbButtonMove = 5;
let button;
let newButton;

//timer
let timerStart = 0; 
let timer = 4000;

// Character
let characterWalk;
let distanceCharacter;
let characterDed;
let characterHappy;
let isWalking = true; 
let speedCharacter = 7;
let errorSign;
let congratsSign;

let characterExiting = false; 

function preload() {
  characterWalk = loadAnimation("/assets/walk1.2.png", "/assets/walk3.2.png");
  characterDed = loadImage("/assets/sad.png");
  characterHappy = loadImage("/assets/happyy.png");
  errorSign = loadImage("/assets/Error.1.png");
  congratsSign = loadImage("/assets/congrats.1.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  // Button in the beginning
  button = createButton('click me');
  button.mouseOver(moveButton);
  button.position(random(0, width), random(0, height)); 
  button.size(100);
  button.mousePressed(() => pressed = true);

  buttons.push(button);
	
  // Character
  distanceCharacter = width - 100; 
}

function draw() {
  // Button spam
  if (buttonState2 && pressed) {
    for (let i = 0; i < 5; i++) { 
      if (!buttonState2) break;

      newButton = createButton("click me");
      newButton.position(random(0, width), random(0, height));
      newButton.mousePressed(() => spawnMoreButtons());
      buttons.push(newButton); 

      if (buttons.length >= 350 && buttonState2) {
        buttonState2 = false;

        // Starts timer
        timerStart = millis();

        // Create the final button
        let finalButton = createButton("CLICK ME!!!");
        finalButton.position(random(0, width), random(0, height));
        finalButton.style("color", '#F95592');
        finalButton.mousePressed(() => {
        finalButton.style('background-color', '#AAEAA2');
					 setTimeout(() => {
        	finalPressed = true;
          buttonState3 = true;
        }, 650); // 3 seconds delay
        });

        buttons.push(finalButton);
      }
    }
  }
  
  if (buttonState3 || (millis() - timerStart >= timer && timerStart > 0)) {
    pressed = false;

    // Remove all buttons
    for (let b of buttons) {
      b.remove();
    }
    buttons = []; // Clear the array

    clear(); 
		// Situation 1: pressed the final button in time CLICK ME!!
    if (finalPressed) { 
      distanceCharacter -= speedCharacter;
      if (isWalking) {
        animation(characterWalk, distanceCharacter, height - 200);
      }

      if (distanceCharacter <= width / 2 && !characterExiting) {
        distanceCharacter = width / 2;
        isWalking = false; 
        image(characterHappy, distanceCharacter - 35, height - 230, characterDed.width, characterDed.height);
        //scale(2);
				push();
				rectMode(CENTER);
        image(congratsSign, 565, 150);
				pop();

        setTimeout(() => {
          isWalking = true;
          characterExiting = true;
        }, 3000); // 3 seconds delay
      }

      // Walk out of frame
      if (characterExiting) {
        speedCharacter = 3;
        distanceCharacter -= speedCharacter;
        if (distanceCharacter <= -100) {
          reset();
        }
      }
    } 
    // Situation 2: Button not pressed in time
    else if (millis() - timerStart >= timer) {
      distanceCharacter -= speedCharacter;
      if (isWalking) {
        animation(characterWalk, distanceCharacter, height - 200);
      }

      if (distanceCharacter <= width / 2 && !characterExiting) {
        distanceCharacter = width / 2;
        isWalking = false;
        image(characterDed, distanceCharacter - 35, height - 230, characterDed.width, characterDed.height); 	
        push();
        //scale(2);
        image(errorSign, 565, 150);
        pop();

        // Start walking out of frame
        setTimeout(() => {
          isWalking = true;
          characterExiting = true;
        }, 3500); // 3 seconds delay
      }

      // Walk out of frame
      if (characterExiting) {
        speedCharacter = 3;
        distanceCharacter -= speedCharacter;
        if (distanceCharacter <= -100) {
          reset();
        }
      }
    }
  }
}

function moveButton() {
  moveCount += 1;
  if (moveCount >= nbButtonMove) {
    button.position(width / 2, height / 2);
    buttonState2 = true;
  } else {
    button.position(random(0, width), random(0, height)); 
  }
}

// spawns more buttons when any newButton is clicked
function spawnMoreButtons() {
  for (let i = 0; i < 150; i++) {
    newButton = createButton("click me");
    newButton.position(random(0, width), random(0, height));
    buttons.push(newButton);
  }
}

// Reset function to set all values back to first setting & draws button again
function reset() {
  // Values reset
  distanceCharacter = width - 100;
  isWalking = true; 
  characterExiting = false;
  buttonState2 = false;
  pressed = false;
  finalPressed = false;
  buttonState3 = false;
  timerStart = 0; 
  moveCount = 0;
	
  // Redraw button
  button = createButton('click me');
  button.mouseOver(moveButton);
  button.position(random(0, width), random(0, height)); 
  button.size(100);
  button.mousePressed(() => pressed = true);

  buttons.push(button);
}
