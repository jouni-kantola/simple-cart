# simple-cart
Tiny web shop with a cart, running on Koa.

## Getting started
* To build, use `[NODE_ENV=production] gulp` (a production build minifies scripts and styles)
* Start simple-cart by `PORT=9876 node --harmony index.js`

## More products?
* Use your favourite RESTful API testing tool and `POST /products`
* ...or go ahead and add them to `./server/db/carts.json`

## API
| Method |     URL     | Action                                                   |
|--------|-------------|----------------------------------------------------------|
| GET    | /products   | List all products                                        |
| GET    | /products/1 | Get product with ID 1                                    |
| POST   | /products   | Adds new product, with details from request body         |
| PUT    | /products/1 | Updates product, with details from request body          |
| DELETE | /products/1 | Deletes product                                          |
| GET    | /carts      | List all carts                                           |
| GET    | /carts/1    | Get cart with ID 1                                       |
| POST   | /carts      | Adds new cart, ails from request body                    |
| PUT    | /carts/1    | Updates cart, with details from request body             |
| DELETE | /carts/1    | Deletes cart                                             |