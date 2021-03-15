//require fs, data file, and path
const fs = require("fs");
const notes = require("../db/db.json");
const path = require("path");
const { v4: uuidv4 } = require("uuid");


//the routes are functional, however there is a bug which causes data to persist in the front end after it is deleted from the backend.  I have left the console logs while I'm continuing to resolve, but but is not resolved at the time I've turned in the assignment.
module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    console.log("get request pulls db notes doc", notes);
    res.json(notes);
  });

  app.post("/api/notes", function (req, res) {
    let newNote = req.body;

    newNote.id = uuidv4();

    if (notes) {
      notes.push(newNote);
    } else {
      notes = [newNote];
    }

    let allNotes = JSON.stringify(notes);

    let postPath = path.join(__dirname, "../db/db.json");

    fs.writeFileSync(postPath, allNotes, (err) => {
      if (err) {
        throw err;
      }
    });

    console.log("post response ", allNotes);
    res.json(newNote);
  });

  app.delete("/api/notes/:id", function (req, res) {
    const noteId = req.params.id;

    let myNotes = notes.filter((note) => note.id != noteId);

    console.log("deleted note removed ", myNotes);
    let saveRemainingNotes = JSON.stringify(myNotes);
    let postPath = path.join(__dirname, "../db/db.json");

    console.log("here's what's being sent to writefile ", saveRemainingNotes);
    fs.writeFile(postPath, saveRemainingNotes, (err) => {
      if (err) {
        throw err;
      }
    });
    res.send(req.body);
  });
};
