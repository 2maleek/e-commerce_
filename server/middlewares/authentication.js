const { User } = require('../models')
const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.access_token, process.env.SECRET)
    User.findOne({
      where: { email : decoded.email }
    })
    .then(isFound => {
      if(!isFound){
        throw {status: 404, message: 'User not found'}
      }
      req.user = decoded
      next()
    })
    .catch(err => {
      next(err)
    })
  } catch (error) {
    throw {status: 401, message: 'Not authenticated'}
  }
}