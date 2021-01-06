class Race {
   constructor(raceNo) {
      this.raceNo = raceNo
      this.isLow = raceNo % 2 === 1
      this.cards = [[], []]
      this.cubes = []
      this.isOver = false
   }

   addCard(card, side, slot) {
      this.cards[side][slot] = card
   }

   addCube(cube) {
      this.cubes.push(cube)
      this.cards.forEach((side) =>
         side.push({
            id: -1,
            color: cube.color,
            value: -1,
            validPlay: false,
         })
      )
   }

   clearRace() {
      const retCds = []
      this.cards.forEach((side) => side.forEach((card) => retCds.push(card)))
      this.cards = [[], []]
      this.cubes = []
      this.isLow = !this.isLow

      //return the cards that were used
      return retCds
   }

   isRaceOver() {
      let isOver = true
      this.cards.forEach((side) =>
         side.forEach((card) => {
            if (card.id === -1) {
               isOver = false
            }
         })
      )
      return isOver
   }

   getWinner() {
      let side0 = this.cards[0].reduce((acc, val) => {
         return acc + val
      }, 0)
      let side1 = this.cards[1].reduce((acc, val) => {
         return acc + val
      }, 0)
      if (side0 < side1) {
         if (this.isLow) return 0
         else return 1
      } else if (side0 > side1) {
         if (this.isLow) return 1
         else return 0
      }
      return -1 // tie, in which case whoever played last will win.
   }

   getCubes() {
      return this.cubes
   }
}

module.exports = Race
