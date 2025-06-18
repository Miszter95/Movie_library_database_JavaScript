/*
Létrehoz egy új személyt vagy módosít egy már létezõ személyt az adatbázisban.
*/

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {

    const SzemelyModel = requireOption(objectrepository, propertyName = "SzemelyModel");

    return function (req, res, next) {

        if ((typeof req.body.nev === "undefined") || (typeof req.body.kor === "undefined") ||
            (typeof req.body.becenev === "undefined") || (typeof req.body.nem === "undefined")) {
            return next();
        }

        if (typeof res.locals.szemely === "undefined") {
            res.locals.szemely = new SzemelyModel();
        }

        if (Number.isNaN(parseInt(req.body.kor, radix = 10))) {   
            res.locals.error = "A szemely korat szammal add meg!";
            return next();
        }

        res.locals.szemely.nev = req.body.nev;
        res.locals.szemely.kor = parseInt(req.body.kor, radix= 10);
        res.locals.szemely.becenev = req.body.becenev;
        res.locals.szemely.nem = req.body.nem;

        res.locals.szemely.save((err) => {
            if (err) {
                return next(err);
            }
            return res.redirect("/szemelyek");
        });
    };

};