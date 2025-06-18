const express = require("express");
const app = express();

/*
A bodyParser l�trehoz�sa.
*/

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

/*
Bet�ltj�k az ejs motort. 
*/

app.set('view engine', 'ejs');

//app.use(express.static('static'));

/*
 Express-session bet�lt�se �s l�trehoz�sa.
*/

const session = require("express-session");
app.use(session({
    secret: "supersecret"
}));

/*
Bet�ltj�k a routing�rt felel�s f�jlt.
*/

require("./route/route")(app);


app.use((req, res, next, err) => {
    console.log(err);
});

app.listen(3000 , function () {
    console.log("On: 3000");
});