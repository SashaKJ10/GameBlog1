const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const gamesController = require('./controllers/gamesController');
const userController = require('./controllers/userController');

const app = express();

// Middleware
const cors = require('cors');
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(bodyParser.json({ limit: '300mb' })); // Adjust the limit value as per your needs
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use('/games', gamesController);
app.use('/users', userController);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
