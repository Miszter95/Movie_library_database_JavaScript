/*
Lek�rdez egy filmet az adatb�zisb�l.
*/

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {

    const FilmModel = requireOption(objectrepository, propertyName = "FilmModel");

    return function (req, res, next) {

        FilmModel.findOne({ _id: req.params.filmid }, (err, film) => {
            if (err || !film) {
                return next(err);
            }

            res.locals.film = film;
            return next();
        });
    };
};