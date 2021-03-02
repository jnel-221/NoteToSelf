//require fs, data file, and path
const fs = require("fs");
const notes = require("../db/db.json");
const path = require("path");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.json(notes);
  });

  app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    notes.push(newNote);

    let addNoteId = notes.map((note, index) => ({ id: index + 1, ...note }));
    console.log(addNoteId);

    let allNotes = JSON.stringify(addNoteId);

    let postPath = path.join(__dirname, "../db/db.json");

    fs.writeFile(postPath, allNotes, (err) => {
      if (err) {
        throw err;
      }
    });

    res.json(addNoteId.pop());
  });

  app.delete("/api/notes/:id", function (req, res) {
    const noteId = parseInt(req.params.id);

    let myNotes = notes.filter((note) => note.id !== noteId);

    myNotes.forEach((note) => delete note.id);

    let newId = myNotes.map((note, index) => ({ id: index + 1, ...note }));

    let saveRemainingNotes = JSON.stringify(newId);
    let postPath = path.join(__dirname, "../db/db.json");
    fs.writeFile(postPath, saveRemainingNotes, (err) => {
      if (err) {
        throw err;
      }
    });
    res.json(saveRemainingNotes);
  });
};
