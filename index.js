const express = require("express");

//ODM tool
const mongoose = require("mongoose");

const Article = require("./models/Article");

const app = express();
app.use(express.json());

// connected with dataBase
mongoose
  .connect(
    "mongodb+srv://eslam0:Esl01123@firstnodeprojectcluster.pyolnpx.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected successfully");
  })
  .catch((error) => {
    console.log(`error with connected db : ${error}`);
  });

app.get("/hello", (req, res) => {
  res.send("hello your server work");
});

app.post("/findSummation/:number1/:number2", (req, res) => {
  const num1 = req.params.number1;
  const num2 = req.params.number2;
  console.log(req.params);
  const sumNumbers = Number(num1) + Number(num2);
  res.send(`the sum of numbers = ${sumNumbers}`);
});

app.post("/sayHello", (req, res) => {
  //   res.send(`welcome ${req.body.name} is age ${req.query.age}`);
  res.json({
    name: req.body.name,
    age: req.query.age,
  });
});

app.post("/addArticle/:title/:body", async (req, res) => {
  const title = req.params.title;
  const body = req.params.body;

  const addArticle = new Article();

  addArticle.title = title;
  addArticle.body = body;
  addArticle.numberOfLikes = 0;

  try {
    await addArticle.save();
    res.send("add new article successfully");
  } catch (error) {
    res.send("error in time of save data : " + error);
  }
});

app.get("/getData", async (req, res) => {
  const id = req.params.articleId;
  try {
    const displayData = await Article.find();
    res.json(displayData);
  } catch (error) {
    res.send("error :" + error);
  }
});

app.get("/getData/:articleId", async (req, res) => {
  const id = req.params.articleId;

  try {
    const findItem = await Article.findById(id);
    res.json(findItem);
  } catch (error) {
    res.send("error :" + error);
  }
});

app.delete("/deleteArticle/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const deletedArticle = await Article.findByIdAndDelete(id);
    res.json(deletedArticle);
  } catch (error) {
    res.send("error :" + error);
  }
});

app.listen(3000, () => {
  console.log("i am listening in port 3000");
});
