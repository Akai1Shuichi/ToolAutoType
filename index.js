// server.js
const express = require('express');
const { submit } = require('./puppeFunction.js');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;
const date = require('./date.js');

// Đặt cấu hình cho CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.post('/run-puppeteer', async (req, res) => {
  try {
    const data = req.body.data;
    const position = req.body.position;
    const signature = req.body.signature;
    await submit(position.x, position.y, signature, data);
    res.send({
      message: `==> ${date()} Cửa sổ thứ ${position.index} hoàn thành.\n`,
    });
  } catch (e) {
    res.send({
      message: `==> ${date()} Cửa sổ thứ ${position.index} không hoàn thành.\n`,
    });
  }
});
module.exports = app;
