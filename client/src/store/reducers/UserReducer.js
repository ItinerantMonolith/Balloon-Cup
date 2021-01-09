import {
   SET_USER,
   SET_AUTHENTICATED,
   UPDATE_NAME,
   FORM_UPDATE_NAME,
   FORM_UPDATE_EMAIL,
   FORM_UPDATE_PASSWORD,
   FORM_UPDATE_PASSWORD2,
   FORM_UPDATE_OLD_PASSWORD,
   FORM_ERROR,
   FORM_CLEAR,
   HOME_MODE,
} from '../types'

const initialState = {
   id: '',
   name: '',
   email: '',
   token: localStorage.getItem('token'),
   isAuthenticated: localStorage.getItem('token') ? true : false,
   formName: '',
   formEmail: '',
   formPassword: '',
   formPassword2: '',
   formOldPassword: '',
   formPasswordsMatch: false,
   formError: false,
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

      case FORM_UPDATE_NAME:
         return { ...state, formName: action.payload }

      case FORM_UPDATE_EMAIL:
         return { ...state, formEmail: action.payload }

      case FORM_UPDATE_PASSWORD:
         return {
            ...state,
            formPassword: action.payload,
            formPasswordsMatch: action.payload === state.formPassword2,
         }

      case FORM_UPDATE_PASSWORD2:
         return {
            ...state,
            formPassword2: action.payload,
            formPasswordsMatch: action.payload === state.formPassword,
         }

      case FORM_UPDATE_OLD_PASSWORD:
         return { ...state, formOldPassword: action.payload }

      case FORM_ERROR:
         return { ...state, formError: action.payload }

      case FORM_CLEAR:
         return {
            ...state,
            formName: '',
            formEmail: '',
            formPassword: '',
            formPassword2: '',
            formOldPassword: '',
            formPasswordsMatch: false,
            formError: false,
         }

      case HOME_MODE:
         return { ...state, mode: action.payload }

      default:
         return { ...state }
   }
}

export default UserReducer
