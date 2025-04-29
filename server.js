'use strict';
// console.log('QA_metricImperialConverter')
// console.log('try this');
// const express     = require('express');
// const bodyParser  = require('body-parser');
// const expect      = require('chai').expect;
// const cors        = require('cors');
// require('dotenv').config();

// const apiRoutes         = require('./routes/api.js');
// const fccTestingRoutes  = require('./routes/fcctesting.js');
// const runner            = require('./test-runner');

// let app = express();

// app.use('/public', express.static(process.cwd() + '/public'));

// app.use(cors({origin: '*'})); //For FCC testing purposes only

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// //Index page (static HTML)
// app.route('/')
//   .get(function (req, res) {
//     res.sendFile(process.cwd() + '/views/index.html');
//   });

// //For FCC testing purposes
// fccTestingRoutes(app);

// //Routing for API 
// apiRoutes(app);  
    
// //404 Not Found Middleware
// app.use(function(req, res, next) {
//   res.status(404)
//     .type('text')
//     .send('Not Found');
// });

// const port = process.env.PORT || 3000;

// //Start our server and tests!
// app.listen(port, function () {
//   console.log("Listening on port " + port);
//   if(process.env.NODE_ENV==='test') {
//     console.log('Running Tests...');
//     setTimeout(function () {
//       try {
//         runner.run();
//       } catch(e) {
//           console.log('Tests are not valid:');
//           console.error(e);
//       }
//     }, 1500);
//   }
// });

// module.exports = app; //for testing

// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const fccTestingRoutes = require('./routes/fcctesting');
const cors = require('cors');

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

fccTestingRoutes(app);
apiRoutes(app);

app.use(function (req, res, next) {
  res.status(404).type('text').send('Not Found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;

// routes/api.js
'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res) {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return res.send('invalid number and unit');
    } else if (initNum === 'invalid number') {
      return res.send('invalid number');
    } else if (initUnit === 'invalid unit') {
      return res.send('invalid unit');
    }

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  });
};

// routes/fcctesting.js
module.exports = function (app) {
  app.get('/_api/get-tests', function (req, res) {
    res.json({ message: 'Test API connected.' });
  });
};

// controllers/convertHandler.js
function ConvertHandler() {
  const unitMap = {
    gal: 'L',
    L: 'gal',
    mi: 'km',
    km: 'mi',
    lbs: 'kg',
    kg: 'lbs'
  };

  const spellOutMap = {
    gal: 'gallons',
    L: 'liters',
    mi: 'miles',
    km: 'kilometers',
    lbs: 'pounds',
    kg: 'kilograms'
  };

  this.getNum = function (input) {
    const result = input.match(/^[\d\.\/]+/);
    if (!result) return 1;

    const numStr = result[0];
    if ((numStr.match(/\//g) || []).length > 1) return 'invalid number';

    if (numStr.includes('/')) {
      const [numerator, denominator] = numStr.split('/');
      return parseFloat(numerator) / parseFloat(denominator);
    }
    return parseFloat(numStr);
  };

  this.getUnit = function (input) {
    const result = input.match(/[a-zA-Z]+$/);
    if (!result) return 'invalid unit';

    let unit = result[0].toLowerCase();
    if (unit === 'l') unit = 'L';
    const validUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];

    return validUnits.includes(unit) ? unit : 'invalid unit';
  };

  this.getReturnUnit = function (initUnit) {
    return unitMap[initUnit];
  };

  this.spellOutUnit = function (unit) {
    return spellOutMap[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit) {
      case 'gal': return parseFloat((initNum * galToL).toFixed(5));
      case 'L': return parseFloat((initNum / galToL).toFixed(5));
      case 'lbs': return parseFloat((initNum * lbsToKg).toFixed(5));
      case 'kg': return parseFloat((initNum / lbsToKg).toFixed(5));
      case 'mi': return parseFloat((initNum * miToKm).toFixed(5));
      case 'km': return parseFloat((initNum / miToKm).toFixed(5));
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
