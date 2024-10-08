const router = require('express').Router();
//const {  checkUsernameExists } = require('../middleware/restricted')
const bcrypt = require('bcryptjs')
const jwt =  require('jsonwebtoken')
const User = require('../users/users-model')
const {JWT_SECRET} = require('../config')

router.post('/register' , (req, res, next) => {
  const { username , password } = req.body

  const hash = bcrypt.hashSync(password, 8)

  User.add({username, password: hash})
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
});

router.post('/login', async (req, res, next) => {

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'username and password required' })
    }

    const [user] = await User.findBy({ username })

    if ( user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user)
      console.log(token)
      res.status(200).json({
        message: `Welcome back, ${user.username}`,
        token,
      })
    } else {
      return res.status(401).json({ message: 'invalid credentials' })
    }
  } catch (error) {
    console.error('Login error:', error)
    next(error)
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = router;