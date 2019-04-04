var size = {
  height: window.innerHeight,
  width: window.innerWidth
}
var gameStarted = false;
function createDiv(func, className){
var div = document.createElement("div");
if(className){
  div.classList.add(className);
}
div.style.position= "absolute";
div.style.top = Math.floor(Math.random() * (size.height- 30)) +"px";
div.style.left = Math.floor(Math.random() * (size.width- 30)) +"px";
div.addEventListener("mouseenter", func);
document.querySelector("body").appendChild(div);
}

function endWinner(){
  if(gameStarted){
    gameStarted = false;
    alert("You are a winner!");
  }
}

function endLoser(){
  if(gameStarted){
    gameStarted = false;
    alert("You are a loser!");
  }
}

function startGame(){
  gameStarted = true;
}

for (var i = 0; i<75; i++){
  createDiv(endLoser);
}

createDiv(startGame, 'start');
createDiv(endWinner, 'end');
