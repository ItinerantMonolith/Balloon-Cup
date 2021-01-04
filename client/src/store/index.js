import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import GameReducer from './reducers/GameReducer'
import UserReducer from './reducers/UserReducer'

const store = createStore(
   combineReducers({ gameState: GameReducer, userState: UserReducer }),
   composeWithDevTools(applyMiddleware(thunk) )
)

export default store
