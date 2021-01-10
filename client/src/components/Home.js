import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Grid, Paper } from '@material-ui/core'
import { connect } from 'react-redux'
import MenuBalloon from './MenuBalloon'
import Welcome from './Welcome'
import Rules from './Rules'
import Login from './Login'
import Register from './Register'
import Account from './Account'
import StartGame from './StartGame'
import myStyles from '../styles/myStyles'
import { SetHomeMode, Logout, VerifyUser } from '../store/actions/UserActions'
import { DisconnectFromGame } from '../store/actions/GameActions'
import { __CheckSession } from '../services/UserService'

const mapStateToProps = ({ userState, gameState }) => {
   return { userState, gameState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setHomeMode: (mode) => dispatch(SetHomeMode(mode)),
      logout: () => dispatch(Logout()),
      verifyUser: (sessionInfo) => dispatch(VerifyUser(sessionInfo)),
      disconnectGame: () => dispatch(DisconnectFromGame()),
   }
}

const Home = (props) => {
   const styles = myStyles()

   useEffect(() => {
      verifyTokenValid()
   }, [])

   const verifyTokenValid = async () => {
      const token = localStorage.getItem('token')
      if (token) {
         try {
            const session = await __CheckSession()
            props.verifyUser(session)
         } catch (error) {
            props.logout()
            localStorage.clear()
         }
      }
   }

   const content = () => {
      switch (props.userState.mode) {
         case 'Home':
            return <Welcome />

         case 'Rules':
            return <Rules />

         case 'Login':
            return <Login />

         case 'Register':
            return <Register />

         case 'Logout':
            localStorage.clear()
            props.logout()
            props.setHomeMode('Home')
            break

         case 'Account':
            return <Account />

         case 'Play':
            return <StartGame />

         default:
            return <div>NOTHING</div>
      }
   }

   return (
      <div>
         <Grid container spacing={3} style={{ height: '300px' }}>
            <Grid item xs={2}></Grid>
            <Grid container item xs direction="column" justify="flex-end">
               <MenuBalloon color={0} action="Home" />
            </Grid>
            <Grid container item xs direction="column" justify="space-around">
               <MenuBalloon color={1} action="Rules" />
            </Grid>
            <Grid item xs>
               <MenuBalloon
                  color={2}
                  action={props.userState.isAuthenticated ? 'Play' : ''}
               />
            </Grid>
            <Grid container item xs direction="column" justify="space-around">
               <MenuBalloon
                  color={3}
                  action={props.userState.isAuthenticated ? 'Account' : 'Login'}
               />
            </Grid>
            <Grid container item xs direction="column" justify="flex-end">
               <MenuBalloon
                  color={4}
                  action={
                     props.userState.isAuthenticated ? 'Logout' : 'Register'
                  }
               />
            </Grid>
            <Grid item xs={2}></Grid>
         </Grid>
         <div style={{ textAlign: 'center' }}>
            <Grid container justify="center" style={{ margin: '20px auto' }}>
               <Grid item xs={6}>
                  <Paper
                     elevation={12}
                     className={`${styles.prizeCard} ${styles.mainBlock}`}
                  >
                     {content()}
                  </Paper>
               </Grid>
            </Grid>
         </div>
      </div>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))
