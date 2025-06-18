const express = require("express");
const app = express();

/*
A bodyParser létrehozása.
*/

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

/*
Betöltjük az ejs motort. 
*/

app.set('view engine', 'ejs');

//app.use(express.static('static'));

/*
 Express-session betöltése és létrehozása.
*/

const session = require("express-session");
app.use(session({
    secret: "supersecret"
}));

/*
Betöltjük a routingért felelõs fájlt.
*/

require("./route/route")(app);


app.use((req, res, next, err) => {
    console.log(err);
});

app.listen(3000 , function () {
    console.log("On: 3000");
});