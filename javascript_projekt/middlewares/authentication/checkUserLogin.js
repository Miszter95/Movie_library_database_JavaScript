/*
Ellenõrzi a felhasználó által megadott email és jelszó helyességét.
*/
/*
const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {

    return function (req, res, next) {

        if ((typeof req.body.username === "undefined") && (typeof req.body.password === "undefined")) {
            return next();
        }

        if ((req.body.username === "Miszter") && (req.body.password === "kutya")) {
            req.session.bent = true;
            return req.session.save((err) => {
                return res.redirect("/szemelyek");
                })
        }     
            res.locals.error = "Hibas felhasznalonev vagy jelszo!";
            return next();
    };

};*/

/*
Ellenõrzi a felhasználó által megadott email és jelszó helyességét.
*/

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, propertyName = "UserModel");

    return function (req, res, next) {

        if ((typeof req.body.username === "undefined") && (typeof req.body.password === "undefined")) {
            return next();
        }

        UserModel.findOne({ username: req.body.username }, (err, user) => {
            if ((err) || (!user)) {
                res.locals.error = "Rossz felhasznalonev!";
                return next();
            }

            if (user.password !== req.body.password) {
                res.locals.error = "Rossz jelszo!";
                return next();
            }

            req.session.username = req.body.username;
            req.session.password = req.body.password;

            req.session.bent = true;
            return req.session.save((err) => {
                return res.redirect("/szemelyek");
            })
        });
    };

};