const express = require("express");
require('dotenv').config();
const path = require('path');
const mongoose = require("mongoose");

const app = express();

// connection to mongodb
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// routes
app.use(require("./routes/index"))
app.use(require("./routes/todo"))


// server configurations....
const port = process.env.PORT || 3000 ;
app.listen(port, () => console.log(`Server started listening on port: ${port}`));
