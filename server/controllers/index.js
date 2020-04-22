const { User, Product, Cart } = require('../models')
const { compare } = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')

class Controller {
  static register(req, res, next) {

  let { name, email, password, roles } = req.body

  if (!email) email = ''   //handling if email is undefined

    User.findOne({
      where: { email }
    })
    .then(isFound => {
      if(isFound) {
        next({ status: 400, message: "Email already registered" })
      }
      return User.create({
        name,
        email,
        password,
        roles
      })
      .then(newUser => {
        res.status(201).json(newUser)
      })
      .catch(err => {
        next(err)
      })
    })
  }

  static login(req, res, next) {
    let { email, password} = req.body
    let roles, name, UserId;
    if(!email) {
      throw { status: 400, message: "Email is required"}
    }  //handling if email is null or empty Should not check in db

    User.findOne({
      where: { email }
    })
    .then(isFound => {
      if(!isFound) {
        next({ status: 404, message: "Email not registered" })
      }
      UserId = isFound.id
      name = isFound.name
      roles = isFound.roles
      return compare(password, isFound.password)
    })
    .then(result => {
      if(!result){
        next({ status: 400, message: "Password is wrong"})
      }
      let access_token = jwt.sign({
        UserId,
        email,
        name,
        roles,
      }, process.env.SECRET)
      res.status(200).json({access_token, name})
    })
    .catch(err => {
      next(err)
    })
  }

  static findAllProducts(req, res, next) {
    console.log('masuks')
    Product.findAll()
    .then(products => {
      if(!products) {
        next({ status: 404, message: "There are no products"})
      }
      res.status(200).json(products)
    })
    .catch(err => {
      next(err)
    })
  }

  static findOneProduct(req, res, next) {
    let id = req.params.id
    Product.findByPk(id)
    .then(isFound => {
      if(!isFound ) {
        next({status: 404, message: "Product not found"})
      }
      res.status(200).json(isFound)
    })
    .catch(err => {
      next(err)
    })
  }

  static addToCart(req, res, next) {
    const { ProductId, quantity } = req.body
    const { UserId } = req.user
    Cart.findAll({
      where: { UserId }
    })
    .then(data => {
      data.forEach((item, i) => {
        if(item.ProductId === Number(ProductId)) {
          throw{ status: 400, message: "Already added to cart"}
        }
      })
      return Cart.create({
        ProductId,
        UserId,
        quantity
      })
    })
    .then(response => {
      res.status(201).json({message: 'Success added to cart'})
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static findAllCart(req, res, next) {
    const { UserId } = req.user
    Product.findAll({
      include: [
        {
          model: Cart,
        }
      ]
    })
    .then(data => {
      if(!data) {
        throw{status: 400, message: 'Carts is empty'}
      }
      res.status(200).json(data)
    })
    .catch(err => {
      res.send(err)
      console.log(err)
    })
  }
}

module.exports = Controller
