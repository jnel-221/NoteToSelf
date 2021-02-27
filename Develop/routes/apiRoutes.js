//require fs to read db.json, parse and store to variable
const fs = require("fs");

let rawdata = fs.readFileSync("./db/db.json");
let notes = JSON.parse(rawdata);

console.log(notes);
//  * GET `/api/notes` - Should read the `db.json` file and return all saved notes
module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.json(notes);
  });

  //   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
  app.post("/api/notes", function (req, res) {
    //receive new note to save on request body. ==> add a unique id to each new note.

    //add to the db.json file

    //return new note to client
    // res.send("this will add stuff to things");
    console.log("does it still work?");
  });

  //   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
  app.delete("/api/notes", function (req, res) {
    console.log("Do you really want to delete this?");
  });
};
