const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const errorMiddleware = require("./middlewares/error-middleware");

const app = express();
const ws = require("express-ws")(app);
const aWss = ws.getWss();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("public", express.static(path.resolve(__dirname, "client/public")));
app.use(fileUpload({}));
app.use(morgan());
app.use(require("./routes/index"));
app.use(errorMiddleware);

const server = mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server has been started on port ${process.env.PORT}`);
    });
    console.log("database connect");
  })
  .catch((e) => {
    console.log(e);
  });

app.ws("/", (ws, req, res) => {
  console.log("подкючение установлено");
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case "connection":
        connectionHandler(ws, msg);
        break;
      case "readMsg":
        readMsgHandler(ws,msg)
    }
  });
});

const broadCastHandler = (ws, msg) => {
  aWss.clients.forEach((client) => {
    if (client.id === msg.to) {
      client.send(JSON.stringify(msg));
    }
  });
};

const readMsgHandler = (ws, msg) => {
  aWss.clients.forEach((client) => {
    if (client.id === msg.to) {
      client.send(JSON.stringify(msg));
    }
  })
}
const connectionHandler = (ws, msg) => {
  ws.id = msg.id;
  ws.to = msg.to;
  ws.from = msg.from;
  broadCastHandler(ws, msg);
};
