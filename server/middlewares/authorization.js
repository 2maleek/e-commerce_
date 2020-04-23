const { Cart } = require('../models')

module.exports = (req, res, next) => {
  let { UserId, roles } = req.user
  let id = req.params.id

  Cart.findOne({
    where: { id }
  })
  .then(isFound => {
    if(!isFound) {
      throw {status: 404, message: 'Cart not found'}
    }
    if(UserId !== isFound.UserId && roles !== 'customer') {
      throw {status: 403, message: 'Forbidden access'}
    }
    next()
  })
  .catch(err => {
    next(err)
  })
}
