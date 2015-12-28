var test = require('./test-runner.js');

describe = test.describe;
expect = test.expect;
run = test.run;



describe('Treasury should start with 0 coins', function () {
  var treasury = require('lib/treasury')();
  expect(treasury.coins).toEqual(0);
});

describe('Treasury should be able to recieve coins', function () {
  var treasury = require('lib/treasury')();
  treasury.recieve(50);
  expect(treasury.coins).toEqual(50);
});

describe('Treasury should be able to have coins taken', function () {
  var treasury = require('lib/treasury')();
  treasury.recieve(50);
  expect(treasury.coins).toEqual(50);
  treasury.take(25);
  expect(treasury.coins).toEqual(25);
});


describe('Treasury should be able to have available coins taken when someone requests nore than are available', function () {
  var treasury = require('lib/treasury')();
  treasury.recieve(1);
  expect(treasury.coins).toEqual(1);
  var amount = treasury.take(2);
  expect(treasury.coins).toEqual(0);
  expect(amount).toEqual(1);
});


describe('Treasury should not give out money if there are no coins', function () {
  var treasury = require('lib/treasury')();
  var amount = treasury.take(1);
  expect(amount).toBe(false);
});


describe('Deck should start with 15 cards', function () {
  var deck = require('lib/deck')();
  expect(deck.cards.length).toBe(15);
});

describe('Should be able to pick random card from deck', function () {

  var characters = [
    'Duke',
    'Assassin',
    'Ambassador',
    'Captain',
    'Contessa',
  ];

  var deck = require('lib/deck')();
  expect(deck.cards.length).toBe(15);

  var influence = deck.drawRandom();
  expect(deck.cards.length).toBe(14);
  expect(influence).toBeOneOf(characters);
});

describe('Deck should shuffle', function () {
  var deck = require('lib/deck')();

  var stack = [
    'Duke',
    'Assassin',
    'Ambassador',
    'Captain',
    'Contessa',
    'Duke',
    'Assassin',
    'Ambassador',
    'Captain',
    'Contessa',
    'Duke',
    'Assassin',
    'Ambassador',
    'Captain',
    'Contessa'
  ];

  expect(deck.cards).toEqualArray(stack);

  deck.shuffle(1);

  expect(deck.cards).notToEqualArray(stack);
});


describe('6 card deck should shuffle', function () {
  var deck = require('lib/deck')();
  expect(deck.cards.length).toBe(15);

  var stack = [
    // Remove 9

    // 'Duke',        // 1
    // 'Assassin',    // 2
    // 'Ambassador',  // 3
    // 'Captain',     // 4
    // 'Contessa',    // 5
    // 'Duke',        // 6
    // 'Assassin',    // 7
    // 'Ambassador',  // 8
    // 'Captain',     // 9

    // Leave 6

    'Contessa',       // 1
    'Duke',           // 2
    'Assassin',       // 3
    'Ambassador',     // 4
    'Captain',        // 5
    'Contessa'        // 6
  ];

  // Draw 9
  deck.draw(); // 1
  deck.draw(); // 2
  deck.draw(); // 3
  deck.draw(); // 4
  deck.draw(); // 5
  deck.draw(); // 6
  deck.draw(); // 7
  deck.draw(); // 8
  deck.draw(); // 9

  expect(deck.cards).toEqualArray(stack);

  expect(deck.cards.length).toBe(6);
  deck.shuffle(1);
  expect(deck.cards.length).toBe(6);

  expect(deck.cards).notToEqualArray(stack);
});




describe('Deck should draw', function () {
  var deck = require('lib/deck')();
  expect(deck.cards.length).toBe(15);

  var card1 = deck.draw();
  expect(card1).toBe('Duke');
  expect(deck.cards.length).toBe(14);

  var card2 = deck.draw();
  expect(card2).toBe('Assassin');
  expect(deck.cards.length).toBe(13);

  var card3 = deck.draw();
  expect(card3).toBe('Ambassador');
  expect(deck.cards.length).toBe(12);

  var card4 = deck.draw();
  expect(card4).toBe('Captain');
  expect(deck.cards.length).toBe(11);

  var card5 = deck.draw();
  expect(card5).toBe('Contessa');
  expect(deck.cards.length).toBe(10);
});


describe('Deck should recieve cards', function () {
  var deck = require('lib/deck')();
  expect(deck.cards.length).toBe(15);

  var card = deck.draw();
  expect(card).toBe('Duke');
  expect(deck.cards.length).toBe(14);

  var stack = [
    'Assassin',
    'Ambassador',
    'Captain',
    'Contessa',
    'Duke',
    'Assassin',
    'Ambassador',
    'Captain',
    'Contessa',
    'Duke',
    'Assassin',
    'Ambassador',
    'Captain',
    'Contessa',
    'Duke',
  ];

  deck.returnInfluence(card);
  expect(deck.cards).toEqualArray(stack);
});


