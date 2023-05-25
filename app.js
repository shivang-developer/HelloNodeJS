require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
var bodyParser = require("body-parser");

const PORT = process.env.PORT || 5002;
const products_routes = require("./routes/products");
var jsonParser = bodyParser.json(); // create application/json parser

app.get("/", (req, res) => {
  res.send("Hi i am live");
});
// middleware or to set router
app.use("/api/products", jsonParser, products_routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`${PORT} Yes i am connected`);
    });
  } catch (error) {
    console.log("Error in catch blockh");
    console.log(error);
  }
};

start();
