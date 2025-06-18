/*
Kijelentkezéskor játszik szerepet.
*/

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {

    return function (req, res, next) {
    req.session.destroy((err) => {
        res.redirect("/");
    });
    };
};