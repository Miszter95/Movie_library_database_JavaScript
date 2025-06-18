/*
Szemely model l�trehoz�sa az adatb�zishoz.
 */

const Schema = require("mongoose").Schema;
const db = require("../config/db");

const Szemely = db.model("Szemely", {
    nev: String,
    kor: Number,
    becenev: String,
    nem: String,
});

module.exports = Szemely;