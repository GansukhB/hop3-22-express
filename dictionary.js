const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

var dictionary = {
  apple: "Алим",
  mouse: "Хулгана",
  hello: "Сайн уу?",
};

app.post("/add_word", (req, res) => {
  dictionary = {
    ...dictionary,
    ...req.body,
  };
  res.send({
    message: "Added new words",
  });
});

app.put("/edit_word", (req, res) => {
  for (const [key, value] of Object.entries(req.body)) {
    dictionary[key] = value;
  }
  console.log(dictionary);
  res.send({
    message: "Updated dictionary words",
  });
});

app.delete("/delete_word", (req, res) => {
  for (let key in req.body) {
    delete dictionary[req.body[key]];
  }
  console.log(dictionary);
  res.send({
    message: "Delete dictionary words",
  });
});

app.get("/:search_word", (req, res) => {
  const word = req.params.search_word.toLowerCase();
  if (dictionary.hasOwnProperty(word)) {
    res.send({
      translation: dictionary[word],
    });
    return;
  }
  res.send({
    message: "Word not found",
  });
});

app.listen(port, () => {
  console.log("servers is running");
});
