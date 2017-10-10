const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

Validate = require('./api/validate');

app.get('/api/validate', async (req, res, next) => {
  try {

    let username = req.query.username;
    let serie = req.query.serie;
    let type = req.query.type;

    const result = await Validate.validateByUsernameAndSerie(username, serie, type);
    res.json(result);

  } catch (e) {
    next(e);
  }
})

app.listen(process.env.PORT || 1938)
console.log('Running on port 1938...');
