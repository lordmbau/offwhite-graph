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
let authorization = null

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