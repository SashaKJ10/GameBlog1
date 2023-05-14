const express = require("express")
const router = express.Router()
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

// GET:/users
router.get("", (req, res) => {
    const email = req.query.email;

    if (email) {
        getUserByEmail(email, res);
    } else {
        getAllUsers(res);
    }
})

// POST:/login
router.post("/login", (req, res) => {
    const {email, password} = req.body;
    const user = users.find((u) => u.email === email)
    if (!user) {
        res.status(404).json({error: 'User not found'});
    } else if (user.password !== password) {
        res.status(401).json({error: 'Incorrect password'});
    } else {
        const userWithoutPassword = getUserWithoutPassword(user);
        // const token = jwt.sign({ password: user.password }, 'secret');
        res.status(200).json(userWithoutPassword);
    }
})

// POST:/logout
router.post("/logout", (req, res) => {
    // clear the user session
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
        } else {
            res.sendStatus(200);
        }
    });
})

const getAllUsers = (res) => {
    let response = users.map(user => getUserWithoutPassword(user));
    res.status(200).json(response);
}

const getUserByEmail = (email, res) => {
    let response = users.filter(user => user.email === email);
    if (!response) {
        res.status(404).json({error: 'User not found'});
        return;
    }

    const userWithoutPassword = getUserWithoutPassword(user);
    res.status(200).json(userWithoutPassword);
}

const getUserWithoutPassword = (user) => {
    return {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
    };
};

module.exports = router;