const Router = require('express').Router()

const controller = require('../controllers/GameController')

Router.get('/:game_id', controller.GetGame) 
Router.post('/:player1/:player2', controller.CreateGame) 
Router.put('/:game_id', controller.ProcessAction)

module.exports = Router
