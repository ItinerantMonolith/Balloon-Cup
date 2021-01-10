import React, { useState } from 'react'
import { connect } from 'react-redux'
import { FormControl, Grid } from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import UpdateName from './UpdateName'
import UpdatePassword from './UpdatePassword'

import myStyles from '../styles/myStyles'

const mapStateToProps = ({ userState }) => {
   return { userState }
}

const mapDispatchToProps = (dispatch) => {
   return {
   }
}

function Account(props) {
   const [action, setAction] = useState('name')
   const styles = myStyles()

   const handleToggleButton = (event, value) => {
       console.log ( 'toggle', value)
      setAction(value)
   }

   return (
      <div>
         <Grid container justify="center" style={{ margin: '20px' }}>
            <FormControl className="flex-col">
               <div className={`${styles.defaultText} ${styles.size2}`}>
                  Account Settings
               </div>
               <ToggleButtonGroup
                  value={action}
                  onChange={handleToggleButton}
                  exclusive
               >
                  <ToggleButton value="name" aria-label="centered">
                     <div className={styles.defaultText}>Update Name</div>
                  </ToggleButton>
                  <ToggleButton value="password" aria-label="centered">
                     <div className={styles.defaultText}>Update Password</div>
                  </ToggleButton>
               </ToggleButtonGroup>
               {action === 'name' ? (
                   <UpdateName />
                   ) : (
                  <UpdatePassword />
               )}
               {props.userState.formError ? (
                  <p style={{ color: 'red' }}>Error updating Password</p>
               ) : (
                  <p></p>
               )}
            </FormControl>
         </Grid>
      </div>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
