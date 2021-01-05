const { User } = require('../models')
const colors = ['Red', 'Yellow', 'Green', 'Blue', 'Gray']

class Game {
   constructor() {
      this.players = []
      this.deck = []
      this.bag = []
      this.discards = []
      this.races = []
      this.trophies = []
      this.sockets = []
      this.gameActions = []
      this.nextPlayer = 0
   }

   gameState() {
      return {
         players: this.players,
         deck: this.deck.length,
         discards: this.discards.length,
         bag: this.bag.length,
         trophies: this.trophies,
         races: this.races,
         nextPlayer: this.nextPlayer
      }
   }

   sendGameMessage(message, player = -1) {
      if (player === 0 || player === -1) this.sockets[0].emit('game', message)

      if (player === 1 || player === -1) this.sockets[1].emit('game', message)
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

   createGame = async (players) => {
      this.players = players.map((player) => ({
         id: player.id,
         name: '',
         cards: [],
         cubes: [],
         trophies: [],
      }))
      this.players[0].name = await this.getPlayerName(players[0].id)
      this.players[1].name = await this.getPlayerName(players[1].id)
      this.sockets = players.map((player) => player.socket)
      this.deck = this.shuffle(this.createDeck())
      console.log ( 'deck', this.deck)
      this.bag = this.shuffle(this.fillBag())
      console.log ( 'bag', this.bag)
      this.discards = []
      this.races = new Array(4).fill({}).map((e, i) => ({
         isLow: e % 2 ? false : true,
         cards: [[], []],
         cubes: [],
         isOver: false,
      }))
      this.trophies = new Array(5).fill({}).map((e, i) => ({ color: i, cost: 7 - i }))

      for (let i = 0; i < this.races.length; i++) {
         this.startRace(i)
      }

      for (let i = 0; i < 2; i++)
         for (let j = 0; j < 8; j++) {
            this.players[i].cards.push(this.drawCard())
         }

      this.gameActions.push('New Game Created')
   }

   setGame(state) {
      this.players = state.players
      this.deck = state.deck
      this.bag = state.bag
      this.discards = state.discard
      this.races = state.races
      this.trophies = state.trophies
      this.gameActions = []
   }

   shuffle(deck) {
      const newDeck = []
      while (deck.length > 0)
         newDeck.push(
            deck.splice(Math.floor(Math.random() * Math.floor(deck.length)), 1)[0]
         )

      return newDeck
   }

   drawCube() {
      return this.bag.pop()
   }

   drawCard() {
      if (this.deck.length < 1) {
         this.deck = this.shuffle([...this.discards])
         this.discards = []
         this.gameActions.push('Deck shuffled.')
      }
      return this.deck.pop()
   }

   discardCard(card) {
      this.discards.push(card)
   }

   isRaceOver(raceId) {
      this.races[raceId].cards.forEach((e) =>
         e.forEach((card) => {
            if (card.id === -1) return false
         })
      )
      return true
   }

   endRace(raceId) {
      // discard cards and cubes, flip the card
      this.races[raceId].cards.forEach((side) => {
         while (side.length) {
            const card = side.pop()
            this.discardCard(card)
         }
      })
      this.races[raceId].cubes = [] // these should have already been given to the winning player
      this.races[raceId].isLow = !this.races[raceId].isLow
   }

   startRace(raceId) {
      // draw cubes and set up the card slots.
      // let's make sure there are enough cubes left in the bag, first
      if (this.bag.length > raceId) {
         for (let i = 0; i <= raceId; i++) {
            const newCube = this.drawCube()
            this.races[raceId].cubes.push(newCube)
            this.races[raceId].cards.forEach((e) =>
               e.push({ id: -1, color: newCube.color })
            )
         }
      } else {
         this.races[raceId].isOver = true
         this.gameActions.push(
            `Not enough cubes left for another race #${raceId + 1}.`
         )
      }
   }

   fillBag() {
      return this.createDeck(false)
   }

   createDeck(asCards = true) {
      const cards = []

      const missing = [
         [],
         [4, 10],
         [3, 5, 9, 11],
         [2, 4, 6, 8, 10, 12],
         [2, 3, 5, 6, 8, 9, 11, 12],
      ]

      let counter = 0
      for (let i = 0; i < colors.length; i++)
         for (let j = 0; j < 13; j++)
            if (!missing[i].includes(j)) {
               if (asCards) {
                  cards.push({ id: counter, color: i, value: j })
               } else {
                  cards.push({ id: counter, color: i })
               }
               counter++
            }

      return cards
   }
}

module.exports = Game
