let buttons = [];
let moveCount = 0;
let buttonState2 = false;
let pressed = false;
let finalPressed = false;
let buttonState3 = false;
let nbButtonMove = 5;
let button;
let newButton;

// Timer
let timerStart = 0;
let timer = 4000;

// Character
let characterWalk;
let distanceCharacter;
let characterDed;
let characterHappy;
let isWalking = true;
let speedWalkingIn = 7;  // Faster speed for walking in
let speedWalkingOut = 3; // Slower speed for walking out
let currentSpeed; // Active speed of the character
let errorSign;
let congratsSign;

let characterExiting = false;
let standingStartTime = null; // For timing standing still
let currentSign = null; // Keeps track of the current sign (congrats or error)

function preload() {
  characterWalk = loadAnimation("/assets/walk1.2.png", "/assets/walk3.2.png");
  characterWalk.frameDelay = 4;

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
  currentSpeed = speedWalkingIn; // Start with walking-in speed
}

function draw() {
  background(0);

  // Display the current sign if it exists
  if (currentSign) {
    image(currentSign, width / 2 - currentSign.width / 2, 200); // Center the sign at the top
  }

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
          }, 650);
        });

        buttons.push(finalButton); // Add the final button to the array
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

    // Situation 1: Pressed the final button in time
    if (finalPressed) {
      if (isWalking) {
        distanceCharacter -= currentSpeed;
        animation(characterWalk, distanceCharacter, height - 150); // Adjusted to bottom alignment
      } else {
        if (characterExiting) {
          animation(characterWalk, distanceCharacter, height - 150); // Walking out of frame
        } else {
          image(characterHappy, distanceCharacter - 35, height - 180, characterHappy.width, characterHappy.height);
        }
      }

      if (distanceCharacter <= width / 2 && !characterExiting && standingStartTime === null) {
        distanceCharacter = width / 2;
        isWalking = false;
        standingStartTime = millis(); 
        image(characterHappy, distanceCharacter - 35, height - 180, characterHappy.width, characterHappy.height);
        currentSign = congratsSign; 
      }

      if (standingStartTime !== null && millis() - standingStartTime >= 3000) {
        isWalking = true;
        characterExiting = true;
        standingStartTime = null; 
        currentSpeed = speedWalkingOut;
        characterWalk.frameDelay = 8; 
      }

      if (characterExiting) {
        distanceCharacter -= currentSpeed;
        animation(characterWalk, distanceCharacter, height - 150);

        
        if (distanceCharacter <= -100) {
          reset();
        }
      }
    } 
    // Situation 2: Button not pressed in time
    else if (millis() - timerStart >= timer) {
      if (isWalking) {
        distanceCharacter -= currentSpeed;
        animation(characterWalk, distanceCharacter, height - 150);
      } else {
        if (characterExiting) {
          animation(characterWalk, distanceCharacter, height - 150); // Walking out of frame
        } else {
          image(characterDed, distanceCharacter - 35, height - 180, characterDed.width, characterDed.height);
        }
      }

      if (distanceCharacter <= width / 2 && !characterExiting && standingStartTime === null) {
        distanceCharacter = width / 2;
        isWalking = false;
        standingStartTime = millis(); // Start the standing timer
        image(characterDed, distanceCharacter - 35, height - 180, characterDed.width, characterDed.height);
        currentSign = errorSign; // Display the error sign
      }

      if (standingStartTime !== null && millis() - standingStartTime >= 3000) {
        isWalking = true;
        characterExiting = true;
        standingStartTime = null; 
        currentSpeed = speedWalkingOut; 
        characterWalk.frameDelay = 8; 
      }

      if (characterExiting) {
        distanceCharacter -= currentSpeed;
        animation(characterWalk, distanceCharacter, height - 150);
        // Stop the walking animation once the character has fully exited the screen
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

// Spawns more buttons when any newButton is clicked
function spawnMoreButtons() {
  for (let i = 0; i < 150; i++) {
    newButton = createButton("click me");
    newButton.position(random(0, width), random(0, height));
    buttons.push(newButton);
  }
}

// Reset function to set all values back to first setting & redraw the button
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
  standingStartTime = null;
  currentSign = null; // Remove the sign
  currentSpeed = speedWalkingIn; // Reset to walking-in speed
  characterWalk.frameDelay = 4; // Reset the walking frame delay for walking-in phase

  // Redraw button
  button = createButton('click me');
  button.mouseOver(moveButton);
  button.position(random(0, width), random(0, height));
  button.size(100);
  button.mousePressed(() => pressed = true);

  buttons.push(button);
}
