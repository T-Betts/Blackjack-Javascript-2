describe('Game', function(){
  describe('#deal', function(){
    it('deals two cards to every player and the dealer', function(){
      game = new Game(1, 4)
      game.deal()
      function hasTwoCards(hand) {
        return hand.length === 2;
      }
      expect(game.hands.every(hasTwoCards)).toBe(true)
    });
  });
});
