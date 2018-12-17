const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


// api routes
app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Hello World!'
  });
});

app.get('/:name', (req, res) => {
  res.status(200).send({
    message: 'Votre nom est ' + req.params.name
  });
});


// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 8000;
const server = app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
