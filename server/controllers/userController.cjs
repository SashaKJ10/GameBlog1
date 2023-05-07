const jwt = require('jsonwebtoken');

const users = [
    {
      id: 1,
      email: 'custom_email',
      password: 'custom_password',
      isAdmin: true,
    },
    {
      id: 2,
      email: 'custom_email2',
      password: 'custom_password2',
      isAdmin: false,
    },
  ];
  
  // Get all users
  exports.getAllUsers = (req, res) => {
    res.status(200).json(users.map(user => ({
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin
    })));
  };
  
  // Get current user
  exports.getCurrentUser = (req, res) => {
    const email = req.query.email;
    const user = users.find((u) => u.email === email);
  
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      const userWithoutPassword = {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      };
      res.status(200).json(userWithoutPassword);
    }
  };
  
  // Login user
  exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email)
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else if (user.password !== password) {
      res.status(401).json({ error: 'Incorrect password' });
    } else {
      const userWithoutPassword = {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      };
      // const token = jwt.sign({ password: user.password }, 'secret');
      res.status(200).json(userWithoutPassword);
    }
  };