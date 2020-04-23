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
    let { ProductId, quantity } = req.body
    if(!quantity) quantity = 1
    const { UserId } = req.user
    Cart.findAll({
      where: { UserId }
    })
    .then(data => {
      console.log(data)
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
      // res.status(201).json({message: 'Success added to cart'})
      res.send(response)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static findAllCart(req, res, next) {
    const { UserId } = req.user
    Cart.findAll({
      where: { UserId },
      include: [
        {
          model: Product,
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

  static deleteCart(req, res, next) {
    let { id } = req.params
    // Otorosasinya
    Cart.findByPk(id)
    .then(isFound => {
      if(!isFound ) {
        throw{status: 404, message: 'Cart not found'}
      }
      return Cart.destroy({
        where: { id }
      })
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      next(err)
    })
  }

  static updateProduct(req, res, next) {
    let id = Number(req.params.id)
    const { UserId, roles } = req.user
    const { quantity } = req.body
    // if(price <= 0 || stock < 0) {
    //   next({status: 400, message: "Price must greater than 0 and stock can't be minus"})
    // }

    console.log('masuk update quantity')
    Product.findByPk(id)
    .then(isFound => {
      if(!isFound) {
        throw{ status: 404, message: "Product not found"}
      }
      if(isFound.stock < quantity) {
        throw{ status: 400, message: "insufficient stock"}
      }
      let newStock = isFound.stock - quantity
      return Product.update({stock: newStock}, {
        where: { id }
      })
    })
    .then(() => {
      return Product.findByPk(id)
    })
    .then(updatedProduct => {
      res.status(200).json(updatedProduct)
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = Controller
