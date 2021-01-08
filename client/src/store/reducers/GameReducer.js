import {
   GAME_SET_STATE,
   GAME_CONNECT,
   GAME_DISCONNECT,
   GAME_SET_ME,
   GAME_CARD_SELECT,
   GAME_MSG_TOGGLE,
   GAME_OVER,
   GAME_RESET,
   GAME_LOST_OPP
} from '../types'

const initialState = {
   players: [],
   deck: 0,
   bag: 0,
   discards: 0,
   races: [],
   trophies: [],
   nextPlayer: 0,
   me: 0,
   opp: 1,
   selectedCard: -1,
   selectedColor: -1,
   connection: null,
   gameStatus: '',
   gameActionHeader: '',
   gameActions: [],
   hasMessage: false,
   gameTurn: 0,
   lostOpponent: false,
}

const GameReducer = (state = initialState, action) => {
   switch (action.type) {
      case GAME_SET_STATE:
          const header = action.payload.gameActions.shift()
         return {
            ...state,
            players: action.payload.players,
            deck: action.payload.deck,
            bag: action.payload.bag,
            discards: action.payload.discards,
            races: action.payload.races,
            trophies: action.payload.trophies,
            nextPlayer: action.payload.nextPlayer,
            gameActionHeader: header,
            gameActions: action.payload.gameActions,
            hasMessage: action.payload.gameActions.length ? true : false,
            gameTurn: action.payload.gameTurn,
            gameStatus: 'ACTIVE',
         }

      case GAME_OVER:
         return {
            ...state,
            gameStatus: 'GAME OVER',
         }

      case GAME_RESET:
         return { ...state, ...initialState }

      case GAME_LOST_OPP:
         return { ...state, lostOpponent: true }

      case GAME_MSG_TOGGLE:
         return {
            ...state,
            hasMessage: action.payload,
         }

      case GAME_SET_ME:
         return {
            ...state,
            me: action.payload ? 0 : 1,
            opp: action.payload ? 1 : 0,
         }

      case GAME_CONNECT:
         return { ...state, connection: action.payload, gameStatus: 'PENDING' }

      case GAME_DISCONNECT:
         return { ...state, connection: null, gameStatus: '' }

      case GAME_CARD_SELECT:
         let selectedColor = 0
         let cardTest = action.payload
         const colorCount = [13, 11, 9, 7, 5]
         cardTest -= colorCount[selectedColor]
         while (cardTest >= 0) {
            selectedColor++
            cardTest -= colorCount[selectedColor]
         }
         if (action.payload === -1) selectedColor = -1
         return {
            ...state,
            selectedCard: action.payload,
            selectedColor: selectedColor,
         }

      default:
         return { ...state }
   }
}

export default GameReducer
