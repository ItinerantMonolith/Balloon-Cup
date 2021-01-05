import React from 'react'
import { Button, Icon, Grid, Paper } from '@material-ui/core'
import { connect } from 'react-redux'
import '../styles/Home.css'
import io from 'socket.io-client'
import { ConnectToGame, DisconnectFromGame } from '../store/actions/UserActions'

const ENDPOINT = 'localhost:3002'

const mapStateToProps = ({ userState }) => {
   return { userState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      connectGame: (socket) => dispatch(ConnectToGame(socket)),
      disconnectGame: () => dispatch(DisconnectFromGame())
   }
}

const Home = (props) => {
   const playGame = () => {
      const socket = io(ENDPOINT, { query: `userId=${props.userState.id}` })

      console.log ( socket )
      props.connectGame(socket)

      socket.on('game', (data) => {
         console.log(data)
      })
   }

   const cancelGame = () => {
       props.userState.connection.disconnect()
       props.disconnectGame()
   }

   return (
      <div>
         <div style={{ textAlign: 'center' }}>
            <Grid container justify="center" style={{ margin: '5px' }}>
               <Grid item xs={6}>
                  <Paper elevation={6}>
                     <h1>Welcome to Balloon Cup!</h1>
                     <h2>Put a cool description here!</h2>
                     <p className="description">Lorem Ipsum!</p>
                     {props.userState.authenticated ? (
                        props.userState.gameStatus === '' ? (
                           <div style={{ margin: '10px' }}>
                              <Button
                                //  href="/game"
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
                               <Button onClick={cancelGame} variant="contained"
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
