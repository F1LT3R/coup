var characters = require('lib/characters');


module.exports = function Deck () {

  function build () {
    var cards = [];

    // Deck State Old
    var ofEach = 3;
    for (var i=0; i < ofEach; i+=1) {
      cards = cards.concat(characters);
    }

    // Deck state new
    // for (var i=0; i < characters.length; i += 1) {
    //   var character = characters[i];
    //   cards = cards.concat([character, character, character]);
    // }

    return cards;
  }


  function split (cards) {
    // RightHand is always shorter (floor)
    var halfWayPoint = Math.floor(cards.length / 2);

    return {
      leftHand: cards.splice(halfWayPoint),
      rightHand: cards,
    };
  }

  function realisticShuffle (cards) {

    // The new pile to be returned
    var pile = [];

    cards = split(cards);
    var rightHandCount = cards.rightHand.length;

    // Flick cards into new pile
    for (var i=0; i < rightHandCount; i += 1) {
      switch (Math.random() > 0.5) {
        case true:
          pile.push(cards.rightHand.pop());
          pile.push(cards.leftHand.pop());
          break;
        case false:
          pile.push(cards.leftHand.pop());
          pile.push(cards.rightHand.pop());
          break;
      }
    }

    // Push outstanding card from lefthand (if deck is even number)
    if (cards.leftHand.length > 0) {
      pile.push(cards.leftHand.pop());
    }

    // Split the deck again and put the top on the bottom
    cards = split(pile);
    pile = cards.leftHand.concat(cards.rightHand);

    return pile;
  }



  return {

    cards: build(characters),

    shuffle: function (times) {
      for (var i=0; i<  (times || 1); i += 1) {
        deck.cards = realisticShuffle(deck.cards);
      }
    },

    // Draw from top of deck
    draw: function () {
      return deck.cards.shift();
    },

    returnCard: function (influence) {
      deck.cards.push(influence);
    },

    drawRandom: function () {
      var index = parseInt(Math.random() * deck.cards.length);
      var randomInfluence = deck.cards.splice(index, 1)[0];
      return randomInfluence;
    },

  };

};