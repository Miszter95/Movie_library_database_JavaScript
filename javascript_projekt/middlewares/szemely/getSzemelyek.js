/*
Lekérdezi a személyeket az adatbázisból.
*/

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {

    const SzemelyModel = requireOption(objectrepository, propertyName = "SzemelyModel");

    return function (req, res, next) {
        SzemelyModel.find({}, (err, szemelyek) => {
            if (err) {
                return next(err);
            }

            res.locals.szemelyek = szemelyek;
            return next();
        });
    };

};