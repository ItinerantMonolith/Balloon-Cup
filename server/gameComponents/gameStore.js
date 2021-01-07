const { User, Game, GameTurn } = require('../models')
const { Op } = require("sequelize");

// encapsulates all db behavior related to games

class GameStore {
    constructor () {
        this.gameId= ''
    }

    getExistingGame = async ( players ) => {
        try {
            const oldGame = await Game.findOne( {
                attributes: ['id'],
                where: {
                    [Op.or]: [
                      { player0_id: players[0].id, player1_id: players[1].id },
                      { player0_id: players[1].id, player1_id: players[0].id },
                    ],
                    status: 'ACTIVE'
                  }
            })
            if ( oldGame ) {
                this.gameId = oldGame.dataValues.id

                // now get the most recent game turn
                const lastTurn = await GameTurn.findOne( {
                    where: {
                        game_id: this.gameId
                    },
                    order:  [['turn', 'DESC']]
                })
                return lastTurn.dataValues
            }
            else {
                console.log ( 'no existing game' )
                return null
            }
        }
        catch ( err ){
            console.log ( "Error in gameStore.getExistingGame", err)
            throw err
        }        
    }

    createGame = async ( players ) => {
        //  create a new game record
        try {
            const newUser = await Game.create ( {
                player0_id: players[0].id,
                player1_id: players[1].id,
                status: 'ACTIVE',
                winner: -1
            } )

            this.gameId = newUser.id
            return newUser.id
        }
        catch (err) {
            console.log ( "error in gameStore.createGame", err )
            throw err
        }
    }

    getPlayerName = async (id) => {
        try {
           const user = await User.findOne({
              attributes: ['name'],
              where: { id: id },
           })
           if (user) {
              return user.dataValues.name
           }
           return 'Not Found'
        } catch (err) {
           console.log('Error in Game.getPlayerName', err)
           throw err
        }
     }
  
     storeGame = async ( gameState, playerAction ) => {
        const gameData = {
            gameId: this.gameId,
            turn: gameState.gameTurn,
            player: gameState.nextPlayer,
            playerAction: playerAction,
            gameAction: {},
            gameState: gameState
        }

        try {
            await GameTurn.create( gameData )
        }
        catch (err) {
            console.log ( "Error in gameStore.storeGame", err)
            throw err
        }
     }

     endGame = async ( winner ) => {
         try {
            await Game.update(
                { winner: winner, status: 'COMPLETE' },
                { where: { id: this.gameId } }
            )
         }
         catch (err) {
             console.log ( "Error in gameStore.endGame", err )
             throw err
         }
     }
}

module.exports = GameStore