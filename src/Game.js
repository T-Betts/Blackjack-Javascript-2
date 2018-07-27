function Game(deckCount, playerCount, pack = new Pack(deckCount)){
  this.currentHand = 0
  this.hands = []
  this.playerCount = playerCount
  this.deckCount = deckCount
  this.pack = pack
  for (var i = 0; i <= playerCount; i++) {
    this.hands.push([])
  }
  this.dealerHand = this.hands[this.hands.length - 1]
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

Game.prototype.hit = function () {
  this.hands[this.currentHand].push(this.pack.remainingCards().pop());
};

Game.prototype.stand = function () {
  if (this.currentHand === this.hands.length - 1) {
    return 'Result Called'
  } else {
    this.currentHand++
  }
};

Game.prototype.result = function (hand) {
  if (this.handStatus(hand) === 'Blackjack' && this.handStatus(this.dealerHand) !== 'Blackjack' ||
  this.handScore(hand) > this.handScore(this.dealerHand) && this.handStatus(hand) === 'Live' ||
  this.handStatus(hand) === 'Live' && this.handStatus(this.dealerHand) === 'Bust') {
    return 'Player Wins!'
  } else if (this.handStatus(this.dealerHand) === 'Blackjack' && this.handStatus(hand) !== 'Blackjack' ||
  this.handStatus(hand) === 'Bust' ||
  this.handScore(this.dealerHand) > this.handScore(hand) && this.handStatus(this.dealerHand) === 'Live') {
    return 'Dealer Wins!'
  } else if (this.handStatus(this.dealerHand) === 'Blackjack' && this.handStatus(hand) === 'Blackjack' ||
  this.handScore(hand) === this.handScore(this.dealerHand)) {
    return 'Push!'
  }
};

Game.prototype.split = function (hand, handIndex) {
  var oneCardHands = [];
  for (var index = 0; index < hand.length; index += 1) {
      card = hand.slice(index, index + 1);
      oneCardHands.push(card);
  }
  this.hands[handIndex] = oneCardHands[0]
  this.hands.splice(handIndex + 1, 0, oneCardHands[1])
  this.hands[handIndex].push(this.pack.remainingCards().pop());
  this.hands[handIndex + 1].push(this.pack.remainingCards().pop());
};
