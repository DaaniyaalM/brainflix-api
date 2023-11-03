const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");

const PORT = 8080;

//Middleware
//-----------------------------
app.use(express.json());
app.use(express.static("public/images"));
app.use(cors());

//Getting quotes

app.get("/", (_req, res) => {
  const quotes = JSON.parse(fs.readFileSync("./data/video-details.json"));
  res.send(quotes[Math.floor(Math.random() * quotes.length)]);
});

app.post("/", (req, res) => {
  const quotes = JSON.parse(fs.readFileSync("./data/quotes.json"));

  const newQuote = {
    q: req.body.q,
    a: req.body.a,
    c: "randomnumebr",
    h: "randomblockquote",
  };

  quotes.push(newQuote);
  fs.writeFileSync("./data/quotes.json", JSON.stringify(quotes));
  res.send("made it to server");
  // console.log(newQuote);
});

//get quotes by author

app.get("/:author", (req, res) => {
  const quotes = JSON.parse(fs.readFileSync("./data/quotes.json"));
  const foundQuote = quotes.find((quote) => quote.a === req.params.author);
  if (foundQuote) {
    res.send(foundQuote);
  } else {
    res.status(400).send("quote not found");
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
