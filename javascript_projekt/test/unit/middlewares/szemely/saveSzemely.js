var expect = require("chai").expect;
var saveSzemely = require("../../../../middlewares/szemely/saveSzemely");

describe('saveSzemely middleware ', function () {

    it("should set res.locals.film with a film object from db", function (done) {
        const mw = saveSzemely(objectrepository = {
            SzemelyModel: "nah"
        });

        mw(
            {
                body: {
                    nev: "Ferenc",
                    kor: "15",
                    becenev: "Feri",
                    nem: "ferfi"
                },
                params: {
                    szemelyid: "15"
                }
            },
            {
                    locals: {
                        szemely: {
                            save: (cb) => {
                                cb(null);
                            }
                        }
                    },
                redirect: where => {
                    expect(where).to.be.eql("/szemelyek");
                    done();
                }
            },
            err => {
                //nem hív nextet
            }
        );

    });
    it("should call next with err if there is a db error", function (done) {
        const mw = saveSzemely(objectrepository = {
            SzemelyModel: "nah"
        });

        mw(
            {
                body: {
                    nev: "Ferenc",
                    kor: "15",
                    becenev: "Feri",
                    nem: "ferfi"
                },
                params: {
                    szemelyid: "15"
                }
            },
            {
                locals: {
                    szemely: {
                        save: (cb) => {
                            cb("adatbazishiba");
                        }
                    }
                },
                redirect: where => {
                }
            },
            err => {
                expect(err).to.be.eql("adatbazishiba");
                done();
            }
        );

    });
    it("should call next with num error on  kor", function (done) {
        const mw = saveSzemely(objectrepository = {
            SzemelyModel: "nah"
        });

        mw(
            {
                body: {
                    nev: "Ferenc",
                    kor: "nem",
                    becenev: "Feri",
                    nem: "ferfi"
                },
                params: {
                    szemelyid: "15"
                }
            },
            {
                locals: {
                    error: "A szemely korat szammal add meg!",
                    szemely: {
                        save: (cb) => {
                            cb(null);
                        }
                    }
                },
                redirect: where => {
                }
            },
            error => {
                expect(error).to.be.eql("A szemely korat szammal add meg!");
                done();
            }
        );

    });
    it("should set res.locals.szemely with a film object created by the MW", function (done) {
        class SzemelyMockModel {
            save(cb) {
                cb(null);
            }
        }

        const mw = saveSzemely(objectrepository = {
            SzemelyModel: SzemelyMockModel
        });

        mw(
            {
                body: {
                    nev: "Ferenc",
                    kor: "24",
                    becenev: "Feri",
                    nem: "ferfi"
                },
                params: {
                    szemelyid: "15"
                }
            },
            {
                locals: {
                },
                redirect: where => {
                    expect(where).to.be.eql("/szemelyek");
                    done();
                }
            },
            err => {
                // nem hív nextet
            }
        );

    });
    it("should call next with where is no req.body.nev", function (done) {
        const mw = saveSzemely(objectrepository = {
            SzemelyModel: "nah"
        });

        mw(
            {
                body: {
                    nev: undefined,
                    kor: "15",
                    becenev: "Feri",
                    nem: "ferfi"
                },  
                params: {
                    szemelyid: "15"
                }
            },
            {
                locals: {
                    szemely: {
                        save: (cb) => {
                            cb(null);
                        }
                    }
                },
                redirect: where => {   
                }
            },
            nev => {
                expect(nev).to.be.eql(undefined); 
                done();
            }
        );

    });
    it("should call next with where is no req.body.kor", function (done) {
        const mw = saveSzemely(objectrepository = {
            SzemelyModel: "nah"
        });

        mw(
            {
                body: {
                    nev: "Ferenc",
                    kor: undefined,
                    becenev: "Feri",
                    nem: "ferfi"
                },
                params: {
                    szemelyid: "15"
                }
            },
            {
                locals: {
                    szemely: {
                        save: (cb) => {
                            cb(null);
                        }
                    }
                },
                redirect: where => {
                }
            },
            kor => {
                expect(kor).to.be.eql(undefined);
                done();
            }
        );

    });
    it("should call next with where is no req.body.becenev", function (done) {
        const mw = saveSzemely(objectrepository = {
            SzemelyModel: "nah"
        });

        mw(
            {
                body: {
                    nev: "Ferenc",
                    kor: "15",
                    becenev: undefined,
                    nem: "ferfi"
                },
                params: {
                    szemelyid: "15"
                }
            },
            {
                locals: {
                    szemely: {
                        save: (cb) => {
                            cb(null);
                        }
                    }
                },
                redirect: where => {
                }
            },
            becenev => {
                expect(becenev).to.be.eql(undefined);
                done();
            }
        );

    });
    it("should call next with where is no req.body.nev", function (done) {
        const mw = saveSzemely(objectrepository = {
            SzemelyModel: "nah"
        });

        mw(
            {
                body: {
                    nev: "Ferenc",
                    kor: "15",
                    becenev: "Feri",
                    nem: undefined
                },
                params: {
                    szemelyid: "15"
                }
            },
            {
                locals: {
                    szemely: {
                        save: (cb) => {
                            cb(null);
                        }
                    }
                },
                redirect: where => {
                }
            },
            nem => {
                expect(nem).to.be.eql(undefined);
                done();
            }
        );

    });
});