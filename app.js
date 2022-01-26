const { on } = require("events");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 3000;
turn = "X";
message = "";
finish = false;
var matriz = {
  a1: "none",
  a2: "none",
  a3: "none",
  b1: "none",
  b2: "none",
  b3: "none",
  c1: "none",
  c2: "none",
  c3: "none",
};

app.use(express.json());
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("turn", (data) => {
    let { cell } = data;
    turn = turn === "X" ? "O" : "X";
    matriz[cell] = turn;
    validateTurn();
    io.sockets.emit("onValidateTurn", { matriz, message, finish });
  });

  socket.on("reset", () => {
    matriz.a1 = "none";
    matriz.a2 = "none";
    matriz.a3 = "none";
    matriz.b1 = "none";
    matriz.b2 = "none";
    matriz.b3 = "none";
    matriz.c1 = "none";
    matriz.c2 = "none";
    matriz.c3 = "none";
    message = "";
    finish = false;
    io.sockets.emit("onValidateTurn", { matriz, message, finish });
  });
});

var validateTurn = function () {
  if (matriz.a1 === turn && matriz.a2 === turn && matriz.a3 === turn) {
    message = `Ganador jugador ${turn}`;
    finish = true;
  } else if (matriz.b1 === turn && matriz.b2 === turn && matriz.b3 === turn) {
    message = `Ganador jugador ${turn}`;
    finish = true;
  } else if (matriz.c1 === turn && matriz.c2 === turn && matriz.c3 === turn) {
    message = `Ganador jugador ${turn}`;
    finish = true;
  } else if (matriz.a1 === turn && matriz.b1 === turn && matriz.c1 === turn) {
    message = `Ganador jugador ${turn}`;
    finish = true;
  } else if (matriz.a2 === turn && matriz.b2 === turn && matriz.c2 === turn) {
    message = `Ganador jugador ${turn}`;
    finish = true;
  } else if (matriz.a3 === turn && matriz.b3 === turn && matriz.c3 === turn) {
    message = `Ganador jugador ${turn}`;
    finish = true;
  } else if (matriz.a1 === turn && matriz.b2 === turn && matriz.c3 === turn) {
    message = `Ganador jugador ${turn}`;
    finish = true;
  } else if (matriz.a3 === turn && matriz.b2 === turn && matriz.c1 === turn) {
    message = `Ganador jugador ${turn}`;
    finish = true;
  } else {
    message = "Continua el siguiente jugador";
  }
  return { message, finish };
};

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
