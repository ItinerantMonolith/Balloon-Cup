import { SET_USER, SET_AUTHENTICATED, UPDATE_NAME, HOME_MODE } from '../types'

const initialState = {
   id: '',
   name: '',
   email: '',
   token: localStorage.getItem('token'),
   isAuthenticated: localStorage.getItem('token') ? true : false,
   mode: 'Home',
}

const UserReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_USER:
         return { ...state, ...action.payload }

      case UPDATE_NAME:
         return { ...state, name: action.payload }

      case SET_AUTHENTICATED:
         return { ...state, isAuthenticated: action.payload }

      case HOME_MODE:
         return { ...state, mode: action.payload }

      default:
         return { ...state }
   }
}

export default UserReducer
