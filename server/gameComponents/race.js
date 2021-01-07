class Race {
   constructor(raceNo) {
      this.raceNo = raceNo
      this.isLow = raceNo % 2 === 1
      this.cards = [[], []]
      this.cubes = []
      this.isOver = false
   }

   loadRace ( raceData ) {
        this.isLow = raceData.isLow
        this.cards = raceData.cards
        this.cubes = raceData.cubes
        this.isOver = raceData.isOver
   }

   addCard(card, side, slot) {
      this.cards[side][slot] = card
      this.sortRace()
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

   sortRace() {
      this.cubes.sort((a, b) => a.color - b.color)
      this.cards.forEach((side) => {
         side.sort((a, b) => {
            if (a.color < b.color) return -1
            else if (a.color > b.color) return 1

            return a.value - b.value
         })
      })
   }

   getCubes() {
      return this.cubes
   }

   getCards() {
      const retCds = []
      this.cards.forEach((side) => side.forEach((card) => retCds.push(card)))
      return retCds
   }

   resetRace() {
      this.cards = [[], []]
      this.cubes = []
      this.isLow = !this.isLow
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
      let side0 = this.cards[0].reduce((acc, card) => {
         return acc + card.value
      }, 0)
      let side1 = this.cards[1].reduce((acc, card) => {
         return acc + card.value
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
}

module.exports = Race
