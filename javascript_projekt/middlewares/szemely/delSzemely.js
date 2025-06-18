/*
Kitöröl egy személyt az adatbázisból.
*/

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {

    return function (req, res, next) {

        if (typeof res.locals.szemely === "undefined") {
            return next();
        }

        res.locals.szemely.remove((err) => {
            if (err) {
                return next(err);
            }
            return res.redirect("/szemelyek");
        });
    };
};