/*
Adatb�zishoz bek�t�se a programba. 
*/

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/kqsvoo", { useNewUrlParser: true, useUnifiedTopology: true, });

module.exports = mongoose;