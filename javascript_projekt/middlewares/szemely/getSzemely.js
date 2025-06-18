/*
Lekérdez egy személyt az adatbázisból.
*/

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {

    const SzemelyModel = requireOption(objectrepository, propertyName = "SzemelyModel");

    return function (req, res, next) {

        SzemelyModel.findOne({_id: req.params.szemelyid}, (err, szemely) => {
            if (err || !szemely) {
                return next(err);
            }

            res.locals.szemely = szemely;
            return next();
        });
    };
};