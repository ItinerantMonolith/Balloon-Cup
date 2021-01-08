const Game = require('./game')

class GameManager {
   constructor() {
      this.players = []
      this.games = []
   }

   disconnectPlayer(socket) {
      // for now, just remove the player from the array
      const index = this.players.findIndex(
         (player) => player.socket.id === socket.id
      )
      if (index >= 0) {
         const player = this.players[index]
         // if the player is in a game that is not over, we should let the other player know to disconnect, then kill the game.
         if (player.game && !player.game.isOver) {
            const otherSocket = player.game.getOtherSocket(player.id)
            if (otherSocket) {
                otherSocket.emit(
                  'lost_player',
                  'Other Player Disconnected'
               )
            }
         }

         player.game = null
         this.players.splice(index, 1)
      }
   }

   addPlayer(socket) {
      const player = {
         id: socket.handshake.query.userId,
         socket: socket,
         status: 'WAITING',
         game: null,
      }

      this.players.push(player)

      console.log('player', player.id)

      socket.on('disconnect', () => {
         console.log('player', socket.handshake.query.userId, 'disconnected')
         this.disconnectPlayer(socket)
      })

      this.players.forEach((e) => console.log(e.id))
      this.checkForPair()
   }

   checkForPair = async () => {
      const available = this.players
         .map((player, index) => (player.status === 'WAITING' ? index : null))
         .filter((e) => e !== null)

      if (available.length < 2) return

      const game = new Game()

      let playerOrder = []
      this.players[available[0]].status = 'PLAYING'
      this.players[available[0]].game = game
      this.players[available[1]].status = 'PLAYING'
      this.players[available[1]].game = game

      Math.random() > 0.5 ? (playerOrder = [0, 1]) : (playerOrder = [1, 0])

      await game.launch([
         this.players[available[playerOrder[0]]],
         this.players[available[playerOrder[1]]],
      ])

      //   this.games.push(game)
   }

   getSocketByID(id) {
      return this.sockets.find(
         (socket) => socket.handshake.query['userId'] === id
      )
   }

   testSocket(socket) {
      socket.emit('game', 'The Game is Afoot!')
   }
}

module.exports = GameManager
