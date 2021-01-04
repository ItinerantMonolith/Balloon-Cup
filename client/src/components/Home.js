import React from 'react'
import { Button, Icon, Grid, Paper } from '@material-ui/core'
import { connect } from 'react-redux'
import '../styles/Home.css'

const mapStateToProps = ({ userState }) => {
   return { userState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      //   setView: (viewId) => dispatch(SetView(viewId)),
   }
}

const Home = (props) => {
   return (
      <div>
         <div style={{ textAlign: 'center' }}>
            <Grid container justify="center" style={{ margin: '5px' }}>
               <Grid item xs={6}>
                  <Paper elevation={6}>
                     <h1>Welcome to Balloon Cup!</h1>
                     <h2>Put a cool description here!</h2>
                     <p className="description">Lorem Ipsum!</p>
                     {!props.userState.authenticated ? (
                        <div style={{ margin: '10px' }}>
                           <Button
                              href="/game"
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
                     ) : null}
                  </Paper>
               </Grid>
            </Grid>
         </div>
      </div>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
