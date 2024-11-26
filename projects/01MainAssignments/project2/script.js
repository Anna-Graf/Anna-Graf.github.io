let buttons = []; // Array to store all the buttons
let moveCount = 0;
let buttonState2 = false;
let pressed = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(200);

  // Create the initial button
  let button = createButton('click me');
  button.mouseOver(moveButton);
  button.position(random(0, width), random(0, height)); // Position it randomly initially
  button.size(100);
  button.mousePressed(() => pressed = true);

  // Add the initial button to the buttons array
  buttons.push(button);
}

function draw() {
  if (buttonState2) {
    if (pressed) {  if (buttonCount < 20) { // Only create buttons if the count is less than 20
        for (let i = 0; i < 20 - buttonCount; i++) { // Create the remaining buttons
          let newButton = createButton("click me");
          newButton.position(random(0, width), random(0, height)); // Position new buttons randomly
          buttons.push(newButton); // Store new button in the array
        }
      }
    } else {
    }
  }
}

function moveButton() {
  moveCount += 1;
  if (moveCount >= 3) {
    buttons[0].position(width / 2, height / 2); 
    buttonState2 = true;
  } else {
    buttons[0].position(random(0, width), random(0, height));
  }
}
