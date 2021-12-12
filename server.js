/* eslint-disable no-console */
const express = require('express');
const path = require('path');

const app = express();

const { BASIC_AUTH_NAME, BASIC_AUTH_PASS } = process.env;

const httpAuth = (req, res, next) => {
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

  if (login === BASIC_AUTH_NAME && password === BASIC_AUTH_PASS) return next();

  res.set('WWW-Authenticate', 'Basic realm="401"');
  res.status(401).send('Authentication required.');
};

if (BASIC_AUTH_NAME && BASIC_AUTH_PASS) app.use(httpAuth);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
