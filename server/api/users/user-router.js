const router = require('express').Router();
const { validatePassword } = require('../middleware/restricted');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../users/users-model');
const { JWT_SECRET } = require('../config');

router.post('/register', validatePassword, async (req, res, next) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Username, password, and email are required.' });
  }

  
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  try {
 
    const existingUser = await User.findBy({ username });
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Username is already taken.' });
    }

    const existingEmail = await User.findBy({ email });
    if (existingEmail.length > 0) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }
    const hash = bcrypt.hashSync(password, 8);
    const newUser = await User.add({ username, password: hash, email });

    res.status(201).json({
      message: `${username} registered successfully! Please login.`,
      users: newUser,
    });
  } catch (err) {
    next(err);
  }
});


router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const [user] = await User.findBy({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: `Welcome back, ${user.username}`,
        token,
      });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
});

router.get('/user/:username/liked-pets', async (req, res) => {
  const { username } = req.params;

  try {
    const pets = await User.getLikedPets(username);
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving liked pets', error: err });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

module.exports = router;
