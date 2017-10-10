const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

Validate = require('./api/validate');

app.get('/api/validate/:username/:serie/:type', async (req, res, next) => {
  try {
    const result = await Validate.validateByUsernameAndSerie(req.params.username, req.params.serie, req.params.type);
    res.json(result);
  } catch (e) {
    next(e);
  }
})

app.listen(1938);
console.log('Running on port 1938...');
