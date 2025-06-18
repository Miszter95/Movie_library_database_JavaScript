/*
A jelszócserekor elmenti a felhasználó által megadott új jelszót.
*/

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, propertyName = "UserModel");

    return function (req, res, next) {

        if ((typeof req.body.password === "undefined") || (typeof req.body.newpassword === "undefined") ||
            (typeof req.body.newpasswordagain === "undefined")) {
            return next();
        }

        if (req.body.newpassword !== req.body.newpasswordagain) {
            res.locals.error = "Az ismetelt uj jelszo nem egyezik meg az uj jelszoval!";
            return next();
        }

        UserModel.findOne({ password: req.body.password }, (err, user) => {
            if (err || !user) {
                return next(err);
            }

            res.locals.user.password = req.body.newpassword;

            res.locals.user.save((err) => {
                if (err) {
                    return next(err);
                }
                return res.redirect("/szemelyek");
            });

        });

    };
 };