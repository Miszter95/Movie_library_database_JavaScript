/*
Film model létrehozása az adatbázishoz és kapcsolat létrehozása Szemely és Film (egy - több) között.
 */

const Schema = require("mongoose").Schema;
const db = require("../config/db");


const Film = db.model("Film", {
    cim: String,
    mufaj: String,
    hossz: Number,
    imdbpont: Number,

    _filmnezo: {
        type: Schema.Types.ObjectId,
        ref: "Szemely"
    }
});

module.exports = Film;