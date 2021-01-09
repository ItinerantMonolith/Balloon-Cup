import React from 'react'
import { connect } from 'react-redux'
import {
   FormControl,
   Button,
   Icon,
   Grid,
   TextField,
} from '@material-ui/core'
import {
   LoginUser,
   FormUpdateEmail,
   FormUpdatePassword,
   FormClear,
   SetHomeMode
} from '../store/actions/UserActions'

import myStyles from '../styles/myStyles'

const mapStateToProps = ({ userState }) => {
   return { userState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      login: (email, password) => dispatch(LoginUser(email, password)),
      updateEmail: (email) => dispatch(FormUpdateEmail(email)),
      updatePassword: (password) => dispatch(FormUpdatePassword(password)),
      clearForm: () => dispatch(FormClear()),
      setHomeMode: () => dispatch(SetHomeMode('Home'))
   }
}

function Login(props) {
    const styles = myStyles()

   const handleEmail = ({ target }) => {
      props.updateEmail(target.value)
   }

   const handlePassword = ({ target }) => {
      props.updatePassword(target.value)
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      // make sure we have at least some appropriate data...
      if (
         props.userState.formEmail.length &&
         props.userState.formPassword.length
      ) {
         props.login(props.userState.formEmail, props.userState.formPassword)
         props.clearForm()
         props.setHomeMode()
         // +== manage errors here
         
      }
   }

   return (
      <div>
         <Grid container justify="center">
            <FormControl className="flex-col" onSubmit={handleSubmit} style={{ margin: '20px' }}>
                <div className={`${styles.defaultText} ${styles.size2}`}>Login</div>
               <TextField
                  placeholder="Your Email"
                  name="email"
                  type="email"
                  value={props.userState.formEmail}
                  onChange={handleEmail}
               />
               <TextField
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={props.userState.formPassword}
                  onChange={handlePassword}
               />
               <br />
               <Button
                  onClick={handleSubmit}
                  variant="contained"
                  style={{ backgroundColor: '#2e56e9', color: 'white', fontFamily: 'Yeon Sung' }}  
                  endIcon={<Icon>person</Icon>}
               >
                  Login
               </Button>
               {props.userState.formError ? (
                  <p>Error While Logging In</p>
               ) : (
                  <p></p>
               )}
            </FormControl>
         </Grid>
      </div>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
