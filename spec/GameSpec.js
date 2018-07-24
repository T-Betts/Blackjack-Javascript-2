describe('Game', function(){
  describe('#deal', function(){
    it('deals two cards to every player and the dealer', function(){
      game = new Game(1, 4);
      game.deal();
      function hasTwoCards(hand) {
        return hand.length === 2;
      }
      expect(game.hands.every(hasTwoCards)).toBe(true);
    });
  });

  describe('handScore', function(){
    it('should return soft value if hand containing an ace has a hard value more than 21', function(){
      game = new Game(1, 1);
      game.hands[0].push('5s', 'Ks', 'Ac');
      expect(game.handScore(game.hands[0])).toEqual(16);
    });
  });
});
