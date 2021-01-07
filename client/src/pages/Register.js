import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Nav from '../components/Nav'
import {
   FormControl,
   Button,
   Icon,
   Grid,
   TextField,
   Paper,
} from '@material-ui/core'
import {
   RegisterUser,
   FormUpdateName,
   FormUpdateEmail,
   FormUpdatePassword,
   FormUpdatePassword2,
   FormClear,
} from '../store/actions/UserActions'

const mapStateToProps = ({ userState }) => {
   return { userState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      register: (name, email, password) =>
         dispatch(RegisterUser(name, email, password)),
      updateName: (name) => dispatch(FormUpdateName(name)),
      updateEmail: (email) => dispatch(FormUpdateEmail(email)),
      updatePassword: (password) => dispatch(FormUpdatePassword(password)),
      updatePassword2: (password) => dispatch(FormUpdatePassword2(password)),
      clearForm: () => dispatch(FormClear()),
   }
}

function Register(props) {
   const handleName = ({ target }) => {
      props.updateName(target.value)
   }

   const handleEmail = ({ target }) => {
      props.updateEmail(target.value)
   }

   const handlePassword = ({ target }) => {
      props.updatePassword(target.value)
   }

   const handleConfirmPassword = ({ target }) => {
      props.updatePassword2(target.value)
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      // make sure we have at least some appropriate data...
      if (
         props.userState.formName.length &&
         props.userState.formEmail.length &&
         props.userState.formPasswordsMatch
      ) {
         props.register(
            props.userState.formName,
            props.userState.formEmail,
            props.userState.formPassword
         )
         props.clearForm()
         props.history.push('/')
      }
   }

   return (
      <div>
          <Nav />
         <Paper elevation={6}>
            <Grid container justify="center" style={{ margin: '20px' }}>
               <FormControl className="flex-col" onSubmit={handleSubmit}>
                  <TextField
                     placeholder="Your Name"
                     type="text"
                     name="name"
                     value={props.userState.formName}
                     onChange={handleName}
                  />
                  <TextField
                     placeholder="Your Email"
                     name="email"
                     value={props.userState.formEmail}
                     type="email"
                     onChange={handleEmail}
                  />

                  <TextField
                     placeholder="Password"
                     type="password"
                     name="password"
                     value={props.userState.formPassword}
                     onChange={handlePassword}
                  />
                  <TextField
                     placeholder="Confirm Password"
                     type="password"
                     name="confirmPassword"
                     value={props.userState.formPassword2}
                     onChange={handleConfirmPassword}
                  />
                  <br />
                  {props.userState.formPassword.length &&
                  props.userState.formPasswordsMatch ? (
                     <p></p>
                  ) : (
                     <p>Passwords must match</p>
                  )}
                  <Button
                     onClick={handleSubmit}
                     variant="contained"
                     color="primary"
                     endIcon={<Icon>person_add</Icon>}
                  >
                     Register
                  </Button>

                  {props.userState.formError ? <p>Account Error</p> : <p></p>}
               </FormControl>
            </Grid>
         </Paper>
      </div>
   )
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withRouter(Register))
