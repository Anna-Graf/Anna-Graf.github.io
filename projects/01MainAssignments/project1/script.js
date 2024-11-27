let font;
let font2;
let font3;
let txt = "IAD";
let fontSize = 10; //
let amountClicks = 0;
let scaleFactor = 0.15; // Scattering factor
let dSize = 200; // Mouse proximity distance to scatter points
let pointX = 1;
let wordInput;
let button;
let slider;
let slider2
let sampleFactor = 5
let sliderColor = 255;

function preload() {
  font = loadFont("/fonts/RobotoMono-Bold.otf");
  font2 = loadFont("/fonts/barlow_condensed.otf");
  font3 = loadFont("/fonts/Montserrat-Black.otf"); }

let points;
let bounds;

function setup() {
  createCanvas(windowWidth, windowHeight);
	colorMode(HSB)
	rectMode(CENTER);
	
	//Word input bar
	wordInput = createInput();
	wordInput.style("border-radius", "15px")
  wordInput.position(100, 65);

  button = createButton('go');
	button.style("border-radius", "15px")
  button.position(wordInput.x + wordInput.width+ 5, 65);
	
	button.mousePressed(word);
	wordInput.changed(word);
	
	//slider
	
	slider = createSlider(0, 10, sampleFactor, 0.1);
  slider.position(width-150, 65);
  slider.size(80);
	
	
	slider2 = createSlider(0, 255);
	slider2.position(width-150, 85);
	}

 

function draw() {
	background(0,0,0, 0.3);
	let sliderColor = slider2.value();
	noStroke()
	fill(255);
	rect(width-116, 67, 85,10, 20)
	rect(width-92, 87, 140,10,20)
	
		
		if(keyIsPressed){
		if(keyCode === 32){
			scaleFactor+=0.01
		if(scaleFactor >= 0.7){
			scaleFactor = 0.15
		} 
		} else{
			
		}
		
	}
	
	if(amountClicks == 1){
		points = font2.textToPoints(txt, 0, 0, fontSize, {
    sampleFactor: slider.value(), // Higher number = more points
    simplifyThreshold: 0,
  });

  bounds = font2.textBounds(txt, 0, 0, 10);
		
	} else if(amountClicks == 2){
		points = font3.textToPoints(txt, 0, 0, fontSize, {
    sampleFactor: slider.value(), // Higher number = more points
    simplifyThreshold: 0,
  });

  bounds = font3.textBounds(txt, 0, 0, 10);
	} 
	else {
		amountClicks = 0;
		points = font.textToPoints(txt, 0, 0, fontSize, {
    sampleFactor: slider.value(), // Higher number = more points
    simplifyThreshold: 0,
  });

  bounds = font.textBounds(txt, 0, 0, 10);
}
 // let scaleFactor = 0.15;

  // Scaling and centering logic
  let scaleW = (width / bounds.w) * scaleFactor;
  let scaleH = (height / bounds.h) * scaleFactor;
  let w = bounds.w * scaleW;
  let h = bounds.h * scaleH;
  let fontX = -bounds.x * scaleW;
  let fontY = -bounds.y * scaleH;
	
  fontX += width / 2 - w / 2; // Center align the text
  fontY += height / 2 - h / 2; // Center align the text
  translate(fontX, fontY);

  // Draw points with interactivity
  	for (let i = 0; i < points.length; i++) {
		fill(255)
    let p = points[i];
    let pointX = p.x * scaleW;
    let pointY = p.y * scaleH;

    // Check if mouse is near the point (scatter effect)
    let d = dist(mouseX - fontX, mouseY - fontY, pointX, pointY);
    if (d < dSize) {
			
			fill(sliderColor,100,100)
			
      // Scatter points away from mouse
      let angle = atan2(pointY - (mouseY - fontY), pointX - (mouseX - fontX));
      pointX += cos(angle) * 100;
      pointY += sin(angle) * 100;
    } else {
			
      // Smoothly return to original position
      pointX = lerp(pointX, p.x * scaleW, 0.1);
      pointY = lerp(pointY, p.y * scaleH, 0.1);
    }
		
	

    // Draw the point as a circle
    circle(pointX, pointY, 7);
  }
}

function mousePressed(){
	amountClicks+= 1	
		
}

function keyPressed(){
	if(key == "1"){
		txt = "ZHDK"
	} else if(key == "2") {
			txt = "IAD"
	}

	
}

function word(){
	txt= wordInput.value();
}
