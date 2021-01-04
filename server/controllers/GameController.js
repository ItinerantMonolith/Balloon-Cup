const { Game, GameTurn } = require ('../models')


//  /:game_id
// return the game with the current turn?

const GetGame = async ( req, resp ) => {
   try {

   }
   catch (err) {
      console.log ( "Error in GameController.GetGame", err)
      throw err
   }
}


// /:player1/:player2

// return the game with the current turn
const CreateGame = async ( req, resp ) => {
    try {

    }
    catch (err) {
        console.log ( "Error in GameController.CreateGame", err )
        throw err
    }
}


// /:game_id
// playerAction is in the body
const ProcessAction = async ( req, resp ) => {
    try {

    }
    catch (err) {
        console.log ( "Error in GameController.ProcessAction", err )
        throw err
    }
}


module.exports = {
   GetGame,
   CreateGame,
   ProcessAction

}
