/*
Létrehoz egy új felhasználót (email cím és jelszó).
*/

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, propertyName = "UserModel");

    return function (req, res, next) {

        if ((typeof req.body.username === "undefined") || (typeof req.body.password === "undefined")) {
            return next();
        }

        UserModel.findOne({ username: req.body.username }, (err, user) => {
            if (err || user) {
                res.locals.errorreg = "Mar letezik ez a felhasznalonev!";
                return next();
            }

            if (req.body.password !== req.body.passwordagain) {
                res.locals.errorpass = "Az ismetelt jelszo nem egyezik meg a jelszoval!";
                return next();
            }

            res.locals.user = new UserModel();
            res.locals.user.username = req.body.username;
            res.locals.user.password = req.body.password;

            res.locals.user.save((err) => {
                if (err) {
                    return next(err);
                }

                console.log("user mentve");
                return res.redirect("/");
            });
        });
    };
};