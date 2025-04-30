'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
fccTestingRoutes(app);
apiRoutes(app);

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(() => {
      try {
        runner.run();
      } catch (err) {
        console.log('Tests are not valid:');
        console.log(err);
      }
    }, 1500);
  }
});

// Export the server instance
module.exports = server;


// "use strict";

// const express = require("express");
// const bodyParser = require("body-parser");
// const expect = require("chai").expect;
// const cors = require("cors");
// require("dotenv").config();

// const apiRoutes = require("./routes/api.js");
// const fccTestingRoutes = require("./routes/fcctesting.js");
// const runner = require("./test-runner");

// let app = express();

// app.use("/public", express.static(process.cwd() + "/public"));

// app.use(cors({ origin: "*" })); //For FCC testing purposes only

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// //Index page (static HTML)
// app.route("/").get(function (req, res) {
//   res.sendFile(process.cwd() + "/views/index.html");
// });

// //For FCC testing purposes
// fccTestingRoutes(app);

// //Routing for API
// apiRoutes(app);

// //404 Not Found Middleware
// app.use(function (req, res, next) {
//   res.status(404).type("text").send("Not Found");
// });

// if (process.env.NODE_ENV === "test") {
//   console.log("Running Tests...");
//   try {
//     runner.run(); // Run tests only once
//   } catch (e) {
//     console.log("Tests are not valid:");
//     console.log(e);
//   }
// }

// //Start our server and tests!
// app.listen(process.env.PORT || 3000, function () {
//   console.log("Listening on port " + process.env.PORT);
 
// });

// module.exports = app; //for testing

// // // 'use strict';
// // // console.log('QA_metricImperialConverter')
// // // console.log('try this');
// // // const express     = require('express');
// // // const bodyParser  = require('body-parser');
// // // const expect      = require('chai').expect;
// // // const cors        = require('cors');
// // // require('dotenv').config();

// // // const apiRoutes         = require('./routes/api.js');
// // // const fccTestingRoutes  = require('./routes/fcctesting.js');
// // // const runner            = require('./test-runner');

// // // let app = express();

// // // app.use('/public', express.static(process.cwd() + '/public'));

// // // app.use(cors({origin: '*'})); //For FCC testing purposes only

// // // app.use(bodyParser.json());
// // // app.use(bodyParser.urlencoded({ extended: true }));

// // // //Index page (static HTML)
// // // app.route('/')
// // //   .get(function (req, res) {
// // //     res.sendFile(process.cwd() + '/views/index.html');
// // //   });

// // // //For FCC testing purposes
// // // fccTestingRoutes(app);

// // // //Routing for API 
// // // apiRoutes(app);  
    
// // // //404 Not Found Middleware
// // // app.use(function(req, res, next) {
// // //   res.status(404)
// // //     .type('text')
// // //     .send('Not Found');
// // // });

// // // const port = process.env.PORT || 3000;

// // // //Start our server and tests!
// // // app.listen(port, function () {
// // //   console.log("Listening on port " + port);
// // //   if(process.env.NODE_ENV==='test') {
// // //     console.log('Running Tests...');
// // //     setTimeout(function () {
// // //       try {
// // //         runner.run();
// // //       } catch(e) {
// // //           console.log('Tests are not valid:');
// // //           console.error(e);
// // //       }
// // //     }, 1500);
// // //   }
// // // });

// // // module.exports = app; //for testing


// // // 'use strict';

// // // const express = require('express');
// // // const cors = require('cors');
// // // const app = express();
// // // const apiRoutes = require('./routes/api.js');
// // // const bodyParser = require('body-parser');

// // // // Middleware
// // // app.use(cors({ origin: '*' }));
// // // app.use(bodyParser.json());
// // // app.use(bodyParser.urlencoded({ extended: true }));

// // // // Serve static files (if needed)
// // // app.use('/public', express.static(process.cwd() + '/public'));

// // // // Home page response (adjusted to return array as per test requirements)
// // // app.get('/', (req, res) => {
// // //   res.json([{ status: 'ready' }]); // Changed from { status: 'ready' } to array format
// // // });

// // // // API routes
// // // apiRoutes(app);

// // // // 404 Not Found middleware
// // // app.use((req, res, next) => {
// // //   res.status(404).type('text').send('Not Found');
// // // });

// // // // Start server
// // // const listener = app.listen(process.env.PORT || 3000, () => {
// // //   console.log('Your app is listening on port ' + listener.address().port);
// // // });

// // // module.exports = app; // For testing

// // // 'use strict';

// // // const express = require('express');
// // // const cors = require('cors');
// // // const app = express();

// // // // Middleware
// // // app.use(cors({ origin: '*' }));
// // // app.use(express.json());
// // // app.use(express.urlencoded({ extended: true }));

// // // // Serve static files
// // // app.use('/public', express.static(process.cwd() + '/public'));

// // // // Root route (required by FreeCodeCamp test runner)
// // // app.get('/', (req, res) => {
// // //   res.sendFile(process.cwd() + '/views/index.html');
// // // });

// // // // Routing
// // // const apiRoutes = require('./routes/api.js');
// // // apiRoutes(app);

// // // // 404 handler (must come last)
// // // app.use((req, res) => {
// // //   res.status(404).type('text').send('Not Found');
// // // });

// // // // Export for testing
// // // module.exports = app;

// // 'use strict';

// // const express = require('express');
// // const cors = require('cors');
// // const app = express();

// // // Middleware
// // app.use(cors({ origin: '*' }));
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // // Static files
// // app.use('/public', express.static(process.cwd() + '/public'));

// // // Frontend root
// // app.get('/', (req, res) => {
// //   res.sendFile(process.cwd() + '/views/index.html');
// // });

// // // API routes
// // const apiRoutes = require('./routes/api.js');
// // apiRoutes(app);

// // // 404 handler
// // app.use((req, res) => {
// //   res.status(404).type('text').send('Not Found');
// // });

// // // Only start server if not in test environment
// // const port = process.env.PORT || 3000;
// // if (process.env.NODE_ENV !== 'test') {
// //   app.listen(port, () => {
// //     console.log(`Server is listening on port ${port}`);
// //   });
// // }

// // // Export app for test
// // module.exports = app;