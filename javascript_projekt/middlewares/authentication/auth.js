/*
Ha a felhaszn�l� nincs bejelentkezve, akkor �tir�nyitjuk a bejelentkez�s oldalra.
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