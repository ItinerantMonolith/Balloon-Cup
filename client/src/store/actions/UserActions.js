import {
   SET_USER,
   SET_AUTHENTICATED,
   UPDATE_NAME,
   HOME_MODE,
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
            isAuthenticated: true,
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
            isAuthenticated: true,
         },
      })
   } catch (err) {
      console.log('Error in LoginUser', err)
      throw err
   }
}

export const UpdateUserPassword = (email, oldPassword, newPassword) => async (
   dispatch
) => {
   try {
      await __UpdatePasword(email, oldPassword, newPassword)

      // if the password update is successful, we don't need to change the state at all
   } catch (err) {
      console.log('Error in UpdatePassword', err)
      throw err
   }
}

export const UpdateUserName = (email, name) => async (dispatch) => {
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

export const VerifyUser = ( sessionInfo ) => ({
    type: SET_USER,
    payload: {
        id: sessionInfo.id,
        name: sessionInfo.name,
        email: sessionInfo.email,
        isAuthenticated: true
    }
})

export const Logout = () => ({
   type: SET_USER,
   payload: {
      id: '',
      name: '',
      email: '',
      isAuthenticated: false,
   },
})

export const setAuthenticated = (isAuthenticated) => ({
   type: SET_AUTHENTICATED,
   payload: isAuthenticated,
})

export const SetHomeMode = (mode) => ({
   type: HOME_MODE,
   payload: mode,
})
