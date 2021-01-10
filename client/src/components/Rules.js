import React, { useState } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import myStyles from '../styles/myStyles'

const ruleStyles = makeStyles({
   pagination: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      height: '32px',
   },
})

const ruleText = [
   {
      title: 'Object of the Game',
      text:
         'Players place their balloon cards next to the balloon hop tiles, trying to collect victory cubes in the right colors so they can claim trophy cards. The first player to take 3 of the 5 trophy cards is the winner!',
   },
   {
      title: 'Components',
      text: (
         <ul>
            <li>
               45 victory cubes (13 red, 11 yellow, 9 green, 7 blue, and 5 gray)
            </li>
            <li>
               45 balloon cards (13 red, 11 yellow, 9 green, 7 blue, and 5 gray)
               <ul>
                  <li>Red Cards: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13</li>
                  <li>Yellow Cards: 1, 2, 3, 5, 6, 7, 8, 9, 11, 12, 13</li>
                  <li>Green Cards: 1, 2, 4, 6, 7, 8, 10, 12, 13 </li>
                  <li>Blue Cards: 1, 3, 5, 7, 9, 11, 13</li>
                  <li>Gray Cards: 1, 4, 7, 10, 13</li>
               </ul>
            </li>
            <li>5 Trophies (1 in each color)</li>
            <li>
               4 Race/Hop tiles, which are each Plains on one side and Mountains
               on the other.
            </li>
         </ul>
      ),
   },
   {
      title: 'Setup',
      text: (
         <ul>
            <li>
               Place the 4 balloon hop tiles in a hop between the two players.
            </li>
            <li>Place the 45 victory cubes in the bag and mix them.</li>
            <li>
               Place victory cubes on the balloon hop tiles. Randomly draw
               victory cubes from the bag and place them on the balloon hop
               tiles: 1 on tile number 1, 2 on tile number 2, 3 on tile number
               3, and 4 on tile number 4.
            </li>
            <li>
               Shuffle the balloon cards face down and deal eight cards to each
               player. Each player takes his cards into his hand, keeping them
               secret from his opponent during the game.
            </li>
            <li>
               Place the remaining balloon cards face down as a supply next to
               the board. A discard stack will form next to it. If the supply is
               exhausted, shuffle the discard stack and place it face down as
               the new supply.
            </li>
            <li>Place the 5 trophy cards face up near the board.</li>
            <li>Randomly determine which player will go first.</li>
         </ul>
      ),
   },
   {
      title: 'Game Play',
      text:
         "On a player's turn, he selects a card from his hand and places it face up next to the balloon hop tile of his choice. He may place the card on his side of the tile or on his opponent's side of the tile. Then, he draws the top-most card from the supply and adds it to his hand, ending his turn.",
   },
   {
      title: 'Placing Cards',
      text: (
         <ul>
            <li>
               The number of victory cubes on a balloon hop tile determines the
               number of balloon cards that must be placed on each side of the
               tile.
            </li>

            <li>
               The colors of the victory cubes on a balloon hop tile determine
               the colors of the balloon cards that must be placed on each side
               of the tile.
            </li>
            <li>
               If the only card a player can place will help his opponent, he
               must place it. A player may not choose to place no card on his
               turn.
            </li>

            <li>
               If a player cannot place any of his 8 cards, they automatically
               discard them and receive a new hand. If they can then place a
               card, they must. If not, they dicard and draw 8 cards again, and
               their turn ends.
            </li>
         </ul>
      ),
   },
   {
      title: 'Scoring',
      text: (
         <ul>
            <li>
               When the required number of cards have been placed on both sides
               of a balloon hop tile, the tile is scored.
            </li>
            <li>
               If the tile being scored is a mountain, the player with the
               highest sum of balloon cards on their side of the tile takes the
               victory cubes there. If the tile being scored is a plains, the
               player with the lowest total wins.
            </li>

            <li>
               If the sums of the balloon cards on both sides of the tile is the
               same, the player who placed the last card wins and takes the
               victory cubes there. 
            </li>
            <li>The winner takes the victory cubes from the tile.</li>
            <li>
               All balloon cards from both sides of the tile are added to the
               discard pile.
            </li>
            <li>
               The tile switches from mountains to plains or plains to
               mountains.
            </li>
            <li>
               Cubes are drawn to replace the ones taken. If there are not
               enough cubes, that hop is no longer in play.
            </li>
            <li>
               The game now continues with the player who lost the tile scoring.
            </li>
         </ul>
      ),
   },
   {
      title: 'Trophies',
      text: (
         <ul>
            <li>
               After scoring a balloon hop tile, the players check to see if the
               winner has the required number of victory cubes in one or more
               colors.
            </li>
            <li>
               The number of cubes needed depends on the trophy color: Gray (3),
               Blue (4), Green (5), Yellow (6), and Red (7)
            </li>
            <li>
               When a player has the required number of victory cubes of a color
               (or more), they pay the required number of cubes and receives the
               trohpy of that color.
            </li>
            <li>
               Once taken, a player cannot lose a trophy card during the game.
            </li>
            <li>
               The players keep any extra victory cubes in this color and can
               continue to win victory cubes in this color during the rest of
               the game. When a player claims a trophy card, he can use 3
               victory cubes in the color of an already claimed trophy card, as
               one victory cube in the color of the trophy card he is claiming.
            </li>
         </ul>
      ),
   },
   {
      title: 'End of the Game',
      text:
         'The game ends immediately when a player takes a third trophy card. This player is the winner!',
   },
   {
      title: 'About the Original',
      text: (
         <div>
            <div>
               This version of the game is based on the original game of{' '}
               <a href="https://boardgamegeek.com/boardgame/5716/balloon-cup" target='_blank' rel="noopener noreferrer">
                  Balloon Cup
               </a>
               , designed by{' '}
               <a href="https://www.boardgamegeek.com/boardgamedesigner/2118/stephen-glenn" target='_blank' rel="noopener noreferrer">
                  Stephen Glenn
               </a>{' '}
               and published in 2003 by{' '}
               <a href="https://www.kosmos.de/" target='_blank' rel="noopener noreferrer">KOSMOS</a>.
            </div>
            <div>
               My implementation of the game is just for fun and done as an
               exercise in full stack software development, not for commercial
               use. It does not follow the original game exactly*, but I tried
               to stick to the original rules as closely as possible.
            </div>
            <div>
               Enjoy the game!,{' '}<br />
               <a href="https://www.linkedin.com/in/walker-aaron/" target='_blank' rel="noopener noreferrer">-Aaron</a>
            </div>
            <br />
            <div>
               <div>
                  * For those who are curious, I changed two rules in the
                  interest of implementation.
               </div>
               <div>
                  1. Discards are automatic and include the entire hand if a
                  player cannot play, as opposed to the real game, in which the
                  player chooses which cards to discard.
               </div>
               <div>
                  2. When acquiring trophyies, the 3-for-1 trade of extra cubes
                  is mandatory in this implementation.
               </div>
            </div>
         </div>
      ),
   },
]

const Rules = (props) => {
   const [page, setPage] = useState(1)
   const ruleStyle = ruleStyles()
   const styles = myStyles()

   return (
      <div style={{ padding: '2% 3%', height: '100%' }}>
         <Grid
            container
            direction="column"
            justify="space-between"
            style={{ height: '95%' }}
         >
            <div>
               <div
                  className={`${styles.dialogText} ${styles.size2}`}
                  style={{ margin: '5px' }}
               >
                  Rules of Balloon Cup: {ruleText[page - 1].title}
               </div>
               <div
                  className={`${styles.dialogText} ${styles.size1}`}
                  style={{ margin: '5px' }}
               >
                  {ruleText[page - 1].text}
               </div>
            </div>
            <div className={ruleStyle.pagination}>
               <Pagination
                  onChange={(event, page) => setPage(page)}
                  defaultPage={1}
                  count={ruleText.length}
                  variant="outlined"
                  shape="rounded"
               />
            </div>
         </Grid>
      </div>
   )
}

export default Rules
