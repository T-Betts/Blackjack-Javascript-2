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

  describe('#shuffle', function(){
    it('shuffles the cards into a random order', function(){
      deck.shuffle();
      expect(deck.cards.slice(0, 13).join()).not.toEqual('2s,3s,4s,5s,6s,7s,8s,9s,Ts,Js,Qs,Ks,As')
    });
  });
});
