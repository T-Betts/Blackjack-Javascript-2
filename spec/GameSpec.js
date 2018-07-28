describe('Game', function(){
  let singleDeckPackDouble;
  let onePlayerOneDeckGame;

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
    onePlayerOneDeckGame = new Game(1, 1, singleDeckPackDouble);
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

    it('can only be called once per game', function(){
      onePlayerOneDeckGame.deal();
      expect( function(){ onePlayerOneDeckGame.deal() } ).toThrow('Cards already dealt');
    });
  });

  describe('#handScore', function(){
    it('should return soft value if hand containing an ace has a hard value more than 21', function(){
      onePlayerOneDeckGame.hands[0].push('5s', 'Ks', 'Ac');
      expect(onePlayerOneDeckGame.handScore(onePlayerOneDeckGame.hands[0])).toEqual(16);
    });

    it('should return hard value if hand containing an ace has a hard value less than or equal to 21', function(){
      onePlayerOneDeckGame.hands[0].push('Ks', 'Ac');
      expect(onePlayerOneDeckGame.handScore(onePlayerOneDeckGame.hands[0])).toEqual(21)
    });
  });

  describe('#handStatus', function(){
    it('should return "Blackjack" if initial dealt hand score equals 21', function(){
      onePlayerOneDeckGame.hands[0].push('As', 'Ks');
      expect(onePlayerOneDeckGame.handStatus(onePlayerOneDeckGame.hands[0])).toEqual('Blackjack');
    });

    it('should return "Bust" if the hand score is greater than 21', function(){
      onePlayerOneDeckGame.hands[0].push('9s', 'Ks');
      onePlayerOneDeckGame.hands[0].push('3d');
      expect(onePlayerOneDeckGame.handStatus(onePlayerOneDeckGame.hands[0])).toEqual('Bust');
    });

    it('should return "Live" if initial dealt hand is not blackjack', function(){
      onePlayerOneDeckGame.hands[0].push('5s', 'Ks');
      expect(onePlayerOneDeckGame.handStatus(onePlayerOneDeckGame.hands[0])).toEqual('Live');
    });
  });

  describe('#hit', function(){
    it('should add a card to the currentHand', function(){
      onePlayerOneDeckGame.hands[0].push('3h', '4d');
      onePlayerOneDeckGame.hit();
      expect(onePlayerOneDeckGame.hands[0].length).toEqual(3);
    });

    it('should throw error if called on a hand that is bust', function(){
      onePlayerOneDeckGame.hands[0].push('7h', 'Ks', 'Td');
      expect( function(){ onePlayerOneDeckGame.hit() } ).toThrow('Hand is bust')
    });

    it('should throw error if called on a hand with a score of 21', function(){
      onePlayerOneDeckGame.hands[0].push('Ah', 'Ks');
      expect( function(){ onePlayerOneDeckGame.hit() } ).toThrow('Hand score is 21')
    });
  });

  describe('#stand', function(){
    it('should switch currentHand to next in the hand array', function(){
      onePlayerOneDeckGame.stand();
      expect(onePlayerOneDeckGame.currentHand).toEqual(1);
    });

    it('should call result if the currentHand is the dealers', function(){
      onePlayerOneDeckGame.stand();
      expect(onePlayerOneDeckGame.stand()).toEqual('Result Called');
    });
  });

  describe('#result', function(){
    it('should return "Player Wins!" if player makes blackjack and dealer does not', function(){
      onePlayerOneDeckGame.hands[0].push('As', 'Kd');
      onePlayerOneDeckGame.hands[1].push('9s', 'Kh', '2c');
      expect(onePlayerOneDeckGame.result(onePlayerOneDeckGame.hands[0])).toEqual('Player Wins!');
    });

    it('should return "Player Wins!" if the player live hand scores more than dealer live hand', function(){
      onePlayerOneDeckGame.hands[0].push('Ks', '9d');
      onePlayerOneDeckGame.hands[1].push('7s', 'Kh');
      expect(onePlayerOneDeckGame.result(onePlayerOneDeckGame.hands[0])).toEqual('Player Wins!');
    });

    it('should return "Player Wins!" if the player hand is live and the dealer hand is bust', function(){
      onePlayerOneDeckGame.hands[0].push('Ks', '9d');
      onePlayerOneDeckGame.hands[1].push('7s', 'Kh', '5d');
      expect(onePlayerOneDeckGame.result(onePlayerOneDeckGame.hands[0])).toEqual('Player Wins!');
    });

    it('should return "Dealer Wins!" if dealer makes blackjack and player does not', function(){
      onePlayerOneDeckGame.hands[0].push('6d', 'Ts');
      onePlayerOneDeckGame.hands[1].push('As', 'Kh');
      expect(onePlayerOneDeckGame.result(onePlayerOneDeckGame.hands[0])).toEqual('Dealer Wins!');
    });

    it('should return "Dealer Wins!" if the player goes bust', function(){
      onePlayerOneDeckGame.hands[0].push('Kd', 'Kc', '2s');
      onePlayerOneDeckGame.hands[1].push('3d', '6c');
      expect(onePlayerOneDeckGame.result(onePlayerOneDeckGame.hands[0])).toEqual('Dealer Wins!');
    });

    it('should return "Dealer Wins!" if a live dealer hand scores more than a live player hand', function(){
      onePlayerOneDeckGame.hands[0].push('Kd', '2s');
      onePlayerOneDeckGame.hands[1].push('3d', 'Kc');
      expect(onePlayerOneDeckGame.result(onePlayerOneDeckGame.hands[0])).toEqual('Dealer Wins!');
    });

    it('should return "Push!" if both hands are blackjack', function(){
      onePlayerOneDeckGame.hands[0].push('Kd', 'As');
      onePlayerOneDeckGame.hands[1].push('Ad', 'Jc');
      expect(onePlayerOneDeckGame.result(onePlayerOneDeckGame.hands[0])).toEqual('Push!');
    });

    it('should return "Push!" if both handscores are equal', function(){
      onePlayerOneDeckGame.hands[0].push('6c', '9s');
      onePlayerOneDeckGame.hands[1].push('Ts', '5c');
      expect(onePlayerOneDeckGame.result(onePlayerOneDeckGame.hands[0])).toEqual('Push!');
    });
  });

  describe('#split', function(){
    it('it should split a hand into two new hands and add them to hands array', function(){
      onePlayerOneDeckGame.hands[0].push('6c', '6s');
      onePlayerOneDeckGame.split(onePlayerOneDeckGame.hands[0], 0)
      expect(onePlayerOneDeckGame.hands.length).toEqual(3)
    });

    it('should deal one card to each new hand', function(){
      onePlayerOneDeckGame.hands[0].push('6c', '6s');
      onePlayerOneDeckGame.split(onePlayerOneDeckGame.hands[0], 0)
      expect(onePlayerOneDeckGame.hands[0].length).toEqual(2)
      expect(onePlayerOneDeckGame.hands[1].length).toEqual(2)
    });
  });
});
