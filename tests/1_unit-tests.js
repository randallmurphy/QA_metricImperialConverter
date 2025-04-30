/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Function convertHandler.getNum(input)", function () {
    test("Whole number input", function (done) {
      let input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test("Decimal Input", function (done) {
      let input = "32.2L";
      assert.equal(convertHandler.getNum(input), 32.2);
      done();
    });

    test("Fractional Input", function (done) {
      let input = "32/3L";
      assert.equal(convertHandler.getNum(input), 32 / 3);
      done();
    });

    test("Fractional Input w/ Decimal", function (done) {
      let input = "9/3.3L";
      assert.equal(convertHandler.getNum(input), 9 / 3.3);
      done();
      //done();
    });

    test("Invalid Input (double fraction)", function (done) {
      let input = "32/3/3L";
      assert.equal(convertHandler.getNum(input), undefined);
      done();
    });

    test("No Numerical Input", function (done) {
      let input = "L";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite("Function convertHandler.getUnit(input)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      let input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG",
      ];
      let output = [
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
      ];
      input.forEach(function (ele, index) {
        assert.equal(convertHandler.getUnit(ele), output[index]);
      });
      done();
    });

    test("Unknown Unit Input", function (done) {
      assert.equal(convertHandler.getUnit("34kilograms"), undefined);
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let expect = ["L", "gal", "km", "mi", "kg", "lbs"];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      //see above example for hint
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let expect = [
        "gallons",
        "liters",
        "miles",
        "kilometers",
        "pounds",
        "kilograms",
      ];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.convert(num, unit)", function () {
    test("Gal to L", function (done) {
      let input = [5, "gal"];
      let expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("L to Gal", function (done) {
      let input = [5, "l"];
      let expected = 1.32086;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Mi to Km", function (done) {
      let input = [5, "mi"];
      let expected = 8.0467;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Km to Mi", function (done) {
      let input = [5, "km"];
      let expected = 3.10686;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Lbs to Kg", function (done) {
      let input = [5, "lbs"];
      let expected = 2.26796;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Kg to Lbs", function (done) {
      let input = [5, "kg"];
      let expected = 11.02312;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });
  });
});

// const chai = require('chai');
// let assert = chai.assert;
// const ConvertHandler = require('../controllers/convertHandler.js');

// let convertHandler = new ConvertHandler();

// suite('Unit Tests', function () {

//   test('convertHandler should correctly read a whole number input', function () {
//     assert.strictEqual(convertHandler.getNum('32L'), 32);
//   });

//   test('convertHandler should correctly read a decimal number input', function () {
//     assert.strictEqual(convertHandler.getNum('3.1mi'), 3.1);
//   });

//   test('convertHandler should correctly read a fractional input', function () {
//     assert.strictEqual(convertHandler.getNum('1/2km'), 0.5);
//   });

//   test('convertHandler should correctly read a fractional input with a decimal', function () {
//     assert.strictEqual(convertHandler.getNum('5.4/3lbs'), 1.8);
//   });

//   test('convertHandler should correctly return an error on a double-fraction', function () {
//     assert.strictEqual(convertHandler.getNum('3/2/3kg'), 'invalid number');
//   });

//   test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function () {
//     assert.strictEqual(convertHandler.getNum('kg'), 1);
//   });

//   test('convertHandler should correctly read each valid input unit', function () {
//     const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
//     input.forEach(function (unit) {
//       assert.strictEqual(convertHandler.getUnit('3' + unit), unit.toLowerCase() === 'l' ? 'L' : unit.toLowerCase());
//     });
//   });

//   test('convertHandler should correctly return an error for an invalid input unit', function () {
//     assert.strictEqual(convertHandler.getUnit('32g'), 'invalid unit');
//   });

//   test('convertHandler should return the correct return unit for each valid input unit', function () {
//     const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
//     const expected = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
//     input.forEach(function (unit, i) {
//       assert.strictEqual(convertHandler.getReturnUnit(unit), expected[i]);
//     });
//   });

//   test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function () {
//     const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
//     const expected = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
//     input.forEach(function (unit, i) {
//       assert.strictEqual(convertHandler.spellOutUnit(unit), expected[i]);
//     });
//   });

//   test('convertHandler should correctly convert gal to L', function () {
//     assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
//   });

//   test('convertHandler should correctly convert L to gal', function () {
//     assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.1);
//   });

//   test('convertHandler should correctly convert mi to km', function () {
//     assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
//   });

//   test('convertHandler should correctly convert km to mi', function () {
//     assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.1);
//   });

//   test('convertHandler should correctly convert lbs to kg', function () {
//     assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.1);
//   });

//   test('convertHandler should correctly convert kg to lbs', function () {
//     assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1);
//   });

// });
