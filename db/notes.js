const path = require("path");
const fs = require("fs");

let notes = require("./db.json");
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
  notes = notes.filter(note => note.id !== parseInt(id));

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
