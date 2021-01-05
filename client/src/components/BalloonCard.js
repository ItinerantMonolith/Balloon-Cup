import React from 'react'
import { Card, CardContent } from '@material-ui/core'
import { colorBalloons } from '../colorMap'
import { connect } from 'react-redux'
import { SelectCard } from '../store/actions/GameActions'

const mapStateToProps = ({ gameState }) => {
   return { gameState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      selectCard: (cardId) => dispatch(SelectCard(cardId)),
   }
}

const BalloonCard = ( props ) => {
    const { card } = props
   const cardClick = (cardId) => {
      if (isSelected) {
         props.selectCard(-1)
      } else {
         props.selectCard(cardId)
      }
   }

   const isSelected = card.id === props.gameState.selectedCard

   // if we're looking at a balloon in a race, if it matches the color of the selected
   const isValidTarget = card.color = props.gameState.selectedColor

   return (
      <React.Fragment>
         {card.id >= 0 ? (
            <Card onClick={ card.validPlay ? () => cardClick(card.id): null}>
               <img
                  src={colorBalloons[card.color]}
                  className={`balloon ${
                     !card.validPlay ? 'balloon-empty' : null
                  }`}
                  alt="balloon"
               />
               <CardContent>
                  {' '}
                  {`${card.value}`}
                  {isSelected ? ' SELECTED' : null}
               </CardContent>
            </Card>
         ) : (
            <Card>
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
