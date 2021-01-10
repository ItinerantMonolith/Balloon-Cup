import React, { useState, useEffect, forwardRef } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import useInterval from 'react-useinterval'
import io from 'socket.io-client'
import {
   Grid,
   Card,
   Button,
   Icon,
   Dialog,
   DialogContent,
   DialogContentText,
   Zoom,
   makeStyles,
} from '@material-ui/core'
import {
   ConnectToGame,
   PendingConnect,
   DisconnectFromGame,
   SetMe,
   UpdateGame,
   GameOver,
} from '../store/actions/GameActions'
import Welcome from './Welcome'
import { colorBalloons } from '../colorMap'

import { SetHomeMode } from '../store/actions/UserActions'
import { ToggleDisconnectDialog } from '../store/actions/DialogActions'

import myStyles from '../styles/myStyles'

const ENDPOINT = 'localhost:3002'

const useStyles = makeStyles({
   card: {
      backgroundSize: 'cover',
      backgroundColor: 'transparent',
      borderRadius: 15,
      width: '60px',
      height: '90px',
      boxShadow: 'none',
   },
   balloon0: {
      backgroundImage: (props) =>
         `url(${colorBalloons[0][props.color === 0 ? 0 : 1]})`,
   },
   balloon1: {
      backgroundImage: (props) =>
         `url(${colorBalloons[1][props.color === 1 ? 0 : 1]})`,
   },

   balloon2: {
      backgroundImage: (props) =>
         `url(${colorBalloons[2][props.color === 2 ? 0 : 1]})`,
   },

   balloon3: {
      backgroundImage: (props) =>
         `url(${colorBalloons[3][props.color === 3 ? 0 : 1]})`,
   },

   balloon4: {
      backgroundImage: (props) =>
         `url(${colorBalloons[4][props.color === 4 ? 0 : 1]})`,
   },
})

const mapStateToProps = ({ userState, gameState, dialogState }) => {
   return { userState, gameState, dialogState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      connectGame: (socket) => dispatch(ConnectToGame(socket)),
      pendingConnect: () => dispatch(PendingConnect()),
      disconnectGame: () => dispatch(DisconnectFromGame()),
      setMe: (isFirst) => dispatch(SetMe(isFirst)),
      updateGame: (newGame) => dispatch(UpdateGame(newGame)),
      gameOver: () => dispatch(GameOver()),
      endGame: (endState) => dispatch(ToggleDisconnectDialog(endState)),
      setHomeMode: (mode) => dispatch(SetHomeMode(mode)),
   }
}

const TransitionZoom = forwardRef(function Transition(props, ref) {
   return <Zoom ref={ref} {...props} />
})

const StartGame = (props) => {
   const [open, setOpen] = useState(false)
   const [curColor, setColor] = useState(0)

   const myProps = { color: curColor }
   const classes = useStyles(myProps)
   const styles = myStyles()

   useEffect(() => {
      playGame()
   }, [])

   useInterval(() => {
      setColor((curColor + 1) % 5)
   }, 500)

   const playGame = () => {
      const socket = io(ENDPOINT, { query: `userId=${props.userState.id}` })

      setOpen(true)
      props.connectGame(socket)
      socket.on('game', (data) => {
         switch (data.action) {
            case 'Start Game':
               // see if I'm player 0 or player 1
               props.setMe(data.gameState.players[0].id === props.userState.id)
               props.updateGame(data.gameState)
               setOpen(false)
               props.setHomeMode('Home')
               props.history.push('/game')
               break

            case 'Update':
               props.updateGame(data.gameState)
               break

            case 'Game Over':
               props.updateGame(data.gameState)
               props.gameOver()
               break

            case 'Lost Player':
               // this means the other player disconnected, we should let the player know, then disconnect ourselves and return home.
               console.log('got lost player message')
               props.endGame({
                  dialogOpen: true,
                  dialogMsg:
                     'Your opponent has disconnected, the game has been saved and you will be returned to the lobby.',
               })
               break

            case 'Concede':
               // this means the other player conceded the game
               props.endGame({
                  dialogOpen: true,
                  dialogMsg:
                     'Your opponent has CONCEDED the game, so YOU WIN!  You will now be returned to the lobby.',
               })
               break

            default:
         }
      })
   }

   const cancelGame = () => {
      if (props.gameState.gameStatus) {
         props.gameState.connection.disconnect()
         props.disconnectGame()
         setOpen(false)
         props.setHomeMode('Home')
      }
   }
   return (
      <div style={{ height: '250px' }}>
         <Welcome />
         <Dialog
            open={open}
            TransitionComponent={TransitionZoom}
            disableBackdropClick={true}
            maxwidth={false}
         >
            <DialogContent className={`${styles.dialogBG}`}>
               <DialogContentText
                  className={`${styles.defaultText} ${styles.size25}`}
               >
                  <div>Waiting for opponent to join.</div>
                  <Grid
                     container
                     justify="center"
                     className={styles.gridCenter}
                  >
                     <Card className={`${classes.card} ${classes.balloon0}`} />
                     <Card className={`${classes.card} ${classes.balloon1}`} />
                     <Card className={`${classes.card} ${classes.balloon2}`} />
                     <Card className={`${classes.card} ${classes.balloon3}`} />
                     <Card className={`${classes.card} ${classes.balloon4}`} />
                  </Grid>
               </DialogContentText>
               <Grid container justify="center">
                  <Button
                     onClick={cancelGame}
                     variant="contained"
                     endIcon={<Icon>cancel</Icon>}
                     style={{
                        margin: '0px 20px',
                        backgroundColor: '#85d72b',
                        color: 'white',
                     }}
                  >
                     Cancel Game
                  </Button>
               </Grid>
            </DialogContent>
         </Dialog>
      </div>
   )
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withRouter(StartGame))
