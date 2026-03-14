const jwt = require('jsonwebtoken')

const protect = async (req, res, next) => {
  try {
    // Get token from request headers
    const authHeader = req.headers.authorization

    // Check if token exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token, access denied' })
    }

    // Extract token (remove "Bearer " prefix)
    const token = authHeader.split(' ')[1]

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Attach user id to request
    req.user = decoded

    next()

  } catch (err) {
    res.status(401).json({ message: 'Token invalid or expired' })
  }
}

module.exports = protect