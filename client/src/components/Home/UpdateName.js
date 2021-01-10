import React, { useState } from 'react'
import { connect } from 'react-redux'
import { FormControl, Button, Icon, Grid, TextField } from '@material-ui/core'
import { UpdateUserName, SetHomeMode } from '../../store/actions/UserActions'

const mapStateToProps = ({ userState }) => {
   return { userState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      updateName: (email, name) => dispatch(UpdateUserName(email, name)),
      setHomeMode: (mode) => dispatch(SetHomeMode(mode)),
   }
}

function UpdateName(props) {
   const [name, setName] = useState('')
   const handleName = ({ target }) => {
      setName(target.value)
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      props.updateName(props.userState.email, name)
      props.setHomeMode('Home')
   }

   return (
      <Grid container justify="center" style={{ margin: '20px' }}>
         <FormControl className="flex-col" onSubmit={handleSubmit}>
            <TextField
               placeholder="New Name"
               type="text"
               name="name"
               value={name}
               onChange={handleName}
            />

            <br />
            <Button
               onClick={handleSubmit}
               variant="contained"
               style={{ backgroundColor: '#2e56e9', color: 'white' }}
               endIcon={<Icon>person</Icon>}
            >
               Submit
            </Button>
         </FormControl>
      </Grid>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateName)
