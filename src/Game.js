function Game(deckCount, playerCount, pack = new Pack(deckCount)){
  this.hands = []
  this.playerCount = playerCount
  this.deckCount = deckCount
  this.pack = pack
  for (var i = 0; i <= playerCount; i++) {
    this.hands.push([])
  }
}

Game.prototype.deal = function () {
  this.pack.shuffle()
  for (var round = 1; round <= 2; round++) {
    for (var i = 0; i < this.hands.length; i++) {
      this.hands[i].push(this.pack.cards.pop());
    }
  }

};
