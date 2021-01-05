import {
   SET_USER,
   SET_AUTHENTICATED,
   UPDATE_NAME,
   USER_CONNECT,
   USER_DISCONNECT,
   USER_START_GAME,
   FORM_UPDATE_NAME,
   FORM_UPDATE_EMAIL,
   FORM_UPDATE_PASSWORD,
   FORM_UPDATE_PASSWORD2,
   FORM_UPDATE_OLD_PASSWORD,
   FORM_ERROR,
   FORM_CLEAR
} from '../types'

import {
   __RegisterUser,
   __LoginUser,
   __UpdateName,
   __UpdatePasword,
} from '../../services/UserService'

export const RegisterUser = (name, email, password) => async (dispatch) => {
   try {
      const user = await __RegisterUser(name, email, password)

      dispatch({
         type: SET_USER,
         payload: {
            id: user.id,
            name: user.name,
            email: user.email,
            authenticated: true,
         },
      })
   } catch (err) {
      console.log('Error in RegisterUser', err)
      throw err
   }
}

export const LoginUser = (email, password) => async (dispatch) => {
   try {
      const user = await __LoginUser(email, password)
      dispatch({
         type: SET_USER,
         payload: {
            id: user.id,
            name: user.name,
            email: user.email,
            authenticated: true,
         },
      })
   } catch (err) {
      console.log('Error in LoginUser', err)
      throw err
   }
}

export const UpdateUserPassword = (email, oldPassword, newPassword) => async (dispatch) => {
   try {
      const res = await __UpdatePasword(email, oldPassword, newPassword)

      // if the password update is successful, we don't need to change the state at all
   } catch (err) {
      console.log('Error in UpdatePassword', err)
      throw err
   }
}

export const UpdateUserName = (email, name) => async(dispatch) => {
   try {
      const user = await __UpdateName(email, name)

      dispatch({
         type: UPDATE_NAME,
         payload: user.name,
      })
   } catch (err) {
      console.log('Error in UpdateName', err)
      throw err
   }
}

export const ConnectToGame = ( socket ) => ({
    type: USER_CONNECT,
    payload: socket
})

export const DisconnectFromGame = () => ( {
    type: USER_DISCONNECT,
    payload: ''
})

export const setAuthenticated = (isAuthenticated) => ({
   type: SET_AUTHENTICATED,
   payload: isAuthenticated,
})

export const FormUpdateName = (name) => ({
   type: FORM_UPDATE_NAME,
   payload: name,
})

export const FormUpdateEmail = (email) => ({
   type: FORM_UPDATE_EMAIL,
   payload: email,
})

export const FormUpdatePassword = (password) => ({
   type: FORM_UPDATE_PASSWORD,
   payload: password,
})

export const FormUpdatePassword2 = (password) => ({
   type: FORM_UPDATE_PASSWORD2,
   payload: password,
})

export const FormUpdateOldPassword = (password ) => ({
    type: FORM_UPDATE_OLD_PASSWORD,
    payload: password
})

export const FormSetError = (err) => ({
   type: FORM_ERROR,
   payload: err,
})

export const FormClear = () => ({
    type: FORM_CLEAR,
    payload: ''
})

