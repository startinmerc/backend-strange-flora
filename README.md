# Backend for Strange Flora

## [Live Site](https://strange-flora.herokuapp.com/)

## [Frontend Repo](https://github.com/startinmerc/strange-flora)

#### Backend API built on:

* Mongo
* Mongoose
* Express
* BodyParser
* CORS
* Node

The backend API for Strange Flora, a React eCommerce site.
API development is tested during development using Postman.

---

### V1.0

#### Init
* Install base dependencies
* Create `index`

#### Basic Errors
* Create error handler in index
* Create `handlers/error` to format JSON errors
* Use in app

#### Model Schemas
* Create `models/index`
* Add all basic schemas based on [frontend seeds](https://github.com/startinmerc/strange-flora/blob/master/src/seeds.js)

#### User Schema Auth
* Add preSave bcrypt to encrypt password
* Add comparePassword to check correct password

#### Auth Handlers 1
* Add .env
* Async signup
* Signup JWT
* Handle validation error
* Add signup route

#### Auth Handlers 2
* Add signin handler
* Include in routes

#### Reviews
* Link Users and Reviews
* Include in `models/index`
* Include in `index.js`
* Add routes