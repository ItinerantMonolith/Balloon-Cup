import React, { useState } from 'react'
import { connect } from 'react-redux'
import { FormControl, Button, Icon, Grid, TextField } from '@material-ui/core'
import {
   UpdateUserPassword,
   SetHomeMode,
   FormSetError,
} from '../store/actions/UserActions'

const mapStateToProps = ({ userState }) => {
   return { userState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      updateUserPassword: (email, oldPassword, newPassword) =>
         dispatch(UpdateUserPassword(email, oldPassword, newPassword)),

      setHomeMode: (mode) => dispatch(SetHomeMode(mode)),
   }
}

function UpdatePassword(props) {
   const [passwordOld, setPasswordOld] = useState('')
   const [password, setPassword] = useState('')
   const [password2, setPassword2] = useState('')
   const [formError, setFormError] = useState(false)
   const [passwordsMatch, setPasswordsMatch] = useState(true)

   const handleOldPassword = ({ target }) => {
      setPasswordOld(target.value)
   }

   const handlePassword = ({ target }) => {
      setPassword(target.value)
   }

   const handleConfirmPassword = ({ target }) => {
      setPassword2(target.value)
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      setFormError(false)
      // make sure we have at least some appropriate data...
      if (password.length && passwordsMatch) {
         try {
            await props.updateUserPassword(
               props.userState.email,
               passwordOld,
               password
            )
            props.setHomeMode('Home')
         } catch (err) {
            setFormError(true)
         }
      }
   }
   return (
      <Grid container justify="center" style={{ margin: '20px' }}>
         <FormControl className="flex-col" onSubmit={handleSubmit}>
            <TextField
               placeholder="Enter Old Password"
               type="password"
               name="old password"
               value={passwordOld}
               onChange={handleOldPassword}
            />
            <TextField
               placeholder="Enter New Password"
               type="password"
               name="new password"
               value={password}
               onChange={handlePassword}
            />
            <TextField
               placeholder="Confirm New Password"
               type="password"
               name="confirm password"
               value={password2}
               onChange={handleConfirmPassword}
            />

            {password.length && password !== password2 ? (
               <p>Passwords must match</p>
            ) : (
               <p></p>
            )}
            <br />
            <Button
               onClick={handleSubmit}
               variant="contained"
               style={{ backgroundColor: '#2e56e9', color: 'white' }}
               endIcon={<Icon>person</Icon>}
            >
               Submit
            </Button>
            {formError ? (
               <p style={{ color: 'red' }}>Error Updating Password</p>
            ) : (
               <p></p>
            )}
         </FormControl>
      </Grid>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword)
