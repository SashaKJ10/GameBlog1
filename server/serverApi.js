const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController.cjs');
const gamesController = require('./controllers/gamesController');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use('/', gamesController);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
// Routes
app.get('/users', userController.getAllUsers);
app.get('/user', userController.getCurrentUser);
app.post('/login', userController.loginUser);
app.post('/logout', userController.logOut)

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
