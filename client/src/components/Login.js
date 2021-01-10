import React, { useState } from 'react'
import { connect } from 'react-redux'
import { FormControl, Button, Icon, Grid, TextField } from '@material-ui/core'
import { LoginUser, SetHomeMode } from '../store/actions/UserActions'

import myStyles from '../styles/myStyles'

const mapStateToProps = ({ userState }) => {
   return { userState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      login: (email, password) => dispatch(LoginUser(email, password)),
      setHomeMode: () => dispatch(SetHomeMode('Home')),
   }
}

function Login(props) {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [formError, setFormError] = useState(false)
   const styles = myStyles()

   const handleEmail = ({ target }) => {
      setEmail(target.value)
   }

   const handlePassword = ({ target }) => {
      setPassword(target.value)
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      setFormError(false)
      // make sure we have at least some appropriate data...
      if (email.length && password.length) {
         try {
            await props.login(email, password)
            props.setHomeMode()
         } catch (err) {
            setFormError(true)
         }
      }
   }

   return (
      <div>
         <Grid container justify="center">
            <FormControl
               className="flex-col"
               onSubmit={handleSubmit}
               style={{ margin: '20px' }}
            >
               <div className={`${styles.defaultText} ${styles.size2}`}>
                  Login
               </div>
               <TextField
                  placeholder="Your Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmail}
               />
               <TextField
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handlePassword}
               />
               <br />
               <Button
                  onClick={handleSubmit}
                  variant="contained"
                  style={{
                     backgroundColor: '#2e56e9',
                     color: 'white',
                     fontFamily: 'Yeon Sung',
                  }}
                  endIcon={<Icon>person</Icon>}
               >
                  Login
               </Button>
               {formError ? (
                  <p style={{ color: 'red' }}>Error While Logging In</p>
               ) : (
                  <p></p>
               )}
            </FormControl>
         </Grid>
      </div>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
