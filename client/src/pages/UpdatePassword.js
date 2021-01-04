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
   UpdateUserPassword,
   FormUpdatePassword,
   FormUpdatePassword2,
   FormUpdateOldPassword,
   FormClear,
} from '../store/actions/UserActions'

const mapStateToProps = ({ userState }) => {
   return { userState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      updateUserPassword: (email, oldPassword, newPassword) =>
         dispatch(UpdateUserPassword(email, oldPassword, newPassword)),
      updatePassword: (password) => dispatch(FormUpdatePassword(password)),
      updatePassword2: (password) => dispatch(FormUpdatePassword2(password)),
      updateOldPassword: (password) =>
         dispatch(FormUpdateOldPassword(password)),
      clearForm: () => dispatch(FormClear()),
   }
}

function UpdatePassword(props) {
   const handleOldPassword = ({ target }) => {
      props.updateOldPassword(target.value)
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
         props.userState.formPassword.length &&
         props.userState.formPasswordsMatch
      ) {
         props.updateUserPassword(
            props.userState.email,
            props.userState.formOldPassword,
            props.userState.formPassword
         )
         props.clearForm()
         props.history.push('/')
      }
   }
   return (
      <div className="signup flex-col center">
         <Paper elevation={6}>
            <Grid container justify="center" style={{ margin: '20px' }}>
               <FormControl className="flex-col" onSubmit={handleSubmit}>
                  <TextField
                     placeholder="Enter Old Password"
                     type="password"
                     name="old password"
                     value={props.userState.formOldPassword}
                     onChange={handleOldPassword}
                  />
                  <TextField
                     placeholder="Enter New Password"
                     type="password"
                     name="new password"
                     value={props.userState.formPassword}
                     onChange={handlePassword}
                  />
                  <TextField
                     placeholder="Confirm New Password"
                     type="password"
                     name="new password"
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
                  <br />
                  <Button
                     onClick={handleSubmit}
                     variant="contained"
                     style={{ backgroundColor: '#9a9a9a', color: 'white' }}
                     endIcon={<Icon>person</Icon>}
                  >
                     Submit
                  </Button>
               </FormControl>
            </Grid>
         </Paper>
      </div>
   )
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withRouter(UpdatePassword))
