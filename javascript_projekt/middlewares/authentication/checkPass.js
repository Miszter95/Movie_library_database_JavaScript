/*
Ellenõrzi a felhasználó által megadott jelszó helyességét.
*/

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, propertyName = "UserModel");

    return function (req, res, next) {

        if ((typeof req.body.password === "undefined") || (typeof req.body.newpassword === "undefined") ||
            (typeof req.body.newpasswordagain === "undefined") || (typeof req.session.password === "undefined")) {
            return next();
        }

        if (req.session.password !== req.body.password) {
            res.locals.error = "Rossz jelszo!";
            return next();
        }

        UserModel.findOne({ password: req.body.password }, (err, user) => {
            if (err || !user) {
                return next(err);
            }

            res.locals.user = user;
            return next();

        });
    };
};