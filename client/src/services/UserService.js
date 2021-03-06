import ApiClient from './ApiClient'

/*
   __LoginUser(email,password) returns a user object
   { 
      id: <userId>, 
      name:  <displayName>, 
      email: <userEmail>
   }

   on failure (401), it will return 
   { 
      msg: "unauthorized" 
   }
*/

export const __LoginUser = async (email, password) => {
   try {
      const resp = await ApiClient.post('/user/login', { email, password })
      localStorage.setItem('token', resp.data.token)
      return resp.data.user
   } catch (err) {
      throw err
   }
}

/* 
   __RegisterUser(name, email, password) returns a user object
   { 
      id: <userId>, 
      name:  <displayName>, 
      email: <userEmail>
   }
*/
export const __RegisterUser = async (name, email, password) => {
   try {
      const resp = await ApiClient.post('/user/create', {
         name,
         email,
         password,
      })
      localStorage.setItem('token', resp.data.token)
      return resp.data.user
   } catch (err) {
      throw err
   }
}


/*
   __UpdatePassword returns an object
   { msg: 'Password updated' }
*/
export const __UpdatePasword = async ( email, oldPassword, newPassword ) => {
   try {
      const res = await ApiClient.put('/user/password', { email, oldPassword, newPassword } )
      return res.data
   }
   catch (err ) {
      throw err
   }
}

/*
   __UpdateName returns a user object
   { 
      id: <userId>, 
      name:  <displayName>, 
      email: <userEmail>
   }
   
*/
export const __UpdateName = async ( email, name ) => {
   try {
      const res = await ApiClient.put('/user/name', { email, name } )
      return res.data.user
   }
   catch (err ){
      throw err
   }
}

// check that we have a valid token and refresh it
export const __CheckSession = async () => {
   try {
      const res = await ApiClient.get('/user/refresh/session')
      return res.data
   } catch (err) {
      throw err
   }
}


export const __GetUserHistory = async ( playerId ) => {
    try {
        const res = await ApiClient.get(`/user/history/${playerId}` )
        return res.data
    }
    catch (err) {
        throw err
    }
}