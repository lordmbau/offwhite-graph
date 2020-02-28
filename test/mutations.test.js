// Import the dependencies for testing
import chai from "chai"
import chaiHttp from "chai-http"
var rimraf = require("rimraf")
import app from "../src/server"

// Configure chai
chai.use(chaiHttp)
chai.should()
var expect = chai.expect

const sharedInfo = {}

rimraf(".tmp/localDiskDb/*", () => {
  console.log("  Cleared setup dir")
})

describe("Setup", () => {
  before(function (done) {
    this.timeout(4000) // wait for db connections etc.

    setTimeout(done, 4000)
  });

  describe("OPS", function () {
    it("Health check should return 200", done => {
      chai
        .request(app)
        .get("/health")
        .end((err, res) => {
          res.should.have.status(200);

          done();
        });
    });
  });
});

describe("Hello", () => {
  it("Should say hello", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `{
          hello
        }`
      })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.not.be.null;
        expect(res.body.errors).to.not.exist;
        expect(res.body.data.hello).to.be.a.string;
        expect(res.body.data.hello).to.equals("Hello, world")

        done()
      })
  })
})

describe("Airplanes", () => {
  it("Should create an airplane", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `
          mutation ($airplane: Iairplane!) {
            airplanes {
              create(airplane: $airplane) {
                id
              }
            }
          }            
        `,
        variables: {
          airplane: {
            fleet: "bombardier",
            reg_no: "5y-cya"
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.not.be.null;
        expect(res.body.errors).to.not.exist;
        expect(res.body.data.airplanes.create.id).to.be.a.string;

        sharedInfo.airplaneId = res.body.data.airplanes.create.id;
        done();
      });
  });

  it("Should update an airplane", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `
          mutation ($airplane: Uairplane!) {
            airplanes {
              update(airplane: $airplane) {
                id
              }
            }
          }            
        `,
        variables: {
          airplane: {
            id: sharedInfo.airplaneId,
            reg_no: "5y-cyb",
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.not.be.null;
        expect(res.body.errors).to.not.exist;
        expect(res.body.data.airplanes.update.id).to.be.a.string;
        done();
      });
  });

  it("Should fetch airplane", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `
        {
          airplanes{
            id
          }
        }        
        `
      })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.not.be.null;
        expect(res.body.errors).to.not.exist;
        expect(res.body.data.airplanes[0].id).to.be.a.string;

        done();
      });
  });
});
