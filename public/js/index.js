var socket = io("http://localhost:3000");

var collection = document.getElementsByClassName("imgBoton");
var btReset = document.getElementById("btReset");

for (let i = 0; i < collection.length; i++) {
  collection[i].addEventListener("click", function () {
    cell = collection[i].id;
    socket.emit("turn", { cell });
  });
}

socket.on("onValidateTurn", function (data) {
  let { matriz, message, finish } = data;
  for (m in matriz) {
    let img = document.getElementById(m);
    img.src = `/img/${matriz[m]}.png`;
  }

  console.log(finish, matriz, message);

  for (let i = 0; i < collection.length; i++) {
    if (finish) {
      collection[i].style.pointerEvents = "none";
    } else {
      collection[i].style.pointerEvents = "auto";
    }
  }
  document.getElementById("message").innerHTML = message;
});

btReset.addEventListener("click", function () {
  socket.emit("reset");
});
