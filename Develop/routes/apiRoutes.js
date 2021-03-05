//require fs, data file, and path
const fs = require("fs");
const notes = require("../db/db.json");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

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

    console.log("addNoteId array shld have id#'s", notes);

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
    // fs.readFile(notes,"utf8", (err,data)=>{
    //   if(err) throw err;

    //   notesToSelf = JSON.parse(data)

    // })

    const noteId = req.params.id;

    let myNotes = notes.filter((note) => note.id != noteId);

    console.log("last array ", myNotes);
    let saveRemainingNotes = JSON.stringify(myNotes);
    let postPath = path.join(__dirname, "../db/db.json");

    fs.writeFile(postPath, saveRemainingNotes, (err) => {
      if (err) {
        throw err;
      }
    });
    res.send(true);
  });
};
