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
               otherSocket.emit('game', {
                  action: 'Lost Player',
                  gameState: {},
               })
            }
         }

         player.game = null
         this.players.splice(index, 1)
      }
   }

   addPlayer(socket) {
      // let's make sure this player isn't already connected...if so, ignore it.
      if (this.players.find((e) => e.id === socket.handshake.query.userId)) {
          console.log ( 'connection request from', socket.handshake.query.userId, 'REJECTED as they are already connected')
          return
      }

      const player = {
         id: socket.handshake.query.userId,
         socket: socket,
         status: 'LOBBY',
         autoAccept: false,
         game: null,
      }

      this.players.push(player)

      console.log('player', player.id)

      socket.on('disconnect', () => {
         console.log('player', socket.handshake.query.userId, 'disconnected')
         this.disconnectPlayer(socket)
      })

      // listen for lobby messages from this player
      socket.on('lobby', (lobbyAction) => this.handleLobbyMsg(socket, lobbyAction) )

      // announce to the lobby that this person has joined? +==
      // send an ack back to the player that they've joined the lobby ( getInfo? )

      this.players.forEach((e) => console.log(e.id, e.status))
    //   this.checkForPair()
   }

   handleLobbyMsg = ( socket, action ) => {
       // actions always have type, may have other elements
       // valid message actions are:
       // { type: 'getInfo'}
       //       return everyone in the lobby
       // { type: 'challenge', player: <playerId> }
       //       request a game against playerId
       // { type: 'say', text: <msg> }
       //       chat in the lobby text
       // { type: 'whisper', text: '<msg>', player: <playerId> }
       //       send a whisper to this player
       // { type: 'exit' }
       //       exit the lobby, disconnect.
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
