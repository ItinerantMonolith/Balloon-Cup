import React from 'react'
import { Grid, Paper, Card, makeStyles, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import Trophies from './Trophies'
import myStyles from '../../styles/myStyles'
import {
   ToggleExitDialog,
   ToggleRulesDialog,
} from '../../store/actions/DialogActions'

const useStyle = makeStyles({
   deck: {
      width: '60px',
      height: '40px',
   },
})

const mapStateToProps = ({ gameState, dialogState }) => {
   return { gameState, dialogState }
}

const mapDispatchToProps = (dispatch) => {
   return {
      showExitDlg: () => dispatch(ToggleExitDialog(true)),
      showRulesDialog: () => dispatch(ToggleRulesDialog(true)),
   }
}

const DeckDisplay = (props) => {
   const styles = myStyles()
   const classes = useStyle()

   return (
      <Grid container spacing={6}>
         <Grid item xs={12}>
            <Paper className={styles.prizeCard}>
               <Grid container spacing={2} className={styles.gridCenter}>
                  <Grid item xs={12}>
                     <div className={`${styles.defaultText} ${styles.size2}`}>
                        Trophies Available
                     </div>
                  </Grid>
                  <Grid item xs={12}>
                     <Trophies
                        trophies={props.gameState.trophies}
                        showCost={true}
                     />
                  </Grid>
               </Grid>
            </Paper>
         </Grid>
         <Grid item xs={12}>
            <Paper className={styles.prizeCard}>
               <Grid container spacing={2}>
                  <Grid xs></Grid>
                  <Grid item xs={3}>
                     <Card className={`${classes.deck} ${styles.defaultText}`}>
                        <div>Deck</div>
                        <div>{props.gameState.deck}</div>
                     </Card>
                  </Grid>
                  <Grid item xs={3}>
                     <Card className={`${classes.deck} ${styles.defaultText}`}>
                        <div>Discard</div>
                        <div>{props.gameState.discards}</div>
                     </Card>
                  </Grid>
                  <Grid item xs={3}>
                     <Card className={`${classes.deck} ${styles.defaultText}`}>
                        <div>Cubes</div>
                        <div>{props.gameState.bag}</div>
                     </Card>
                  </Grid>
                  <Grid xs></Grid>
               </Grid>
            </Paper>
         </Grid>
         <Grid item xs={12}>
            <Paper className={`${styles.prizeCard} ${styles.defaultText}`}>
               <Grid container spacing={2} justify="space-evenly">
                  <Button
                     className={styles.defaultText}
                     onClick={() => props.showRulesDialog()}
                  >
                     View Rules
                  </Button>
                  <Button
                     className={styles.defaultText}
                     onClick={() => props.showExitDlg()}
                  >
                     Exit Game
                  </Button>
               </Grid>
            </Paper>
         </Grid>
      </Grid>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDisplay)

// {
//     id: player.id,
//     name: '',
//     cards: [],
//     cubes: [],
//     trophies: []
// }