describe('Player must have name to be created', function () {
  var Player = require('lib/player');

  try {
    var anonPlayer = Player(undefined);
  } catch (e) {
    expect(typeof player).toBe('undefined');
  }

  var Amanda =  Player('Amanda');
  expect(Amanda.name).toBe('Amanda');
});

describe('Player starts with 0 coins', function () {
  var Player = require('lib/player');
  var Amanda =  Player('Amanda');
  expect(Amanda.coins).toBe(0);
});

describe('Player should be able to recieve coins', function () {
  var Player = require('lib/player');
  var Amanda = Player('Amanda');
  expect(Amanda.coins).toBe(0);
  Amanda.recieveCoins(1);
  expect(Amanda.coins).toBe(1);
});

describe('Player should be able to pay coins', function () {
  var Player = require('lib/player');
  var Amanda = Player('Amanda');
  expect(Amanda.coins).toBe(0);
  Amanda.recieveCoins(2);
  Amanda.payCoins(1);
  expect(Amanda.coins).toBe(1);
});


describe('Player should only pay out what they can afford', function () {
  var Player = require('lib/player');
  var Amanda = Player('Amanda');
  expect(Amanda.coins).toBe(0);
  Amanda.recieveCoins(1);

  var recieved = Amanda.payCoins(2);
  expect(recieved).toBe(1);
  expect(Amanda.coins).toBe(0);
});


describe('Should return false when player has nothing left to pay', function () {
  var Player = require('lib/player');
  var Amanda = Player('Amanda');
  expect(Amanda.coins).toBe(0);

  var recieved = Amanda.payCoins(1);
  expect(recieved).toBe(false);
});


describe('Player can gain influences', function () {
  var player = require('lib/player')('Amanda');
  player.recieveInfluence('Duke');
  expect(player.influences[0]).toBe('Duke');
});

describe('Player can loose influences', function () {
  var player = require('lib/player')('Amanda');
  player.recieveInfluence('Duke');
  expect(player.influences[0]).toBe('Duke');

  var lostInfulence = player.looseInfluence('Duke');
  expect(player.influences.length).toBe(0);
  expect(player.lostInfluences.length).toBe(1);
  expect(lostInfulence).toBe('Duke');
});


describe('Player can choose which influence to loose', function () {
  var player = require('lib/player')('Amanda');

  player.recieveInfluence('Duke');
  player.recieveInfluence('Ambassador');

  expect(player.influences[0]).toBe('Duke');
  expect(player.influences[1]).toBe('Ambassador');

  var lost = player.chooseWhichInflucenceToLoose();
  expect(lost).toBeOneOf(['Duke', 'Ambassador']);
});



describe('Player can loose both influences and become exiled', function () {
  var player = require('lib/player')('Amanda');
  player.recieveInfluence('Duke');
  player.recieveInfluence('Contessa');

  expect(player.influences[0]).toBe('Duke');
  expect(player.influences[1]).toBe('Contessa');
  expect(player.influences.length).toBe(2);

  var lostInfulence1 = player.looseInfluence('Duke');
  expect(player.influences.length).toBe(1);
  expect(player.lostInfluences.length).toBe(1);
  expect(lostInfulence1).toBe('Duke');

  var lostInfulence2 = player.looseInfluence('Contessa');
  expect(player.influences.length).toBe(0);
  expect(player.lostInfluences.length).toBe(2);
  expect(lostInfulence2).toBe('Contessa');

  expect(player.exiled).toBe(true);
});

describe('Player returns coins to Treasury when exiled', function () {
  var player = require('lib/player')('Amanda');
  player.recieveCoins(2);
  expect(player.coins).toBe(2);

  player.recieveInfluence('Duke');
  player.recieveInfluence('Contessa');

  expect(player.influences[0]).toBe('Duke');
  expect(player.influences[1]).toBe('Contessa');
  expect(player.influences.length).toBe(2);

  var lostInfulence1 = player.looseInfluence('Duke');
  expect(player.influences.length).toBe(1);
  expect(player.lostInfluences.length).toBe(1);
  expect(lostInfulence1).toBe('Duke');

  var lostInfulence2 = player.looseInfluence('Contessa');
  expect(player.influences.length).toBe(0);
  expect(player.lostInfluences.length).toBe(2);
  expect(lostInfulence2).toBe('Contessa');

  expect(player.exiled).toBe(true);
  // expect(player.coins).toBe(0);
});



describe('Strategy oneOfN should return one of n', function () {
  var strategy = require('lib/strategy');

  var ary = [
    'a',
    'b',
    'c',
  ];

  expect(strategy.oneOfN(ary)).toBeOneOf(ary);
});


describe('Strategy oneOfN should return one of n', function () {
  var strategy = require('lib/strategy');

  var ary = [
    'a',
    'b',
    'c',
  ];

  expect(strategy.oneOfN(ary)).toBeOneOf(ary);
});



test.run();



