function validatePassword(req, res, next) {
    const { password } = req.body;
  
    // Check if the password exists and meets the criteria
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }
  
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters long and contain at least one letter and one number',
      });
    }
  
    // If password is valid, proceed to the next middleware or route handler
    next();
  }

  module.exports = {validatePassword} ;