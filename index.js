// server.js
const express = require('express');
const { submit } = require('./puppeFunction.js');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

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
  const data = req.body.data;
  const promises = [
    submit(0, 0, data.arraySignature[0], data),
    submit(500, 0, data.arraySignature[1], data),
    submit(1000, 0, data.arraySignature[2], data),
    submit(1500, 0, data.arraySignature[3], data),
    submit(0, 515, data.arraySignature[4], data),
  ];
  await Promise.all(promises);
  res.send('Puppeteer process completed.');
});

app.listen(3000, () => {
  console.log('Server is on port 3000 !!!');
});
// module.exports = app;
