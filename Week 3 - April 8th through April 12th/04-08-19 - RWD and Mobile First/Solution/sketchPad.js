var color = document.querySelector('.selected').style.backgroundColor;
var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
var lastEvent;
var mouseDown = false;

function changeColor() {
  var r = document.querySelector("#red").value;
  var g = document.querySelector("#green").value
  var b = document.querySelector("#blue").value
  var rgb = 'rgb('+r+','+g+','+b+')';
  document.querySelector("#newColor").style.backgroundColor = rgb;
}

function colorClick(){
    document.querySelector(".selected").classList.remove("selected");
    this.classList.add("selected");
    color = this.style.backgroundColor;
}

document.querySelectorAll(".controls li").forEach(function(val){
    val.addEventListener("click", colorClick);
})



document.querySelectorAll("input[type=range]").forEach(function(val){
    val.addEventListener("input", changeColor)
});


document.querySelector("#addNewColor").addEventListener("click", function(){
    var newColor = document.createElement("li");
    newColor.style.backgroundColor = document.querySelector("#newColor").style.backgroundColor;
    newColor.addEventListener("click", colorClick);
    document.querySelector(".controls ul").append(newColor);
})


canvas.addEventListener("mousedown", function(e){
  lastEvent = e;
  mouseDown = true;  
})
canvas.addEventListener("mousemove",function(e){
if(mouseDown){
  context.beginPath();
  context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
  context.lineTo(e.offsetX,e.offsetY);
  context.strokeStyle = color;
  context.stroke();
  lastEvent = e;
}  
})
canvas.addEventListener("mouseup",function(){
  mouseDown = false;
})
canvas.addEventListener("mouseleave",function(){
  var mouseup = new Event('mouseup');
    canvas.dispatchEvent(mouseup);
});;