function Pack(deckCount = 1){
  this.deckCount = deckCount;
  this.cards = [];
  this.suits = ['s', 'h', 'd', 'c'];
  this.ranks = [2, 3, 4, 5, 6, 7, 8, 9, 'T', 'J', 'Q', 'K', 'A'];
  for (let counter = 0; counter < this.deckCount; counter++) {
    this.suits.forEach(suit => {
      this.ranks.forEach((rank) => {
        this.cards.push(rank + suit);
      })
    });
  }
  
}

Pack.prototype.remainingCards = function () {
  return this.cards;
};

// Durstenfeld Shuffle
Pack.prototype.shuffle = function () {
  for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
  }
  return this.cards;
};
