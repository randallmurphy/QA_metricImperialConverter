const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  suite('Routing Tests', function () {
    suite('GET /api/convert => conversion object', function () {
      test('Convert 10L (valid input)', function (done) {
        chai
          .request(server)
          .get('/api/convert')
          .query({ input: '10L' })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 10);
            assert.equal(res.body.initUnit, 'L');
            assert.approximately(res.body.returnNum, 2.64172, 0.1);
            assert.equal(res.body.returnUnit, 'gal');
            done();
          });
      });

      test('Convert 32g (invalid input unit)', function (done) {
        chai
          .request(server)
          .get('/api/convert')
          .query({ input: '32g' })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'invalid unit');
            done();
          });
      });

      test('Convert 3/7.2/4kg (invalid number)', function (done) {
        chai
          .request(server)
          .get('/api/convert')
          .query({ input: '3/7.2/4kg' })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'invalid number');
            done();
          });
      });

      test('Convert 3/7.2/4kilomegagram (invalid number and unit)', function (done) {
        chai
          .request(server)
          .get('/api/convert')
          .query({ input: '3/7.2/4kilomegagram' })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'invalid number and unit');
            done();
          });
      });

      test('Convert kg (no number)', function (done) {
        chai
          .request(server)
          .get('/api/convert')
          .query({ input: 'kg' })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 1);
            assert.equal(res.body.initUnit, 'kg');
            assert.approximately(res.body.returnNum, 2.20462, 0.1);
            assert.equal(res.body.returnUnit, 'lbs');
            done();
          });
      });
    });
  });

  after(function () {
    chai.request(server).get('/');
  });
});


// /*
//  *
//  *
//  *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
//  *       -----[Keep the tests in the same order!]-----
//  *       (if additional are added, keep them at the very end!)
//  */

// const chaiHttp = require("chai-http");
// const chai = require("chai");
// let assert = chai.assert;
// const server = require("../server");

// chai.use(chaiHttp);

// suite("Functional Tests", function () {
//   suite("Routing Tests", function () {
//     suite("GET /api/convert => conversion object", function () {
//       test("Convert 10L (valid input)", function (done) {
//         chai
//           .request(server)
//           .get("/api/convert")
//           .query({ input: "10L" })
//           .end(function (err, res) {
//             assert.equal(res.status, 200);
//             assert.equal(res.body.initNum, 10);
//             assert.equal(res.body.initUnit, "L");
//             assert.approximately(res.body.returnNum, 2.64172, 0.1);
//             assert.equal(res.body.returnUnit, "gal");
//             done();
//           });
//       });

//       test("Convert 32g (invalid input unit)", function (done) {
//         chai
//           .request(server)
//           .get("/api/convert")
//           .query({ input: "32g" })
//           .end(function (err, res) {
//             assert.equal(res.status, 200);
//             assert.equal(res.body.initUnit, undefined);
//             done();
//           });
//       });

//       test("Convert 3/7.2/4kg (invalid number)", function (done) {
//         chai
//           .request(server)
//           .get("/api/convert")
//           .query({ input: "3/7.2/4kg" })
//           .end(function (err, res) {
//             assert.equal(res.status, 200);
//             assert.equal(res.body.initNum, undefined);
//             done();
//           });
//       });

//       test("Convert 3/7.2/4kilomegagram (invalid number and unit)", function (done) {
//         chai
//           .request(server)
//           .get("/api/convert")
//           .query({ input: "3/7.2/4kilomegagram" })
//           .end(function (err, res) {
//             assert.equal(res.status, 200);
//             assert.equal(res.body.initNum, undefined);
//             assert.equal(res.body.initUnit, undefined);
//             done();
//           });
//       });

//       test("Convert kg (no number)", function (done) {
//         chai
//           .request(server)
//           .get("/api/convert")
//           .query({ input: "kg" })
//           .end(function (err, res) {
//             assert.equal(res.status, 200);
//             assert.equal(res.body.initNum, 1);
//             assert.equal(res.body.initUnit, "kg");
//             assert.approximately(res.body.returnNum, 2.20462, 0.1);
//             assert.equal(res.body.returnUnit, "lbs");
//             done();
            
           
//           });
         
//       });
      
      
//     });
   
//   });
// });

// // // const chaiHttp = require('chai-http');
// // // const chai = require('chai');
// // // let assert = chai.assert;
// // // const server = require('../server');

// // // chai.use(chaiHttp);

