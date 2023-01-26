class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = []
    this.pairsClicked = 0
    this.pairsGuessed = 0
  }

  shuffleCards() {
    if (!this.cards) return undefined

    function fisherYatesShuffle(array, shuffle_start, shuffle_end) {
      if (shuffle_end > array.length-1) return fisherYatesShuffle(array, shuffle_start, array.length-1)
      if (shuffle_start < 1) return fisherYatesShuffle(array, 1, shuffle_end)
      if (shuffle_end < shuffle_start) return

      let random_i = Math.floor(Math.random() * shuffle_end)
      let tmp = array[random_i]
      array[random_i] = array[shuffle_end]
      array[shuffle_end] = tmp

      return fisherYatesShuffle(array, shuffle_start, shuffle_end - 1)
    }

    fisherYatesShuffle(this.cards, -0, this.cards.length-1)
  }

  checkIfPair(card1, card2) {
    this.pairsClicked++

    if (card1 === card2) {
      this.pairsGuessed++
      return true
    }

    return false
  }

  checkIfFinished() {
    return this.pairsGuessed >= this.cards.length / 2
  }
}
