/*
Ha a felhasználó nincs bejelentkezve, akkor átirányitjuk a bejelentkezés oldalra.
*/

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (typeof req.session.bent === "undefined" || req.session.bent !== true) {
            return res.redirect("/");
        }
        return next();
    };

};