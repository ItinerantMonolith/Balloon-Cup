const { User } = require('../models')
const Race = require('./race')
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
      this.playerActions = [[],[]]
      this.nextPlayer = 0
      this.gameTurn = 1
   }

   gameState( forPlayer ) {
      return {
         players: this.players,
         deck: this.deck.length,
         discards: this.discards.length,
         bag: this.bag.length,
         trophies: this.trophies,
         races: this.races,
         nextPlayer: this.nextPlayer,
         gameActions: [ ...this.gameActions, ...this.playerActions[forPlayer] ],
         gameTurn: this.gameTurn,
      }
   }

   sendGameMessage( action ) {
        this.sockets[0].emit('game', { action: action, gameState: this.gameState(0) })
        this.sockets[1].emit('game', { action: action, gameState: this.gameState(1) })
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
         cubes: new Array(5).fill(0),
         trophies: [],
      }))
      this.players[0].name = await this.getPlayerName(players[0].id)
      this.players[1].name = await this.getPlayerName(players[1].id)
      this.sockets = players.map((player) => player.socket)
      this.deck = this.shuffle(this.createDeck())
      this.bag = this.shuffle(this.fillBag())
      this.discards = []
      for (let i = 1; i < 5; i++) {
          this.races.push(new Race(i))
      }
      this.races.forEach((race) => this.startRace(race))

      this.trophies = new Array(5)
         .fill({})
         .map((e, i) => ({ color: i, cost: 7 - i }))

      for (let i = 0; i < 2; i++)
         for (let j = 0; j < 8; j++) {
            this.players[i].cards.push(this.drawCard())
         }

      this.sortHands()
      this.checkValidPlays()
      this.gameActions.push('New Game Created')

      this.sockets[0].on('game_turn', ( gameTurn ) => this.processTurn(gameTurn, 0) )
      this.sockets[1].on('game_turn', ( gameTurn ) => this.processTurn(gameTurn, 1) )
   }

   launch () {
        this.sendGameMessage( 'Start Game' )
   }

   processTurn ( gameTurn, playerId ) {
        console.log ( 'got a game_turn message from player ', playerId )
        console.log ( gameTurn )
        this.gameActions = []
        this.playerActions = [[],[]]

        // gameTurn = { cardPlayed: 12, targetRace: 3, targetSide: 0, targetCard: 3 }
        // remove the card from the player's hand
        const cardPlayed = this.players[playerId].cards.splice( this.players[playerId].cards.findIndex( card => card.id === gameTurn.cardPlayed ), 1)[0]
        cardPlayed.validPlay = false
        // add the card to the race.
        const curRace = this.races[ gameTurn.targetRace ]
        curRace.addCard( cardPlayed, gameTurn.targetSide, gameTurn.targetCard )
        this.discardCard( cardPlayed )
        // add that to the gameActions
        const otherId = playerId === 0 ? 1 : 0
        this.gameActions.push(`${this.players[playerId].name} played the ${colors[cardPlayed.color]} ${cardPlayed.value} on ${this.players[gameTurn.targetSide].name}'s side of race #${gameTurn.targetRace + 1}`)
        // draw a card, add it to the playerActions
        const newCard = this.drawCard()
        this.players[playerId].cards.push(newCard)
        this.sortHands()
        this.playerActions[playerId].push(`You drew the ${colors[newCard.color]} ${newCard.value}.`)
        // set next player
        this.nextPlayer = otherId
        // check to see if the race is over.
        //      if it is, 
        //          set next player
        //          award the cubes, 
        //          discard the cards, 
        //          clear the race, 
        //          start a new race.
        //          record all that in gameActions
        //          check to see if trophies can be earned (for both players)
        // increment the turn counter
        // before the turn starts, make sure the current player is able to play cards
        //  if not, discard their hand and redraw (post-MVP implement the rule correctly)
        // send out the gameState

        this.checkValidPlays()
        this.sendGameMessage( 'update' )
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

   sortHands() {
      this.players.forEach((player) => {
         player.cards.sort((a, b) => {
            if (a.color < b.color) return -1
            else if (a.color > b.color) return 1

            return a.value - b.value
         })
      })
   }

   shuffle(deck) {
      const newDeck = []
      while (deck.length > 0)
         newDeck.push(
            deck.splice(
               Math.floor(Math.random() * Math.floor(deck.length)),
               1
            )[0]
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



   clearRace( race ) {
      // discard cards and cubes, flip the card
      const usedCards = race.endRace()
      usedCards.forEach ( card => this.discardCard(card))
   }

   startRace( race ) {
      // draw cubes and set up the card slots.
      // let's make sure there are enough cubes left in the bag, first
      if (this.bag.length >= race.raceNo ) {
         for (let i = 0; i < race.raceNo; i++) {
             race.addCube ( this.drawCube() )
         }
      } else {
         race.isOver = true
         this.gameActions.push(
            `Not enough cubes left for another race #${race.raceNo}.`
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
         for (let j = 1; j < 14; j++)
            if (!missing[i].includes(j)) {
               if (asCards) {
                  cards.push({
                     id: counter,
                     color: i,
                     value: j,
                     validPlay: false,
                  })
               } else {
                  cards.push({ id: counter, color: i })
               }
               counter++
            }

      return cards
   }

   checkValidPlays() {
      // find out what colors are available across all races.
      const available = new Array(5).fill(false)
      this.races.forEach((race) => {
         race.cards.forEach((cardSide) => {
            cardSide.forEach((card) => {
               if (card.id === -1) {
                  available[card.color] = true
               }
            })
         })
      })
      this.players.forEach((player) => {
         player.cards.forEach((card) => {
            card.validPlay = available[card.color]
         })
      })
   }
}

module.exports = Game
