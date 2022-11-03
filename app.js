const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

var users = [];

app.get("/", (req, res) => {
  res.send({
    translation: "orchuulga",
  });
});

app.get("/greet/:name", (req, res) => {
  res.send("Hello, " + req.params.name);
});

app.post("/user", (req, res) => {
  users.push(req.body);
  console.log(users);
  res.send("user created");
});

app.put("/user", (req, res) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === req.body.email) {
      users[i].name = req.body.name;
      users[i].password = req.body.password;
      break;
    }
  }
  console.log(users);
  res.send("user updated");
});

app.listen(3001, () => {
  console.log("servers is running");
});
/**
 *
 *
 */
