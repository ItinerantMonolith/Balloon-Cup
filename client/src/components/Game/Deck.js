import React from 'react'
import { Button, Icon, Grid, Paper } from '@material-ui/core'
import { connect } from 'react-redux'
import io from 'socket.io-client'

const mapStateToProps = ({ gameState }) => {
   return { gameState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      //    connectGame: (socket) => dispatch(ConnectToGame(socket)),
   }
}

const Deck = (props) => {
   return (
      <div>
        DECK
      </div>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck)
