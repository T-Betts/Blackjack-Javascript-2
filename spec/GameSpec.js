describe('Game', function(){
  let singleDeckPackDouble;
  let onePlayerGame;

  beforeEach(function(){
    var testPack = [];
    var suits = ['s', 'h', 'd', 'c'];
    var ranks = [2, 3, 4, 5, 6, 7, 8, 9, 'T', 'J', 'Q', 'K', 'A'];
    for (var i = 0; i < suits.length; i++) {
      for (var x = 0; x < ranks.length; x++) {
        testPack.push(ranks[x] + suits[i]);
      };
    };
    singleDeckPackDouble = jasmine.createSpyObj('singleDeckPackDouble',['shuffle', 'remainingCards']);
    singleDeckPackDouble.shuffle.and.returnValue(testPack);
    singleDeckPackDouble.remainingCards.and.returnValue(testPack);
    onePlayerGame = new Game(1, 1, singleDeckPackDouble);
  });

  describe('#deal', function(){
    it('deals two cards to every player and the dealer', function(){
      fourPlayerGame = new Game(1, 4, singleDeckPackDouble);
      fourPlayerGame.deal();
      function hasTwoCards(hand) {
        return hand.length === 2;
      }
      expect(fourPlayerGame.hands.every(hasTwoCards)).toBe(true);
    });
  });

  describe('#handScore', function(){
    it('should return soft value if hand containing an ace has a hard value more than 21', function(){
      onePlayerGame.hands[0].push('5s', 'Ks', 'Ac');
      expect(onePlayerGame.handScore(onePlayerGame.hands[0])).toEqual(16);
    });

    it('should return hard value if hand containing an ace has a hard value less than or equal to 21', function(){
      onePlayerGame.hands[0].push('Ks', 'Ac');
      expect(onePlayerGame.handScore(onePlayerGame.hands[0])).toEqual(21)
    });
  });

  describe('#handStatus', function(){
    it('should return "Blackjack" if initial dealt hand score equals 21', function(){
      onePlayerGame.hands[0].push('As', 'Ks');
      expect(onePlayerGame.handStatus(onePlayerGame.hands[0])).toEqual('Blackjack');
    });
  });
});