// // // suite('Functional Tests', function() {
// // //      // Test 1: Convert a valid input such as 10L
// // //   test('Convert a valid input such as 10L', function(done) {
// // //     chai.request(server)
// // //       .get('/api/convert')
// // //       .query({ input: '10L' })
// // //       .end(function(err, res) {
// // //         assert.equal(res.status, 200);
// // //         assert.property(res.body, 'initNum');
// // //         assert.property(res.body, 'initUnit');
// // //         assert.property(res.body, 'returnNum');
// // //         assert.property(res.body, 'returnUnit');
// // //         assert.property(res.body, 'string');
// // //         assert.include(res.body.string, 'converts to');
// // //         done();
// // //       });
// // //   });

// // //   // Test 2: Convert an invalid input such as 32g
// // //   test('Convert an invalid input such as 32g', function(done) {
// // //     chai.request(server)
// // //       .get('/api/convert')
// // //       .query({ input: '32g' })
// // //       .end(function(err, res) {
// // //         assert.equal(res.status, 200);
// // //         assert.equal(res.text, 'invalid unit');
// // //         done();
// // //       });
// // //   });

// // //   // Test 3: Convert an invalid number such as 3/7.2/4kg
// // //   test('Convert an invalid number such as 3/7.2/4kg', function(done) {
// // //     chai.request(server)
// // //       .get('/api/convert')
// // //       .query({ input: '3/7.2/4kg' })
// // //       .end(function(err, res) {
// // //         assert.equal(res.status, 200);
// // //         assert.equal(res.text, 'invalid number');
// // //         done();
// // //       });
// // //   });

// // //   // Test 4: Convert an invalid number AND unit such as 3/7.2/4kilomegagram
// // //   test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram', function(done) {
// // //     chai.request(server)
// // //       .get('/api/convert')
// // //       .query({ input: '3/7.2/4kilomegagram' })
// // //       .end(function(err, res) {
// // //         assert.equal(res.status, 200);
// // //         assert.equal(res.text, 'invalid number and unit');
// // //         done();
// // //       });
// // //   });

// // //   // Test 5: Convert with no number such as kg
// // //   test('Convert with no number such as kg', function(done) {
// // //     chai.request(server)
// // //       .get('/api/convert')
// // //       .query({ input: 'kg' })
// // //       .end(function(err, res) {
// // //         assert.equal(res.status, 200);
// // //         assert.property(res.body, 'initNum');
// // //         assert.property(res.body, 'initUnit');
// // //         assert.property(res.body, 'returnNum');
// // //         assert.property(res.body, 'returnUnit');
// // //         done();
// // //       });
// // //     });
// // // });

// // const chaiHttp = require('chai-http');
// // const chai = require('chai');
// // let assert = chai.assert;
// // const server = require('../server');

// // chai.use(chaiHttp);

// // suite('Functional Tests', function () {
  
// //   test('Convert a valid input such as 10L', function (done) {
// //     chai.request(server)
// //       .get('/api/convert')
// //       .query({ input: '10L' })
// //       .end(function (err, res) {
// //         assert.equal(res.status, 200);
// //         assert.equal(res.body.initNum, 10);
// //         assert.equal(res.body.initUnit, 'L');
// //         assert.approximately(res.body.returnNum, 2.64172, 0.1);
// //         assert.equal(res.body.returnUnit, 'gal');
// //         done();
// //       });
// //   });

// //   test('Convert an invalid input such as 32g', function (done) {
// //     chai.request(server)
// //       .get('/api/convert')
// //       .query({ input: '32g' })
// //       .end(function (err, res) {
// //         assert.equal(res.status, 200);
// //         assert.equal(res.text.replace(/"/g, ''), 'invalid unit');
// //         done();
// //       });
// //   });

// //   test('Convert an invalid number such as 3/7.2/4kg', function (done) {
// //     chai.request(server)
// //       .get('/api/convert')
// //       .query({ input: '3/7.2/4kg' })
// //       .end(function (err, res) {
// //         assert.equal(res.status, 200);
// //         assert.equal(res.text.replace(/"/g, ''), 'invalid number');
// //         done();
// //       });
// //   });

// //   test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram', function (done) {
// //     chai.request(server)
// //       .get('/api/convert')
// //       .query({ input: '3/7.2/4kilomegagram' })
// //       .end(function (err, res) {
// //         assert.equal(res.status, 200);
// //         assert.equal(res.text.replace(/"/g, ''), 'invalid number and unit');
// //         done();
// //       });
// //   });

// //   test('Convert with no number such as kg', function (done) {
// //     chai.request(server)
// //       .get('/api/convert')
// //       .query({ input: 'kg' })
// //       .end(function (err, res) {
// //         assert.equal(res.status, 200);
// //         assert.equal(res.body.initNum, 1);
// //         assert.equal(res.body.initUnit, 'kg');
// //         assert.approximately(res.body.returnNum, 2.20462, 0.1);
// //         assert.equal(res.body.returnUnit, 'lbs');
// //         done();
// //       });
// //   });

// // });
