/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */
function numberStringSplitter(input) {
  let number = input.match(/[.\d\/]+/g) || ["1"];
  let string = input.match(/[a-zA-Z]+/g)[0];

  return [number[0], string];
}
function checkDiv(possibleFraction) {
  let nums = possibleFraction.split("/");
  if (nums.length > 2) {
    return false;
  }
  return nums;
}
function ConvertHandler() {
  this.getNum = function (input) {
    let result = numberStringSplitter(input)[0];
    let nums = checkDiv(result);
    if (!nums) {
      return undefined;
    }
    let num1 = nums[0];
    let num2 = nums[1] || "1";
    result = parseFloat(num1) / parseFloat(num2);
    if (isNaN(num1) || isNaN(num2)) {
      return undefined;
    }
    return result;
  };

  this.getUnit = function (input) {
    let result = numberStringSplitter(input)[1].toLowerCase();
    switch (result) {
      case "km":
        return "km";
      case "gal":
        return "gal";
      case "lbs":
        return "lbs";
      case "mi":
        return "mi";
      case "l":
        return "L";
      case "kg":
        return "kg";
      default:
        return undefined;
    }
  };

  this.getReturnUnit = function (initUnit) {
    let unit = initUnit.toLowerCase();

    switch (unit) {
      case "km":
        return "mi";
      case "gal":
        return "L";
      case "lbs":
        return "kg";
      case "mi":
        return "km";
      case "l":
        return "gal";
      case "kg":
        return "lbs";
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function (initUnit) {
    let unit = initUnit.toLowerCase();

    switch (unit) {
      case "km":
        return "kilometers";
      case "gal":
        return "gallons";
      case "lbs":
        return "pounds";
      case "mi":
        return "miles";
      case "l":
        return "liters";
      case "kg":
        return "kilograms";
      default:
        return "don't know";
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase();
    let result;

    switch (unit) {
      case "km":
        result = initNum / miToKm;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        result = undefined;
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    // let preciseInitNum = parseFloat(initNum.toFixed(5));
    // let preciseReturnNum = parseFloat(returnNum.toFixed(5));

    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;

// // function ConvertHandler() {

// //   this.getNum = function (input) {
// //     let result;
// //     const numRegex = /^[\d\.\/]+/;
// //     const match = input.match(numRegex);

// //     if (!match) return 1; // default to 1 if no number
// //     const numStr = match[0];
// //     if (numStr.split('/').length > 2) return 'invalid number';

// //     result = match[0];

// //     // handle invalid double fractions
// //     if (result.split('/').length > 2) {
// //       return 'invalid number';
// //     }

// //     // evaluate fraction if necessary
// //     if (result.includes('/')) {
// //       const [numerator, denominator] = result.split('/');
// //       result = parseFloat(numerator) / parseFloat(denominator);
// //     } else {
// //       result = parseFloat(result);
// //     }

// //     if (isNaN(result)) return 'invalid number';
// //     return result;
// //   };

// //   this.getUnit = function (input) {
// //     const unitRegex = /[a-zA-Z]+$/;
// //     const match = input.match(unitRegex);
// //     if (!match) return 'invalid unit';

// //     const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
// //     const inputUnit = match[0].toLowerCase();
// //     if (!validUnits.includes(inputUnit)) return 'invalid unit';
// //     return inputUnit === 'l' ? 'L' : inputUnit;

// //   };

// //   this.getReturnUnit = function (initUnit) {
// //     const unitMap = {
// //       gal: 'L',
// //       L: 'gal',
// //       mi: 'km',
// //       km: 'mi',
// //       lbs: 'kg',
// //       kg: 'lbs'
// //     };
// //     return unitMap[initUnit];
// //   };

// //   this.spellOutUnit = function (unit) {
// //     const spellMap = {
// //       gal: 'gallons',
// //       L: 'liters',
// //       mi: 'miles',
// //       km: 'kilometers',
// //       lbs: 'pounds',
// //       kg: 'kilograms'
// //     };
// //     return spellMap[unit];
// //   };

// //   this.convert = function (initNum, initUnit) {
// //     const galToL = 3.78541;
// //     const lbsToKg = 0.453592;
// //     const miToKm = 1.60934;
// //     let result;
// //     switch (initUnit) {
// //       case 'gal':
// //         result = initNum * galToL;
// //         break;
// //       case 'L':
// //         result = initNum / galToL;
// //         break;
// //       case 'lbs':
// //         result = initNum * lbsToKg;
// //         break;
// //       case 'kg':
// //         result = initNum / lbsToKg;
// //         break;
// //       case 'mi':
// //         result = initNum * miToKm;
// //         break;
// //       case 'km':
// //         result = initNum / miToKm;
// //         break;
// //       default:
// //         return 'invalid unit';
// //     }

// //     return parseFloat(result.toFixed(5));
// //   };


// //   this.getString = function (initNum, initUnit, returnNum, returnUnit) {
// //     const initUnitStr = this.spellOutUnit(initUnit);
// //     const returnUnitStr = this.spellOutUnit(returnUnit);
// //     return `${initNum} ${initUnitStr} converts to ${returnNum} ${returnUnitStr}`;
// //   };

// // }

// // module.exports = ConvertHandler;

// function ConvertHandler() {
//   const unitMap = {
//     gal: 'L',
//     L: 'gal',
//     mi: 'km',
//     km: 'mi',
//     lbs: 'kg',
//     kg: 'lbs'
//   };

//   const spellOutMap = {
//     gal: 'gallons',
//     L: 'liters',
//     mi: 'miles',
//     km: 'kilometers',
//     lbs: 'pounds',
//     kg: 'kilograms'
//   };

//   this.getNum = function(input) {
//     let result;
//     let numRegex = /^[\d/.]+/;
//     let match = input.match(numRegex);
    
//     if (!match) return 1;

//     result = match[0];

//     // Check for invalid double fractions
//     if ((result.match(/\//g) || []).length > 1) return 'invalid number';

//     try {
//       if (result.includes('/')) {
//         let [numerator, denominator] = result.split('/');
//         result = parseFloat(numerator) / parseFloat(denominator);
//       } else {
//         result = parseFloat(result);
//       }
//     } catch (e) {
//       return 'invalid number';
//     }

//     if (isNaN(result)) return 'invalid number';

//     return result;
//   };

//   this.getUnit = function(input) {
//     let result;
//     let unitRegex = /[a-zA-Z]+$/;
//     let match = input.match(unitRegex);
//     if (!match) return 'invalid unit';
    
//     result = match[0].toLowerCase();
//     if (result === 'l') result = 'L';

//     const validUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
//     return validUnits.includes(result) ? result : 'invalid unit';
//   };

//   this.getReturnUnit = function(initUnit) {
//     return unitMap[initUnit];
//   };

//   this.spellOutUnit = function(unit) {
//     return spellOutMap[unit];
//   };

//   this.convert = function(initNum, initUnit) {
//     const galToL = 3.78541;
//     const lbsToKg = 0.453592;
//     const miToKm = 1.60934;
//     let result;

//     switch (initUnit) {
//       case 'gal':
//         result = initNum * galToL;
//         break;
//       case 'L':
//         result = initNum / galToL;
//         break;
//       case 'lbs':
//         result = initNum * lbsToKg;
//         break;
//       case 'kg':
//         result = initNum / lbsToKg;
//         break;
//       case 'mi':
//         result = initNum * miToKm;
//         break;
//       case 'km':
//         result = initNum / miToKm;
//         break;
//     }

//     return parseFloat(result.toFixed(5));
//   };

//   this.getString = function(initNum, initUnit, returnNum, returnUnit) {
//     return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
//   };
// }

// module.exports = ConvertHandler;
