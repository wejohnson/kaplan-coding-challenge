const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;
const path = require('path');

app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));


/* Word manipulation */
app.get('/word', (req, res) => {
  let response = '';
  const { word } = req.query;

  switch (req.query.operation) {
    case 'scrub':
      response = word.replace(/(?<!^).(?!$)/g, '*');
      break;
    case 'reverse':
      response = word.split('').reverse().join('');
      break;

    default:
      response = word;
  }

  res.send(response);
});

/* No matter the path to bundle.js, return the build bundle. */
app.get('*/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', '/bundle.js'));
});

/* No matter the path to bundle.js.map, return the build bundle. */
app.get('*/bundle.js.map', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', '/bundle.js.map'));
});

/* No matter the path to index.html, return the build bundle. */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', '/index.html'));
});

const server = app.listen(port, () => { console.log(`Listening on port ${port}`); });

module.exports = server;
