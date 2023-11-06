const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");

const PORT = 8080;

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

const data = JSON.parse(fs.readFileSync("./data/video-details.json"));

app.post("/upload", (req, res) => {
  const newVideo = {
    title: req.body.title,
    description: req.body.description,
    thumbnail: req.body.thumbnail, // Use the 'thumbnail' field from the form
  };

  data.push(newVideo);

  fs.writeFileSync("./data/videos.json", JSON.stringify(data, null, 2));

  res.send("Video added successfully");
});

app.get("/videos/:id", (req, res) => {
  console.log("Requested ID:", req.params.id);

  const video = data.find((item) => {
    console.log(item.id === req.params.id);
    return String(item.id) === String(req.params.id);
  });
  if (video) {
    res.send(video);
  } else {
    res.status(404).send("Video not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/video", (req, res) => {
  console.log("video");
  const video = JSON.parse(fs.readFileSync("./data/videos.json"));

  res.send(video);
});
