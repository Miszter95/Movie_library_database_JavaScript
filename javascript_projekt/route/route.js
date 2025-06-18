/*
A middlewarek elérési útvonalának megadása és betöltése constansokba.
*/

const authMw = require("../middlewares/authentication/auth");
const logoutMw = require("../middlewares/authentication/logout");
const getUserByUsername = require("../middlewares/authentication/getUserByUsername");
const checkUserLoginMw = require("../middlewares/authentication/checkUserLogin");
const regUserMw = require("../middlewares/authentication/regUser");
const checkPassMw = require("../middlewares/authentication/checkPass");
const savePassMw = require("../middlewares/authentication/savePass");
const renderMw = require("../middlewares/common/render");
const cimRendezMw = require("../middlewares/film/cimRendez");
const cscimRendezMw = require("../middlewares/film/cscimRendez");
const imdbpontRendezMw = require("../middlewares/film/imdbpontRendez");
const csimdbpontRendezMw = require("../middlewares/film/csimdbpontRendez");
const delFilmMw = require("../middlewares/film/delFilm");
const getFilmMw = require("../middlewares/film/getFilm");
const getFilmekMw = require("../middlewares/film/getFilmek");
const hosszRendezMw = require("../middlewares/film/hosszRendez");
const cshosszRendezMw = require("../middlewares/film/cshosszRendez");
const saveFilmMw = require("../middlewares/film/saveFilm");
const delSzemelyMw = require("../middlewares/szemely/delSzemely")
const getSzemelyMw = require("../middlewares/szemely/getSzemely")
const getSzemelyekMw = require("../middlewares/szemely/getSzemelyek")
const korRendezMw = require("../middlewares/szemely/korRendez")
const cskorRendezMw = require("../middlewares/szemely/cskorRendez")
const nevRendezMw = require("../middlewares/szemely/nevRendez")
const csnevRendezMw = require("../middlewares/szemely/csnevRendez")
const saveSzemelyMw = require("../middlewares/szemely/saveSzemely")

/*
Három model betöltése. (adatbázishoz)
*/

const SzemelyModel = require("../models/szemely");
const FilmModel = require("../models/film");
const UserModel = require("../models/user");

/*/
Routok föliratkoztatása.
*/

module.exports = function (app) {
    var objectRepository = {

        SzemelyModel : SzemelyModel,
        FilmModel: FilmModel,
        UserModel: UserModel
    };

    app.use("/szemelyek/uj",
        authMw(objectRepository),
        saveSzemelyMw(objectRepository),
        renderMw(objectRepository, "szemelyekszerkesztese"));

    app.use("/szemelyek/:szemelyid/szerkesztes",
        authMw(objectRepository),
        getSzemelyMw(objectRepository),
        saveSzemelyMw(objectRepository),
        renderMw(objectRepository, "szemelyekszerkesztese"));

    app.get("/szemelyek/:szemelyid/torles",
        authMw(objectRepository),
        getSzemelyMw(objectRepository),
        delSzemelyMw(objectRepository));

    app.use("/szemelyek/nevrendezett",
        authMw(objectRepository),
        nevRendezMw(objectRepository),
        renderMw(objectRepository, "szemelyeklistaja"));

    app.use("/szemelyek/csnevrendezett",
        authMw(objectRepository),
        csnevRendezMw(objectRepository),
        renderMw(objectRepository, "szemelyeklistaja"));

    app.use("/szemelyek/korrendezett",
        authMw(objectRepository),
        korRendezMw(objectRepository),
        renderMw(objectRepository, "szemelyeklistaja"));

    app.use("/szemelyek/cskorrendezett",
        authMw(objectRepository),
        cskorRendezMw(objectRepository),
        renderMw(objectRepository, "szemelyeklistaja"));

    app.use("/szemelyek",
        authMw(objectRepository),
        getSzemelyekMw(objectRepository),
        renderMw(objectRepository, "szemelyeklistaja"));

    app.use("/filmek/uj/:szemelyid",
        authMw(objectRepository),
        getSzemelyMw(objectRepository),
        saveFilmMw(objectRepository),
        renderMw(objectRepository, "filmekszerkesztese"));

    app.use("/filmek/:szemelyid/:filmid/szerkesztes",
        authMw(objectRepository),
        getSzemelyMw(objectRepository),
        getFilmMw(objectRepository),
        saveFilmMw(objectRepository),
        renderMw(objectRepository,"filmekszerkesztese"));

    app.get("/filmek/:szemelyid/:filmid/torles",
        authMw(objectRepository),
        getSzemelyMw(objectRepository),
        getFilmMw(objectRepository),
        delFilmMw(objectRepository));

    app.use("/filmek/:szemelyid/cimrendezett",
        authMw(objectRepository),
        getSzemelyMw(objectRepository),
        cimRendezMw(objectRepository),
        renderMw(objectRepository, "egyszemelyfilmjei"));

    app.use("/filmek/:szemelyid/cscimrendezett",
        authMw(objectRepository),
        getSzemelyMw(objectRepository),
        cscimRendezMw(objectRepository),
        renderMw(objectRepository, "egyszemelyfilmjei"));


    app.use("/filmek/:szemelyid/hosszrendezett",
        authMw(objectRepository),
        getSzemelyMw(objectRepository),
        hosszRendezMw(objectRepository),
        renderMw(objectRepository, "egyszemelyfilmjei"));

    app.use("/filmek/:szemelyid/cshosszrendezett",
        authMw(objectRepository),
        getSzemelyMw(objectRepository),
        cshosszRendezMw(objectRepository),
        renderMw(objectRepository, "egyszemelyfilmjei"));

    app.use("/filmek/:szemelyid/imdbpontrendezett",
        authMw(objectRepository),
        getSzemelyMw(objectRepository),
        imdbpontRendezMw(objectRepository),
        renderMw(objectRepository, "egyszemelyfilmjei"));

    app.use("/filmek/:szemelyid/csimdbpontrendezett",
        authMw(objectRepository),
        getSzemelyMw(objectRepository),
        csimdbpontRendezMw(objectRepository),
        renderMw(objectRepository, "egyszemelyfilmjei"));

    app.use("/filmek/:szemelyid",
        authMw(objectRepository),
        getSzemelyMw(objectRepository),
        getFilmekMw(objectRepository),
        renderMw(objectRepository, "egyszemelyfilmjei"));

    app.use("/regisztracio",
        regUserMw(objectRepository),
        renderMw(objectRepository, "regisztracio"));

    app.use("/jelszovalt",
        authMw(objectRepository),
        checkPassMw(objectRepository),
        savePassMw(objectRepository),
        renderMw(objectRepository, "jelszovalt"));

    app.use("/jelszoemlek",
        getUserByUsername(objectRepository),
        renderMw(objectRepository, "jelszoemlekezteto"));

    app.use("/kijelentkezes",
        logoutMw(objectRepository));

    app.use("/",
        checkUserLoginMw(objectRepository),
        renderMw(objectRepository, "index"));
};