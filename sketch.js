var wave;
var button;
var playing = false
var ampValue = 0;
let sw= 1;
let glow = 1;
var notes = [ 60,62,64,65,67,69,71,72,74,76 ];

var osc;
var x;

function setup() {
  createCanvas(400,400);
  slider = createSlider(0, 1, 0.2, 0.2);
osc = new p5.TriOsc();
osc.start();
osc.amp(0, 10, 20);
  button = createButton('play/pause');
  button.mousePressed(toggle);
r = random(50, 255);
  g = random(0,200);
  b = random(50,255);
}
function playNote(note,duration) {
osc.freq(midiToFreq(note));
osc.fade(0.5,0.2);
    if(duration) {
      setTimeout(function() {
        osc.fade(0,0.2);
}, duration-50);
}
}
function draw() {
  osc.amp(slider.value());
   background(r,g,b);
  console.log(accelerationX +","+ accelerationY+ ","+ accelerationZ);
  
  if(sw > 20 || sw < 1) {
    glow = -glow;
  }
  sw += glow;
  stroke(255, 50);
  strokeWeight(sw);
  fill(240);
  ellipse(mouseX,mouseY, 40)
  var w = width / notes.length;
  for (var i = 0; i < notes.length;   i++) {
  var x = i * w;
  if(mouseX > x && mouseX < x + w && mouseY < height) {
  if(mouseIsPressed) {
  fill(100,255,200);
  } else{
    fill(127);
  }
} else {
  fill(200);
}
rect(x,0,w-1,height-1);
 }
}
function touchStarted() {
  var key = floor(map(mouseX,0,width,0,notes.length));
  playNote(notes[key]);
  text(touches.length,200,200);
}
function mouseReleased() {
  osc.fade(0,0.5);
}
function deviceMoved(){
  r = map(accelerationX, -90, 90, 100, 175);
  g = map(accelerationY, -90, 90, 100, 200);
  b = map(accelerationZ, -90, 90, 100, 200);

}
function toggle(){
  if(!playing){
    osc.start();
    playing = true;
  }
  else{
    osc.stop();
    playing = false;
  }
}
function volume() {
  osc = gainSlider.value();
}

