import React, { useState } from 'react'
import { connect } from 'react-redux'
import { FormControl, Button, Icon, Grid, TextField } from '@material-ui/core'
import { RegisterUser, SetHomeMode } from '../store/actions/UserActions'
import myStyles from '../styles/myStyles'

const mapStateToProps = ({ userState }) => {
   return { userState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      register: (name, email, password) =>
         dispatch(RegisterUser(name, email, password)),

      setHomeMode: () => dispatch(SetHomeMode('Home')),
   }
}

function Register(props) {
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [password2, setPassword2] = useState('')
   const [formError, setFormError] = useState(false)
   const styles = myStyles()

   const handleName = ({ target }) => {
      setName(target.value)
   }

   const handleEmail = ({ target }) => {
      setEmail(target.value)
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
      if (
         name.length &&
         email.length &&
         password.length &&
         password === password2
      ) {
          try {

              props.register(name, email, password)
              props.setHomeMode()
          }
          catch ( err ) {
              setFormError(true)
          }
      }
   }

   return (
      <Grid container justify="center">
         <FormControl
            className="flex-col"
            onSubmit={handleSubmit}
            style={{ margin: '20px' }}
         >
            <div className={`${styles.defaultText} ${styles.size2}`}>
               Register an Account
            </div>
            <TextField
               placeholder="Your Name"
               type="text"
               name="name"
               value={name}
               onChange={handleName}
            />
            <TextField
               placeholder="Your Email"
               name="email"
               value={email}
               type="email"
               onChange={handleEmail}
            />

            <TextField
               placeholder="Password"
               type="password"
               name="password"
               value={password}
               onChange={handlePassword}
            />
            <TextField
               placeholder="Confirm Password"
               type="password"
               name="confirmPassword"
               value={password2}
               onChange={handleConfirmPassword}
            />
            {password.length && password !== password2 ? (
               <p>Passwords must match</p>
            ) : (
               <p></p>
            )}
            <Button
               onClick={handleSubmit}
               variant="contained"
               style={{
                  backgroundColor: '#7f7f7f',
                  color: 'white',
                  fontFamily: 'Yeon Sung',
               }}
               endIcon={<Icon>person_add</Icon>}
            >
               Register
            </Button>

            {formError ? <p>Account Error</p> : <p></p>}
         </FormControl>
      </Grid>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
