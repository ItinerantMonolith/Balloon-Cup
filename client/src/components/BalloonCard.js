import React from 'react'
import { Card, CardContent, makeStyles } from '@material-ui/core'
import { colorBalloons } from '../colorMap'
import { connect } from 'react-redux'
import { SelectCard } from '../store/actions/GameActions'

const useStyles = makeStyles({
   card: {
      backgroundImage: props => `url(${colorBalloons[props.card.color]})`,
      backgroundSize: '80px 120px',
      borderRadius: 15,
      width: '80px',
      height: '120px',
      border: '3px solid black'
   },
})

const mapStateToProps = ({ gameState }) => {
   return { gameState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      selectCard: (cardId) => dispatch(SelectCard(cardId)),
   }
}

const BalloonCard = (props) => {
   const classes = useStyles(props)
   const { card, cardMap } = props

   const cardSelect = (cardId) => {
      if (isSelected) {
         props.selectCard(-1)
      } else {
         props.selectCard(cardId)
      }
   }

   const targetSelect = (details) => {
      const gameTurn = {
         cardPlayed: props.gameState.selectedCard,
         targetRace: details.race,
         targetSide:
            props.gameState.me === 0
               ? details.side
               : details.side === 0
               ? 1
               : 0,
         targetCard: details.card,
      }
      props.selectCard(-1)
      props.gameState.connection.emit('game_turn', gameTurn)
   }

   const isSelected = card.id === props.gameState.selectedCard

   // if we're looking at a balloon in a race, if it matches the color of the selected
   const isValidTarget = card.color === props.gameState.selectedColor

   const isMyTurn = props.gameState.me === props.gameState.nextPlayer

   return (
      <React.Fragment>
         {card.id >= 0 ? (
            <Card className={classes.card}
               onClick={
                  card.validPlay && isMyTurn ? () => cardSelect(card.id) : null
               }
            >
               {/* <img
                  src={colorBalloons[card.color]}
                  className={`balloon ${
                     !card.validPlay ? 'balloon-empty' : ''
                  }`}
                  alt="balloon"
               /> */}
               <CardContent>
                  {' '}
                  {`${card.value}`}
                  {isSelected ? ' SELECTED' : null}
               </CardContent>
            </Card>
         ) : (
            <Card onClick={isValidTarget ? () => targetSelect(cardMap) : null}>
               <img
                  src={colorBalloons[card.color]}
                  className={`balloon ${
                     isValidTarget ? 'balloon-target' : 'balloon-empty'
                  }`}
                  alt="empty balloon"
               />
            </Card>
         )}
      </React.Fragment>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(BalloonCard)
