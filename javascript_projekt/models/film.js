/*
Film model l�trehoz�sa az adatb�zishoz �s kapcsolat l�trehoz�sa Szemely �s Film (egy - t�bb) k�z�tt.
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