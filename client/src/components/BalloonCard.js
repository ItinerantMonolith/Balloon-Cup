import React from 'react'
import { Card, CardContent, makeStyles } from '@material-ui/core'
import { colorBalloons } from '../colorMap'
import { connect } from 'react-redux'
import { SelectCard } from '../store/actions/GameActions'

const useStyles = makeStyles({
   card: {
      backgroundImage: (props) =>
         `url(${
            colorBalloons[props.card.color][props.card.validPlay ? 0 : 1]
         })`,
      backgroundSize: '80px 120px',
      borderRadius: 15,
      width: '80px',
      height: '120px',
      border: (props) => {
         if (
            (props.card.id >= 0 &&
               props.card.id === props.gameState.selectedCard) ||
            (props.card.id < 0 &&
               props.card.color === props.gameState.selectedColor)
         )
            return '4px solid black'
         else return '4px solid white'
      },
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
            <Card
               className={classes.card}
               onClick={
                  card.validPlay && isMyTurn ? () => cardSelect(card.id) : null
               }
            >
               <CardContent>
                  {' '}
                  {`${card.value}`}
                  {isSelected ? ' SELECTED' : null}
               </CardContent>
            </Card>
         ) : (
            <Card
               className={classes.card}
               onClick={isValidTarget ? () => targetSelect(cardMap) : null}
            ></Card>
         )}
      </React.Fragment>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(BalloonCard)
