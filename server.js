require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://krishnasahithisandhya:sahithi123@ac-rlmyvg6-shard-00-00.r7tm7my.mongodb.net:27017,ac-rlmyvg6-shard-00-01.r7tm7my.mongodb.net:27017,ac-rlmyvg6-shard-00-02.r7tm7my.mongodb.net:27017/mydb?ssl=true&replicaSet=atlas-jme1bi-shard-0&authSource=admin&retryWrites=true&w=majority")
.then(() => console.log("Atlas Connected"))
.catch(err => console.log(err));
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String
});

const Product = mongoose.model("Product", productSchema);
app.post("/addProduct", async (req, res) => {
  try {
    const data = req.body;
    const newProduct = new Product(data);
    await newProduct.save();
    res.send("Product added successfully");
  } catch (err) {
    res.send(err.message);
  }
});
app.get("/getProducts", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.send(err.message);
  }
});


app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});