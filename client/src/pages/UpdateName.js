import React from 'react'
import { connect } from 'react-redux'
import Nav from '../components/Nav'
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
   UpdateUserName,
   FormUpdateName,
   FormClear,
} from '../store/actions/UserActions'

const mapStateToProps = ({ userState }) => {
   return { userState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      updateName: (email, name) => dispatch(UpdateUserName(email, name)),
      formUpdateName: (name) => dispatch(FormUpdateName(name)),
      clearForm: () => dispatch(FormClear()),
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
      props.history.push('/')
   }

   return (
      <div>
         <Nav />
         <div className="signup flex-col center">
            <Paper elevation={6}>
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
                        style={{ backgroundColor: '#9a9a9a', color: 'white' }}
                        endIcon={<Icon>person</Icon>}
                     >
                        Submit
                     </Button>
                  </FormControl>
               </Grid>
            </Paper>
         </div>
      </div>
   )
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withRouter(UpdateName))
