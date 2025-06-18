/*
Létrehoz egy új filmet vagy módosít egy már létezõ filmet az adatbázisban.
*/

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {

    const FilmModel = requireOption(objectrepository, propertyName = "FilmModel");

    return function (req, res, next) {

        if ((typeof req.body.cim === "undefined") || (typeof req.body.mufaj === "undefined") ||
            (typeof req.body.hossz === "undefined") || (typeof req.body.imdbpont === "undefined") ||
            (typeof res.locals.szemely === "undefined")) {
            return next();
        }

        if (typeof res.locals.film === "undefined") {
            res.locals.film = new FilmModel();
        }

        if (Number.isNaN(parseInt(req.body.hossz, radix = 10))) {
            res.locals.error = "A film hosszat szammal add meg!";
            return next();
        }

        if (Number.isNaN(parseFloat(req.body.imdbpont, radix = 10))) {
            res.locals.errorajanl = "A film IMDB pontjat szammal add meg!";
            return next();
        }

        res.locals.film.cim = req.body.cim;
        res.locals.film.mufaj = req.body.mufaj;
        res.locals.film.hossz = parseInt(req.body.hossz, radix = 10);
        res.locals.film.imdbpont = parseFloat(req.body.imdbpont, radix = 10);
        res.locals.film._filmnezo = res.locals.szemely._id;

        res.locals.film.save((err) => {
            if (err) {
                return next(err);
            }

            return res.redirect("/filmek/"+ res.locals.szemely._id);
        });
    };
};