/*
Kor szerint rendezi a személyeket csökennõ sorrendben.
*/

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {

    const SzemelyModel = requireOption(objectrepository, propertyName = "SzemelyModel");

    return function (req, res, next) {

        SzemelyModel.find({}).sort([["kor", -1]]).exec(function (err, szemelyek) {
            if (err) {
                return next(err);
            }

            res.locals.szemelyek = szemelyek;
            return next();

        });
    };

};
