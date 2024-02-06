/* eslint-disable no-console */
const express = require('express');
const app = express();

require('dotenv').config({ path: '../.env' });

//============= API ==============
const { router } = require('express-file-routing');
require('express-async-errors');

const cors = require('cors');
const throttle = require('express-throttle');
const { normalizeBodyFields } = require('./middleware/global');
const { checkAuth } = require('./middleware/auth');

app.use(cors());
app.use(express.json());
app.use(throttle({ burst: 50, period: '1s' }));
app.use(normalizeBodyFields);
app.use(checkAuth);

app.use('/', router());

//========= Error Handlers ==========
app.use((_req, res) => res.status(404).json('Route not found, try another method?'));

app.use((error, _req, res, _next) => {
  console.log('[SERVER ERROR]', error);
  res.status(error.status || 500).json(error.message);
});

//===== Listen on port #### =====
app.listen(process.env.VITE_SERVER_PORT, () => {
  console.log(`Listening on http://localhost:${process.env.VITE_SERVER_PORT}/`);
});
