const path = require("path");
const express = require("express");
const fs = require("fs");

let notes = require("./db/db.json");
let note_id = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;

const app = express();
const PORT = process.env.PORT || 3000;
const NOTES_FILE = path.join(__dirname, "db/db.json");

app.use(
  express.static("public", {
    extensions: "html"
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", (req, res) => {
  // fs.readFile(NOTES_FILE, (err, data) => {
  //   if (err) {
  //     res.writeHead(500, { "Content-Type": "text/plain" });
  //     return res.end("Server Error: Something isn't right on the server.");
  //   }

  //   res.json(JSON.parse(data));
  // });
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = note_id++;
  notes.push(newNote);

  fs.writeFile(NOTES_FILE, JSON.stringify(notes), err => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      return res.end("Server error");
    }

    res.json(newNote);
  });
});

app.delete("/api/notes/:id", (req, res) => {
  notes = notes.filter(note => note.id !== parseInt(req.params.id));

  fs.writeFile(NOTES_FILE, JSON.stringify(notes), err => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      return res.end("Server error");
    }

    res.end();
  });
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
