const router = require('express').Router()
const Controller = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/register', Controller.register)
router.post('/login', Controller.login)

router.use(authentication)
router.get('/products', Controller.findAllProducts)
router.get('/products/:id', Controller.findOneProduct)
router.post('/carts', Controller.addToCart)
router.get('/carts', Controller.findAllCart)

module.exports = router
