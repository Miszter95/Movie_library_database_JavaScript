/*
Az adatb�zisb�l kikeresi a megadott felhaszn�l�nev� szem�lyt �s a jelszav�t kiteszi konzolra.
 */

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, propertyName = "UserModel");

    return function (req, res, next) {

        if (typeof req.body.username === "undefined") {
            return next();
        }

        UserModel.findOne({ username: req.body.username }, (err, user) => {
            if (err || !user) {
                res.locals.error = "Nem letezik ilyen felhasznalo!";
                return next(err);
            }

            res.locals.user = user;
            console.log(res.locals.user.password);
            return res.redirect("/");

        });
    };
};

/*
console.log(res.locals.user.password);
return res.redirect("/");
*/
