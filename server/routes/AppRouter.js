const Router = require('express').Router()

const UserRouter = require('./UserRouter')
const GameRouter = require('./GameRouter')

Router.use('/user', UserRouter)
Router.use('/game', GameRouter)

module.exports = Router