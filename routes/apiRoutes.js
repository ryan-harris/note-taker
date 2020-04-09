const notes = require("../db/notes");

module.exports = app => {
  app.get("/api/notes", (req, res) => {
    res.json(notes.getNotes());
  });

  app.post("/api/notes", (req, res) => {
    notes.addNote(req.body, err => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("Server error");
      }

      res.json(req.body);
    });
  });

  app.delete("/api/notes/:id", (req, res) => {
    notes.deleteNote(req.params.id, err => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("Server error");
      }

      res.end();
    });
  });
};
