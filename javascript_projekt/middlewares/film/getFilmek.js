/*
Lekérdezi a filmeket az adatbázisból.
*/

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {

    const FilmModel = requireOption(objectrepository, propertyName= "FilmModel");

    return function (req, res, next) {

        if (typeof res.locals.szemely === "undefined") {
            return next();
        }

        FilmModel.find({_filmnezo: res.locals.szemely._id}, (err, filmek) => {
            if (err) {
                return next(err);
            }

            res.locals.filmek = filmek;
            return next();
        });
    };
};