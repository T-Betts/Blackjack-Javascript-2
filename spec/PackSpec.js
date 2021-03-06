describe('Pack', () => {
  let pack;
  let testPack;

  beforeEach(() => {
    pack = new Pack;
    testPack = [];
    suits = ['s', 'h', 'd', 'c'];
    ranks = [2, 3, 4, 5, 6, 7, 8, 9, 'T', 'J', 'Q', 'K', 'A'];
    for (var i = 0; i < suits.length; i++) {
      for (var x = 0; x < ranks.length; x++) {
        testPack.push(ranks[x] + suits[i]);
      };
    };
  });

  describe('#remainingCards', () => {
    it('has card array containing 52 elements', () => {
      expect(pack.remainingCards().length).toEqual(52);
    });

    it('contains 2-Ace of each suit', () => {
      var containsAll = testPack.every((val) => {
        return pack.remainingCards().indexOf(val) !== -1;
      });
      expect(containsAll).toBe(true);
    });

    it('can contain multiple 52-card decks', () => {
      fiveDeckPack = new Pack(5);
      expect(fiveDeckPack.remainingCards().length).toEqual(260);
    });
  });

  // Not sure how to test that the shuffle method works due to use of Math.random.
  describe('#shuffle', () => {
    it('shuffles the cards into a random order', () => {
      pack.shuffle();
      expect(pack.remainingCards().slice(0, 13).join()).not.toEqual('2s,3s,4s,5s,6s,7s,8s,9s,Ts,Js,Qs,Ks,As');
    });
  });
});
