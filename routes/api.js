// 'use strict';

// const expect = require('chai').expect;
// const ConvertHandler = require('../controllers/convertHandler.js');

// module.exports = function (app) {
  
//   let convertHandler = new ConvertHandler();
//   app.route('/api/convert').get((req,res)=>{
//     let input = req.query.input;
//     let convertHandler = new ConvertHandler();
//     let initNum = convertHandler.getNum(input);
//     let initUnit = convertHandler.getUnit(input);
//       if(initNum === 'invalid number' && initUnit === 'invalid unit'){
//         res.json('invalid number and unit');
//       } else if(initNum === 'invalid number'){
//         res.json('invalid number');
//       } else if(initUnit === 'invalid unit'){
//         res.json('invalid unit');
//       } else {
//         let returnNum = convertHandler.convert(initNum, initUnit);
//         let returnUnit = convertHandler.getReturnUnit(initUnit);
//         let toString = convertHandler.getString(
//           initNum,
//           initUnit,
//           returnNum,
//           returnUnit,
//           );
//           res.json({
//             initNum,
//             initUnit,
//             returnNum,
//             returnUnit,
//             string: spellOutUnit(),
//           });
//       }
//   });
// };
// // const ch = new ConvertHandler();
// console.log(ch.getNum("3.1mi"));      // 3.1
// console.log(ch.getUnit("3.1mi"));     // "mi"
// console.log(ch.getReturnUnit("mi"));  // "km"
// console.log(ch.convert(3.1, "mi"));   // 4.98895

// 'use strict';

// const ConvertHandler = require('../controllers/convertHandler.js');

// module.exports = function (app) {
//   let convertHandler = new ConvertHandler();

//   app.route('/api/convert').get((req, res) => {
//     const input = req.query.input;
//     const initNum = convertHandler.getNum(input);
//     const initUnit = convertHandler.getUnit(input);

//     if (initNum === 'invalid number' && initUnit === 'invalid unit') {
//       return res.json('invalid number and unit');
//     } else if (initNum === 'invalid number') {
//       return res.json('invalid number');
//     } else if (initUnit === 'invalid unit') {
//       return res.json('invalid unit');
//     }

//     const returnNum = convertHandler.convert(initNum, initUnit);
//     const returnUnit = convertHandler.getReturnUnit(initUnit);
//     const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

//     res.json({
//       initNum,
//       initUnit,
//       returnNum,
//       returnUnit,
//       string
//     });
//   });
// };

// const ConvertHandler = require('../controllers/convertHandler.js');
// const convertHandler = new ConvertHandler();
// module.exports = function (app) {
  

//   app.get('/api/convert', (req, res) => {
//     const input = req.query.input;
//     const initNum = convertHandler.getNum(input);
//     const initUnit = convertHandler.getUnit(input);

//     if (initNum === "invalid number" && initUnit === "invalid unit") {
//       return res.send("invalid number and unit");
//     }
//     if (initNum === "invalid number") {
//       return res.send("invalid number");
//     }
//     if (initUnit === "invalid unit") {
//       return res.send("invalid unit");
//     }

//     const returnNum = convertHandler.convert(initNum, initUnit);
//     const returnUnit = convertHandler.getReturnUnit(initUnit);
//     const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

//     return res.json({
//       initNum,
//       initUnit,
//       returnNum,
//       returnUnit,
//       string
//     });
//   });
// };


const ConvertHandler = require('../controllers/convertHandler.js');
const convertHandler = new ConvertHandler();

module.exports = function(app) {
  
  app.route('/api/convert')
    .get(function(req, res) {
      const input = req.query.input;

      const num = convertHandler.getNum(input);
      const unit = convertHandler.getUnit(input);

      if (unit === 'invalid unit') {
        return res.json({ error: 'invalid unit' });
      }

      if (num === 'invalid number') {
        return res.json({ error: 'invalid number' });
      }

      const returnUnit = convertHandler.getReturnUnit(unit);
      const returnNum = convertHandler.convert(num, unit);

      // If there's an error with the number or unit, return the appropriate message
      if (returnUnit === 'invalid unit' || isNaN(returnNum)) {
        return res.json({ error: 'invalid number and unit' });
      }

      const result = convertHandler.getString(num, unit, returnNum, returnUnit);

      res.json({
        initNum: num,
        initUnit: unit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: result
      });
    });
};
