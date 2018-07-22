describe('Deck', function(){
  describe('New Deck', function(){
    it('has a card array containing 52 elements', function(){
      deck = new Deck
      expect(deck.cards.length).toEqual(52)
    });
  });
});
