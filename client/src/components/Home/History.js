import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { __GetUserHistory } from '../../services/UserService'
import myStyles from '../../styles/myStyles'

const mapStateToProps = ({ userState }) => {
   return { userState }
}

const mapDispatchToProps = (dispatch) => {
   return {}
}

function History(props) {
   const styles = myStyles()
   const [history, setHistory] = useState([])
   const [page, setPage] = useState(1)

   useEffect(() => {
      getMyHistory()
   }, [])

   const getMyHistory = async () => {
      try {
         const userHistory = await __GetUserHistory(props.userState.id)

         const results = []
         userHistory.player0.forEach((e) => {
            results.push({
               opp: e.player1.name,
               gameDate: new Date(e.updatedAt),
               status:
                  e.status === 'COMPLETE'
                     ? e.winner === 0
                        ? 'WINNER'
                        : 'LOSER'
                     : 'IN PROGRESS',
            })
         })
         userHistory.player1.forEach((e) => {
            results.push({
               opp: e.player0.name,
               gameDate: new Date(e.updatedAt),
               status:
                  e.status === 'COMPLETE'
                     ? e.winner === 1
                        ? 'WON'
                        : 'LOST'
                     : 'IN PROGRESS',
            })
         })
         results.sort((a, b) => b.gameDate - a.gameDate)
         setHistory(results)
      } catch (err) {
         throw err
      }
   }

   const showResults = () => {
      let resList = []
      const startRes = (page - 1) * 10
      const endRes = history.length - startRes < 10 ? history.length : startRes + 10
      for (let i = startRes; i < endRes; i++) {
         resList.push(
            <React.Fragment>
               <Grid item xs={3}></Grid>
               <Grid item xs={2} className={styles.dialogText}>
                  {history[i].gameDate.toLocaleString()}
               </Grid>
               <Grid item xs={2} className={styles.defaultText}>
                  {history[i].opp}
               </Grid>
               <Grid item xs={2} className={styles.defaultText}>
                  {history[i].status}
               </Grid>
               <Grid item xs={3}></Grid>
            </React.Fragment>
         )
      }
      return resList
   }

   return (
      <Grid container direction="column" justify="space-between">
         <Grid container justify="center" style={{ margin: '20px' }}>
            <Grid item xs={3}></Grid>
            <Grid item xs={2} className={`${styles.dialogText} ${styles.undl}`}>
               Date
            </Grid>
            <Grid
               item
               xs={2}
               className={`${styles.defaultText} ${styles.undl}`}
            >
               Opponent
            </Grid>
            <Grid
               item
               xs={2}
               className={`${styles.defaultText} ${styles.undl}`}
            >
               Result
            </Grid>
            <Grid item xs={3}></Grid>
            {showResults()}
            {/* {history.map((game) => (
               <React.Fragment>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={2} className={styles.dialogText}>
                     {game.gameDate.toLocaleString()}
                  </Grid>
                  <Grid item xs={2} className={styles.defaultText}>
                     {game.opp}
                  </Grid>
                  <Grid item xs={2} className={styles.defaultText}>
                     {game.status}
                  </Grid>
                  <Grid item xs={3}></Grid>
               </React.Fragment>
            ))} */}
         </Grid>
         {history.length > 10 ? (
            <div className={styles.pagination}>
               <Pagination
                  onChange={(event, page) => setPage(page)}
                  defaultPage={1}
                  count={Math.ceil(history.length / 10)}
                  variant="outlined"
                  shape="rounded"
               />
            </div>
         ) : (
            <div></div>
         )}
      </Grid>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(History)
