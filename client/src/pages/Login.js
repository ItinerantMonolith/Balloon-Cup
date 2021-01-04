import React from 'react'
import { connect } from 'react-redux'
import {
   FormControl,
   Button,
   Icon,
   Grid,
   TextField,
   Paper,
} from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import {
   LoginUser,
   FormUpdateEmail,
   FormUpdatePassword,
   FormClear,
} from '../store/actions/UserActions'

const mapStateToProps = ({ userState }) => {
   return { userState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      login: (email, password) => dispatch(LoginUser(email, password)),
      updateEmail: (email) => dispatch(FormUpdateEmail(email)),
      updatePassword: (password) => dispatch(FormUpdatePassword(password)),
      clearForm: () => dispatch(FormClear()),
   }
}

function Login(props) {
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
         // +== manage errors here
         props.history.push('/')
      }
   }

   return (
      <div>
         <Paper elevation={6}>
            <Grid container justify="center" style={{ margin: '20px' }}>
               <FormControl className="flex-col" onSubmit={handleSubmit}>
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
                     style={{ backgroundColor: '#9a9a9a', color: 'white' }}
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
         </Paper>
      </div>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
