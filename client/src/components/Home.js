import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Icon, Grid, Paper } from '@material-ui/core'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import '../styles/Home.css'
import Nav from './Nav'
import {
   ConnectToGame,
   DisconnectFromGame,
   SetMe,
   UpdateGame,
   GameOver,
} from '../store/actions/GameActions'

import { ToggleDisconnectDialog } from '../store/actions/DialogActions'

const ENDPOINT = 'localhost:3002'

const mapStateToProps = ({ userState, gameState }) => {
   return { userState, gameState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      connectGame: (socket) => dispatch(ConnectToGame(socket)),
      disconnectGame: () => dispatch(DisconnectFromGame()),
      setMe: (isFirst) => dispatch(SetMe(isFirst)),
      updateGame: (newGame) => dispatch(UpdateGame(newGame)),
      gameOver: () => dispatch(GameOver()),
      endGame: (endState) => dispatch(ToggleDisconnectDialog(endState)),
   }
}

const Home = (props) => {
   const playGame = () => {
      const socket = io(ENDPOINT, { query: `userId=${props.userState.id}` })

      props.connectGame(socket)

      socket.on('game', (data) => {
         console.log(data)
         switch (data.action) {
            case 'Start Game':
               // see if I'm player 0 or player 1
               props.setMe(data.gameState.players[0].id === props.userState.id)
               props.updateGame(data.gameState)
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
                     "Your opponent's has disconnected, the game has been saved and you will be returned to the lobby.",
               })
               break

            case 'Concede':
               // this means the other player conceded the game
               props.endGame({
                  dialogOpen: true,
                  dialogMsg:
                     "Your opponent's has CONCEDED the game, so YOU WIN!  You will now be returned to the lobby.",
               })
               break

            default:
         }
      })
   }

   const cancelGame = () => {
      props.gameState.connection.disconnect()
      props.disconnectGame()
   }

   return (
      <div>
         <Nav />
         <div style={{ textAlign: 'center' }}>
            <Grid container justify="center" style={{ margin: '5px' }}>
               <Grid item xs={6}>
                  <Paper elevation={6}>
                     <h1>Welcome to Balloon Cup!</h1>
                     <h2>Put a cool description here!</h2>
                     <p className="description">Lorem Ipsum!</p>
                     {props.userState.authenticated ? (
                        props.gameState.gameStatus === '' ? (
                           <div style={{ margin: '10px' }}>
                              <Button
                                 onClick={playGame}
                                 variant="contained"
                                 endIcon={<Icon>person_add</Icon>}
                                 style={{
                                    margin: '0px 20px',
                                    backgroundColor: '#9a9a9a',
                                    color: 'white',
                                 }}
                              >
                                 Play a Game
                              </Button>
                           </div>
                        ) : (
                           <div>
                              <div>WAITING FOR GAME TO LAUNCH</div>
                              <Button
                                 onClick={cancelGame}
                                 variant="contained"
                                 endIcon={<Icon>cancel</Icon>}
                                 style={{
                                    margin: '0px 20px',
                                    backgroundColor: '#9a9a9a',
                                    color: 'white',
                                 }}
                              >
                                 Cancel Game
                              </Button>
                           </div>
                        )
                     ) : null}
                  </Paper>
               </Grid>
            </Grid>
         </div>
      </div>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))
