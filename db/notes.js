const path = require("path");
const fs = require("fs");

const notes = require("./db.json");
let lastId = notes.length > 0 ? notes[notes.length - 1].id : 0;
const NOTES_FILE = path.join(__dirname, "db.json");

function getNotes() {
  return notes;
}

function addNote(note, cb) {
  note.id = ++lastId;
  notes.push(note);

  writeNotes(cb);
}

function deleteNote(id, cb) {
  const index = notes.findIndex(note => note.id === parseInt(id));
  if (index < 0) {
    return cb(new Error("Note not found"));
  }
  notes.splice(index, 1);

  writeNotes(cb);
}

function writeNotes(cb) {
  fs.writeFile(NOTES_FILE, JSON.stringify(notes), cb);
}

module.exports = {
  getNotes,
  addNote,
  deleteNote
};
