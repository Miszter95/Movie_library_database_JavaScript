/*
Megjelen�ti (kirendereli) a felhaszn�l�nak a html oldalt.
*/

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository, viewName) {
    return function (req, res) {

       /* console.log(res.locals);
        console.log("\n\n");*/
        res.render(viewName);
    };
};