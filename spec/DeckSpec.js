describe('Deck', function(){
  let deck;
  let testDeck;

  beforeEach(function(){
    deck = new Deck
    testDeck = []
    suits = ['s', 'h', 'd', 'c'];
    ranks = [2, 3, 4, 5, 6, 7, 8, 9, 'T', 'J', 'Q', 'K', 'A'];
    for (var i = 0; i < suits.length; i++) {
      for (var x = 0; x < ranks.length; x++) {
        testDeck.push(ranks[x] + suits[i]);
      };
    };
  });

  describe('New Deck', function(){
    it('has card array containing 52 elements', function(){
      expect(deck.cards.length).toEqual(52)
    });

    it('contains 2-Ace of each suit', function(){
      var containsAll = testDeck.every(function(val) {
        return deck.cards.indexOf(val) !== -1;
      });
      expect(containsAll).toBe(true);
    });
  });
});
