import React from 'react'
import myStyles from '../styles/myStyles'


const Rules = (props) => {
   const styles = myStyles()

   return (
      <div style={{ padding: '2% 5%' }}>
         <div className={`${styles.defaultText} ${styles.size25}`}>
            Rules of Balloon Cup
         </div>
         <div className={`${styles.dialogText} ${styles.size1}`} style={{ margin: '5px'}}>
            Rules go here!
         </div>
         <div className={`${styles.dialogText} ${styles.size1}`} style={{ margin: '5px'}}>
            and here
         </div>
         <div className={`${styles.dialogText} ${styles.size1}`} style={{ margin: '5px'}}>
            and build in pagination
         </div>
      </div>
   )
}

export default Rules
