const express = require("express");
const app = express();

app.use(express.json());

var users = [];

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/greet/:name", (req, res) => {
  res.send("Hello, " + req.params.name);
});

app.put("/user", (req, res) => {
  console.log(req.body);
  res.send("user created");
});

app.listen(3000, () => {
  console.log("servers is running");
});
/**
 *
 *
 */
