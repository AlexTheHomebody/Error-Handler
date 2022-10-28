const app = require('../app')
const chai = require('chai')
const expect = chai.expect

chai.use(require('chai-http'))

describe('error handling', function () {
  it('should return a JSON message when a route is not found', function (done) {
    chai.request(app)
      .get('/doesnotexist')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        expect(res.body).to.be.an('object')
        expect(res.body.error).to.be.an('object')
        expect(res.body.error.message).to.be.ok
        done()
      })
  })

  it('should return a JSON message when an error is thrown in the application', function (done) {
    chai.request(app)
      .get('/boom')
      .end((err, res) => {
        expect(res.status).to.equal(500)
        expect(res.body).to.be.an('object')
        expect(res.body.error).to.be.an('object')
        expect(res.body.error.status).to.equal(500)
        expect(res.body.error.message).to.be.ok
        done()
      })
  })
})
