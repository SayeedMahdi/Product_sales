//Required files
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { errorHandler } = require("./middleware/errorHandler");
const routes = require("./routes");
//middle wares
require("dotenv").config();
app.use(express.json());
//middle error handler

//make routes 
app.use("/api/v1",routes)
app.use(errorHandler);





//environment variables
const port = process.env.PORT;
const MongoURL = process.env.URl;

//Start functions
const start = async () => {
  try {
    const connection = await mongoose.connect(MongoURL);
    if (connection) {
      app.listen(port, console.log(`app is listen on port ${port}`));
    }
  } catch (err) {
    throw new Error(`some thing went wrong err.message`);
  }
};
start();
