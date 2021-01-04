import { SET_GAME } from '../types'

const initialState = {
   players: [],
   deck: [],
   bag: [],
   discards: [],
   races: [],
   trophies: [],
}

const GameReducer = (state = initialState, action) => {

   switch (action.type) {

      default:
         return { ...state }
   }
}

export default GameReducer
