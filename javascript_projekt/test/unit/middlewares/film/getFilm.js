var expect = require("chai").expect;
var getFilm = require("../../../../middlewares/film/getFilm");

describe('getFilm middleware ', function () {

    it("should set res.locals.film with a film object from db", function (done)  {
        const mw = getFilm(objectrepository = {
            FilmModel: {
                findOne: (x1, cb) => {
                    expect(x1).to.be.eql({ _id: "15"  });
                    cb(null, "mockfilm");
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw({
            params: {
                filmid: "15"
            }
        },
            resMock,
            (err) => {
                expect(err).to.be.eql(undefined);
                expect(resMock.locals).to.be.eql({ film: "mockfilm" });
                done();
        });
    });
    it("should call next with error when there is a db problem", function (done) {
        const mw = getFilm(objectrepository = {
            FilmModel: {
                findOne: (x1, cb) => {
                    expect(x1).to.be.eql({ _id: "15" });
                    cb("adatbazishiba", null);
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw({
            params: {
                filmid: "15"
            }
        },
            resMock,
            (err) => {
                expect(err).to.be.eql("adatbazishiba");
                done();
            });
    });
    it("should call next when no befott found in the db", function (done) {
        const mw = getFilm(objectrepository = {
            FilmModel: {
                findOne: (x1, cb) => {
                    expect(x1).to.be.eql({ _id: "15" });
                    cb(undefined,null);
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw({
            params: {
                filmid: "15"
            }
        },
            resMock,
            (err) => {
                expect(err).to.be.eql(undefined);
                expect(resMock.locals).to.be.eql({});
                done();
            });
    });
});