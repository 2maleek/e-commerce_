# e-commerce

#### API DEMO: https://blooming-reef-46142.herokuapp.com
#### APP DEMO: https://e-commerce-2-2.web.app

E-Commerce client Side

&nbsp;

## RESTful endpoints
### POST /register

> Create new user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name": <your name>,
  "email": <your email>,
  "password": <your password>
}
```

#### Success Response: ####
_Response (201 - Created)_
```
{
  "id": 6,
  "name": <your name>,
  "email": <your email>,
  "password": <your encrypted password>,
  "roles": <roles>
  "updatedAt": <date>,
  "createdAt": <date>
}
```

#### Error Response: ####
_Response (400 - Bad Request)_
```
[
  "message": <detail message>
]
```

_Response (409 - conflict)_
```
{
  "message": "Email Already registered!"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### POST /login

> Process Login

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": <your email>,
  "password": <your password>
}
```

#### Success Response: ####
_Response (200 - Ok)_
```
{
  "access_token": <your access token>,
  "name": <your name>
}
```

#### Error Response: ####

_Response (400 - Bad Request)_
```
[
  "message": <detail message>
]
```

_Response (404 - Not Found)_
```
{
  "message": "user not registered!"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### GET /products

> Get User's products

_Request Header_
```
{
  "access_token": <your access token>
}
```

_Request Body_
```
not needed
```

#### Success Response: ####
_Response (200 - Ok)_
```
[
  {
    "id": <product id>,
    "name": <product name>,
    "description": <product description>,
    "category": <product category>,
    "price": <product price>,
    "stock": <product stock>,
    "image_url": <product image>,
    "UserId": <UserId>
  },
  {
    "id": <product id>,
    "name": <product name>,
    "description": <product description>,
    "category": <product category>,
    "price": <product price>,
    "stock": <product stock>,
    "image_url": <product image>,
    "UserId": <UserId>
  },
]
```

#### Error Response: ####
_Response (401 - Unauthorized)_
```
{
  "message": "Not authenticated!"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### GET /products/:id

> Get product by product's id

_Request Header_
```
{
  "access_token": <your access token>
}
```

_Request Body_
```
not needed
```

#### Success Response: ####
_Response (200 - Ok)_
```
{
  "id": <product id>,
  "name": <product name>,
  "description": <product description>,
  "category": <product category>,
  "price": <product price>,
  "stock": <product stock>,
  "image_url": <product image>,
  "UserId": <UserId>
},
```

#### Error Response: ####
_Response (401 - Unauthorized)_
```
{
  "message": "Not authenticated!"
}
```
_Response (403 - Forbidden)_
```
{
  "message": "Forbidden access!"
}
```
_Response (404 - Not Found)_
```
{
  "message": "product not found! "
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```


### PUT /products/:id

> Update product

_Request Header_
```
{
  "access_token": <your access token>
}
```

_Request Body_
```
{
  "stock": <product stock>,
},
```

#### Success Response: ####
_Response (200 - OK)_
```
{
  "id": <product id>,
  "name": <product name>,
  "description": <product description>,
  "category": <product category>,
  "price": <product price>,
  "stock": <product stock>,
  "image_url": <product image>,
  "UserId": <UserId>
},
```

#### Error Response: ####
_Response (401 - Unauthorized)_
```
{
  "message": "Not authenticated!"
}
```
_Response (403 - Forbidden)_
```
{
  "message": "Forbidden access!"
}
```
_Response (404 - Not Found)_
```
{
  "message": "product not found! "
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
### POST /carts

> Create new product

_Request Header_
```
{
  "access_token": <your access token>
}
```

_Request Body_
```
{
  ProductId: <product id>,
  quantity: <quantity>
},
```

#### Success Response: ####
_Response (201 - Created)_
```
{
  "id": <id>,
  "ProductId": <product id>,
  "UserId": <UserId>,
  "quantity": <quantity>,
  "updatedAt": <date>,
  "createdAt": <date>
}
```

#### Error Response: ####
_Response (400 - Bad Request)_
```
[
  "message": <message detail>
]
```
_Response (401 - Unauthorized)_
```
{
  "message": "Not authenticated!"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### GET /carts/:id

> Get product by product id

_Request Header_
```
{
  "access_token": <your access token>
}
```

_Request Body_
```
not needed
```

#### Success Response: ####
_Response (200 - Ok)_
```
[
  {
    "id": <product id>,
    "UserId": <UserId>,
    "ProductId": <ProductId>,
    "quantity": <quantity>,
    "updatedAt": <date>,
    "createdAt": <date>
    "Product": {
      "id": <product id>,      
      "name": <product name>,
      "description": <product description>,
      "category": <product category>,
      "price": <product price>,
      "stock": <product stock>,
      "image_url": <product image>,
      "UserId": <UserId>
    }
  },
  {
    "id": <product id>,
    "UserId": <UserId>,
    "ProductId": <ProductId>,
    "quantity": <quantity>,
    "updatedAt": <date>,
    "createdAt": <date>
    "Product": {
      "id": <product id>,      
      "name": <product name>,
      "description": <product description>,
      "category": <product category>,
      "price": <product price>,
      "stock": <product stock>,
      "image_url": <product image>,
      "UserId": <UserId>
    }
  }
]
```

#### Error Response: ####
_Response (401 - Unauthorized)_
```
{
  "message": "Not authenticated!"
}
```
_Response (403 - Forbidden)_
```
{
  "message": "Forbidden access!"
}
```
_Response (404 - Not Found)_
```
{
  "message": "cart not found! "
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```



### DELETE /carts/:id

> Update product

_Request Header_
```
{
  "access_token": <your access token>
}
```

_Request Body_
```
not needed
```

#### Success Response: ####
_Response (200 - Ok)_
```
1
```

#### Error Response: ####
_Response (401 - Unauthorized)_
```
{
  "message": "Not authenticated!"
}
```
_Response (403 - Forbidden)_
```
{
  "message": "Forbidden access!"
}
```
_Response (404 - Not Found)_
```
{
  "message": "cart not found! "
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
