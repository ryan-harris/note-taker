const path = require("path");
const express = require("express");
const fs = require("fs");

const NOTES_FILE = path.join(__dirname, "db", "db.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  express.static("public", {
    extensions: "html"
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", (req, res) => {
  fs.readFile(NOTES_FILE, (err, data) => {
    if (err) throw err;

    res.json(JSON.parse(data));
  });
});

app.post("/api/notes", (req, res) => {
  // add new note
});

app.delete("/api/notes/:id", (req, res) => {
  // delete note id
  console.log(`Deleting note ${req.param.id}`);
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
