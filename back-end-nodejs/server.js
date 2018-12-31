'use strict';
const express = require('express');
const app = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const boom = require('express-boom');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api/_utils/swagger.yml');
const cors = require('cors');
app.disable('etag').disable('x-powered-by');
// enable .env files
require('dotenv').config();

// import routes
const routes = require('./api/routes/mainRoute');

// use helmet for secure apps by setting various HTTP headers
app.use(helmet());
// use boom for error handling
app.use(boom());
// use swagger to generate api documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// use body parser middlewares to parse request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// set cors config
app.use(cors({ origin: 'http://localhost:8080' }));

// prefix all routes with '/api/v1'
app.use('/api/v1/', routes);
app.use(function (req, res) {
  res.boom.notFound(); // Responds with a 404 status code
});

app.listen(process.env.PORT || 3000);
console.log(`server running on port http://localhost:3000`);

