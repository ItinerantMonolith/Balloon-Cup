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
   UpdateUserName,
   FormUpdateName,
   FormClear,
   SetHomeMode
} from '../store/actions/UserActions'

const mapStateToProps = ({ userState }) => {
   return { userState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      updateName: (email, name) => dispatch(UpdateUserName(email, name)),
      formUpdateName: (name) => dispatch(FormUpdateName(name)),
      clearForm: () => dispatch(FormClear()),
      setHomeMode: (mode) => dispatch(SetHomeMode(mode))
   }
}

function UpdateName(props) {
   const handleName = ({ target }) => {
      props.formUpdateName(target.value)
   }

   const handleSubmit = async (e) => {
    e.preventDefault()
    props.updateName(props.userState.email, props.userState.formName)
    props.clearForm()
    props.setHomeMode('Home')
 }

   return (
      <Grid container justify="center" style={{ margin: '20px' }}>
         <FormControl className="flex-col" onSubmit={handleSubmit}>
            <TextField
               placeholder="New Name"
               type="text"
               name="name"
               value={props.userState.formName}
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
