import React from 'react'
import { Card } from '@material-ui/core'
import { colorTrophies } from '../colorMap'

const Trophy = ({ trophy }) => {
   return (
      <Card>
         <img src={colorTrophies[trophy]} alt="trophy" className="balloon" />
      </Card>
   )
}

export default Trophy
