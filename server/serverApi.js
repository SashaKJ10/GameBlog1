const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController.cjs');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/users', userController.getAllUsers);
app.get('/user/:email', userController.getCurrentUser);
app.post('/login', userController.loginUser);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
