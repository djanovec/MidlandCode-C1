var size = {
  height: window.innerHeight,
  width: window.innerWidth
};
var gameStarted = false;
for (var i = 0; i < 75; i++) {
  var div = document.createElement("div");
  div.style.position = "absolute";
  div.style.top = Math.floor(Math.random() * (size.height - 30)) + "px";
  div.style.left = Math.floor(Math.random() * (size.width - 30)) + "px";
  div.addEventListener("mouseenter", function() {
    if (gameStarted) {
      endGame("loser");
    }
  });
  document.querySelector("body").appendChild(div);
}

var div = document.createElement("div");
div.classList.add("start");
div.style.position = "absolute";
div.style.top = Math.floor(Math.random() * (size.height - 30)) + "px";
div.style.left = Math.floor(Math.random() * (size.width - 30)) + "px";
div.addEventListener("mouseenter", function() {
  gameStarted = true;
});
document.querySelector("body").appendChild(div);

var div = document.createElement("div");
div.classList.add("end");
div.style.position = "absolute";
div.style.top = Math.floor(Math.random() * (size.height - 30)) + "px";
div.style.left = Math.floor(Math.random() * (size.width - 30)) + "px";
div.addEventListener("mouseenter", function() {
  if (gameStarted) {
    endGame("winner");
  }
}) + document.querySelector("body").appendChild(div);

function endGame(result) {
  gameStarted = false;
  alert("You are a " + result);
}
