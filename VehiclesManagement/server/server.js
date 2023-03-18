const app = require("express")();
const http = require("http").Server(app);
const morgan = require("morgan");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require('fs');
const path = require("path");

const config = require('./config/config');

// make directory
var dir = './uploads'
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

const authRoute = require('./routes/auth/auth');
const checkAuthRoute = require('./routes/checkAuthentication/checkAutentication');
const addNewMessageRoute = require('./routes/adding/new-Message');
const editMessageRoute = require('./routes/adding/edit-Message');

const addSendereRoute = require('./routes/senders/add-sender');
const getSenderesRoute = require('./routes/senders/get-senders');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.use('/check-is-auth', checkAuthRoute);
app.use("/auth", authRoute);
app.use('/new-message', addNewMessageRoute);
app.use('/edit-message', editMessageRoute);
app.use('/add-sender', addSendereRoute);
app.use('/get-senders', getSenderesRoute);

const express = require("express");
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.resolve("uploads")));
app.use("/profile-image/", express.static("./uploads"));

mongoose.Promise = global.Promise;
const ConnectionUri = config.db;
mongoose.connect(ConnectionUri, (err) => {
  if (err) {
    console.log("Error in connecting to Mongo DB !!");
    throw err;
  }
  console.log("successfully connected to database ..");
});


const port = config.port || 8000 ||  process.env.PORT;
http.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`server running on port ${port}`);
  }
});