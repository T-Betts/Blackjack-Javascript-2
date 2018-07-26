function Game(deckCount, playerCount, pack = new Pack(deckCount)){
  this.hands = []
  this.playerCount = playerCount
  this.deckCount = deckCount
  this.pack = pack
  for (var i = 0; i <= playerCount; i++) {
    this.hands.push([])
  }
  this.cardValues = {
    'A': 1,
    'K': 10,
    'Q': 10,
    'J': 10,
    'T': 10
  };
}

Game.prototype.deal = function () {
  this.pack.shuffle()
  for (var round = 1; round <= 2; round++) {
    for (var i = 0; i < this.hands.length; i++) {
      this.hands[i].push(this.pack.remainingCards().pop());
    }
  }
};

Game.prototype.handScore = function (hand) {
  var score = 0
  for (var i = 0; i < hand.length; i++) {
    if (isNaN(hand[i][0])) {
      score += this.cardValues[hand[i][0]]
    } else {
      score += parseInt(hand[i][0])
    }
  }
  if (score + 10 <=21 && (hand[0][0] === 'A' || hand[1][0] === 'A')) {
    score += 10
  }
  return score;
};

Game.prototype.handStatus = function (hand) {
  if (this.handScore(hand) === 21 && hand.length === 2) {
    return 'Blackjack'
  } else if (this.handScore(hand) > 21) {
    return 'Bust'
  } else {
    return 'Live'
  }
};
