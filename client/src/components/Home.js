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
   LostOpponent,
} from '../store/actions/GameActions'

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
      lostOpponent: () => dispatch(LostOpponent()),
   }
}

const Home = (props) => {
   const playGame = () => {
      const socket = io(ENDPOINT, { query: `userId=${props.userState.id}` })

      props.connectGame(socket)

      socket.on('game', (data) => {
         console.log(data)
         if (data.action === 'Start Game') {
            // see if I'm player 0 or player 1
            props.setMe(data.gameState.players[0].id === props.userState.id)
            props.updateGame(data.gameState)
            props.history.push('/game')
         } else if (data.action === 'update') {
            props.updateGame(data.gameState)
         } else if (data.action === 'Game Over') {
            props.updateGame(data.gameState)
            props.gameOver()
         }
      })

      socket.on('lost_player', () => {
         // this means the other player disconnected, we should let the player know, then disconnect ourselves and return home.
         props.lostOpponent()
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
