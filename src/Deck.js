function Deck(){
  this.cards = []
  this.suits = ['s', 'h', 'd', 'c']
  this.ranks = [2, 3, 4, 5, 6, 7, 8, 9, 'T', 'J', 'Q', 'K', 'A']
  for (var i = 0; i < this.suits.length; i++) {
    for (var x = 0; x < this.ranks.length; x++) {
      this.cards.push(this.ranks[x] + this.suits[i])
    }
  }
}

// Durstenfeld Shuffle
Deck.prototype.shuffle = function () {
  for (var i = this.cards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
  }
  return this.cards;
};
