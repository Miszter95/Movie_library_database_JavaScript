/*
Hossz (percben) szerint rendezi a filmeket.
*/

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {

    const FilmModel = requireOption(objectrepository, propertyName = "FilmModel");

    return function (req, res, next) {

        FilmModel.find({ _filmnezo: res.locals.szemely._id }).sort([["hossz", 1]]).exec(function (err, filmek) {
            if (err) {
                return next(err);
            }

            res.locals.filmek = filmek;
            return next();

        });
    };

};