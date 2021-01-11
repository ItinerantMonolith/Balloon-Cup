import React, { useState } from 'react'
import { connect } from 'react-redux'
import { FormControl, Grid } from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import UpdateName from './UpdateName'
import UpdatePassword from './UpdatePassword'
import History from './History'

import myStyles from '../../styles/myStyles'

const mapStateToProps = ({ userState }) => {
   return { userState }
}

const mapDispatchToProps = (dispatch) => {
   return {}
}

function Account(props) {
   const [action, setAction] = useState('history')
   const styles = myStyles()

   const handleToggleButton = (event, value) => {
      setAction(value)
   }

   const content = () => {
      switch (action) {
         case 'name':
            return <UpdateName />

         case 'password':
            return <UpdatePassword />

         case 'history':
            return <History />

         default:
            return <div>NOTHING</div>
      }
   }
   return (
      <div>
         <Grid
            container
            direction="column"
            justify="center"
            alignContent="center"
            style={{ margin: '20px' }}
         >
            <div className={`${styles.defaultText} ${styles.size2}`}>
               Account Information
            </div>
            <div className={`${styles.defaultText}`}>
               <ToggleButtonGroup
                  value={action}
                  onChange={handleToggleButton}
                  exclusive
               >
                  <ToggleButton value="history" aria-label="centered">
                     <div className={styles.defaultText}>Game History</div>
                  </ToggleButton>
                  <ToggleButton value="name" aria-label="centered">
                     <div className={styles.defaultText}>Update Name</div>
                  </ToggleButton>
                  <ToggleButton value="password" aria-label="centered">
                     <div className={styles.defaultText}>Update Password</div>
                  </ToggleButton>
               </ToggleButtonGroup>
            </div>
            {content()}
            {props.userState.formError ? (
               <p style={{ color: 'red' }}>Error updating Password</p>
            ) : (
               <p></p>
            )}
         </Grid>
      </div>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
