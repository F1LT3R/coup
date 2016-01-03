var test = require('./test-runner.js');

describe = test.describe;
ddescribe = test.ddescribe;
expect = test.expect;
run = test.run;



var Game = require('lib/game');
var Treasury = require('lib/treasury');
var Deck = require('lib/deck');
var Actions = require('lib/actions');
var Player = require('lib/player');

var playerNames = [
  'Natasha',
  'Sacha',
  'Haig',
  'Luis',
  'Jarek',
  'Stephanie',
];




// Action Scenarios
//
// AS
// A+C-
// C


describe('Natasha can sollect Income', function () {
  var treasury = Treasury().takeCoins(1);
  var deck = Deck();
  var actions = Actions();
  var game = Game(treasury, deck, actions);

  var Natasha = Player('Natasha', game);
  game.addPlayer(Natasha);
  game.action(actions.Income(Natasha, treasury));

  expect(Natasha.coins).toBe(1);
});


describe('Natasha can collect Foreign Aid', function () {
  var treasury = Treasury().takeCoins(2);
  var deck = Deck();
  var actions = Actions();
  var game = Game(treasury, deck, actions);

  var Natasha = Player('Natasha');
  game.addPlayer(Natasha);
  game.action(actions.ForeignAid(Natasha, treasury));

  expect(Natasha.coins).toBe(2);
});


describe('Natasha\'s Foreign Aid can be counteracted', function () {
  var treasury = Treasury().takeCoins(2);
  var deck = Deck();
  var actions = Actions();
  var game = Game(treasury, deck, actions);

  var Natasha = Player('Natasha');
  var Sasha = Player('Sasha', { alwaysCounteract: true });
  game.addPlayers([Natasha, Sasha]);

  expect(game.players.length).toBe(2);

  game.action(actions.ForeignAid(Natasha, treasury));
  expect(Natasha.coins).toBe(0);
});



describe('Natasha\'s Foreign Aid can be counteracted & challenged', function () {
  var treasury = Treasury().takeCoins(2);
  var deck = Deck();
  var actions = Actions();
  var game = Game(treasury, deck, actions);

  var Natasha = Player('Natasha');
  var Sasha = Player('Sasha', { alwaysCounteract: true });
  var Haig = Player('Haig', { alwaysChallenge: true });
  game.addPlayers([Natasha, Sasha, Haig]);
  expect(game.players.length).toBe(3);

  game.action(actions.ForeignAid(Natasha, treasury));
  expect(Natasha.coins).toBe(2);
});




describe('Natasha can collect Income', function () {
  var treasury = Treasury().takeCoins(1);
  var deck = Deck();
  var actions = Actions();
  var game = Game(treasury, deck, actions);

  var Natasha = Player('Natasha', game);
  game.addPlayer(Natasha);
  game.action(actions.Income(Natasha, treasury));

  expect(Natasha.coins).toBe(1);
});


describe('Natasha can collect Foreign Aid', function () {
  var treasury = Treasury().takeCoins(2);
  var deck = Deck();
  var actions = Actions();
  var game = Game(treasury, deck, actions);

  var Natasha = Player('Natasha');
  game.addPlayer(Natasha);
  game.action(actions.ForeignAid(Natasha, treasury));

  expect(Natasha.coins).toBe(2);
});


describe('Natasha\'s Foreign Aid can be counteracted', function () {
  var treasury = Treasury().takeCoins(2);
  var deck = Deck();
  var actions = Actions();
  var game = Game(treasury, deck, actions);

  var Natasha = Player('Natasha');
  var Sasha = Player('Sasha', { alwaysCounteract: true });
  game.addPlayers([Natasha, Sasha]);

  expect(game.players.length).toBe(2);

  game.action(actions.ForeignAid(Natasha, treasury));
  expect(Natasha.coins).toBe(0);
});





describe('Natasha can Coup Sasha for 7 coins', function () {
  var treasury = Treasury().takeCoins(7);
  expect(treasury.coins).toBe(7);

  var deck = Deck();
  var actions = Actions();
  var game = Game(treasury, deck, actions);

  var Natasha = Player('Natasha');
  var Sasha = Player('Sasha');
  game.addPlayers([Natasha, Sasha]);
  expect(game.players.length).toBe(2);

  Natasha.takeCoins(treasury.payCoins(7));
  expect(Natasha.coins).toBe(7);
  expect(treasury.coins).toBe(0);

  game.action(actions.Coup(Natasha, Sasha, treasury));
  expect(Natasha.coins).toBe(0);
  expect(treasury.coins).toBe(7);
});


describe('Natasha can Tax for 3 coins', function () {
  var treasury = Treasury().takeCoins(3);
  expect(treasury.coins).toBe(3);

  var deck = Deck();
  var actions = Actions();
  var game = Game(treasury, deck, actions);

  var Natasha = Player('Natasha');
  game.addPlayers([Natasha]);
  expect(game.players.length).toBe(1);

  expect(Natasha.coins).toBe(0);

  game.action(actions.Tax(Natasha, treasury));
  expect(Natasha.coins).toBe(3);
  expect(treasury.coins).toBe(0);
});


describe('Natasha\'s Tax can be challenged', function () {
  var treasury = Treasury().takeCoins(3);
  expect(treasury.coins).toBe(3);

  var deck = Deck();
  var actions = Actions();
  var game = Game(treasury, deck, actions);

  var Natasha = Player('Natasha');
  var Sasha = Player('Sasha', {alwaysChallenge: true});
  game.addPlayers([Natasha, Sasha]);
  expect(game.players.length).toBe(2);

  expect(Natasha.coins).toBe(0);

  game.action(actions.Tax(Natasha, treasury));
  expect(Natasha.coins).toBe(0);
  expect(treasury.coins).toBe(3);
});


describe('Natasha can Assassinate for 3 coins', function () {
  var treasury = Treasury().takeCoins(3);
  expect(treasury.coins).toBe(3);

  var deck = Deck();
  var actions = Actions();
  var game = Game(treasury, deck, actions);

  var Natasha = Player('Natasha');
  var Sasha = Player('Sasha');
  game.addPlayers([Natasha, Sasha]);
  expect(game.players.length).toBe(2);

  Natasha.takeCoins(treasury.payCoins(3));
  expect(Natasha.coins).toBe(3);
  expect(treasury.coins).toBe(0);

  game.action(actions.Assassinate(Natasha, Sasha, treasury, deck));
  expect(Natasha.coins).toBe(0);
  expect(treasury.coins).toBe(3);
});


describe('Natasha\'s Assassination can be challenged', function () {
  var treasury = Treasury().takeCoins(3);
  expect(treasury.coins).toBe(3);

  var deck = Deck();
  var actions = Actions();
  var game = Game(treasury, deck, actions);

  var Natasha = Player('Natasha');
  var Sasha = Player('Sasha', {alwaysChallenge: true});
  game.addPlayers([Natasha, Sasha]);
  expect(game.players.length).toBe(2);

  Natasha.takeCoins(treasury.payCoins(3));
  expect(Natasha.coins).toBe(3);
  expect(treasury.coins).toBe(0);

  game.action(actions.Assassinate(Natasha, Sasha, treasury, deck));
  expect(Natasha.coins).toBe(3);
  expect(treasury.coins).toBe(0);
});


describe('Natasha\'s Assassination can be challenged & counteracted', function () {
  var treasury = Treasury().takeCoins(3);
  expect(treasury.coins).toBe(3);

  var deck = Deck();
  var actions = Actions();
  var game = Game(treasury, deck, actions);

  var Natasha = Player('Natasha');

  var Sasha = Player('Sasha', {
    alwaysCounteract: true
  });

  var Haig = Player('Haig', {
    alwaysChallenge: true
  });

  game.addPlayers([Natasha, Sasha, Haig]);
  expect(game.players.length).toBe(3);

  Natasha.takeCoins(treasury.payCoins(3));
  expect(Natasha.coins).toBe(3);
  expect(treasury.coins).toBe(0);

  game.action(actions.Assassinate(Natasha, Sasha, treasury, deck));
  expect(Natasha.coins).toBe(0);
  expect(treasury.coins).toBe(3);
});


describe('Natasha can Steal', function () {
  var treasury = Treasury().takeCoins(2);
  expect(treasury.coins).toBe(2);

  var deck = Deck();
  var actions = Actions();
  var game = Game(treasury, deck, actions);

  var Natasha = Player('Natasha');

  var Sasha = Player('Sasha');

  game.addPlayers([Natasha, Sasha]);
  expect(game.players.length).toBe(2);

  Sasha.takeCoins(treasury.payCoins(2));
  expect(Sasha.coins).toBe(2);
  expect(treasury.coins).toBe(0);

  game.action(actions.Steal(Natasha, Sasha));
  expect(Natasha.coins).toBe(2);
  expect(treasury.coins).toBe(0);
});


describe('Natasha\'s Steal can be challenged', function () {
  var treasury = Treasury().takeCoins(2);
  expect(treasury.coins).toBe(2);

  var deck = Deck();
  var actions = Actions();
  var game = Game(treasury, deck, actions);

  var Natasha = Player('Natasha');

  var Sasha = Player('Sasha', {
    alwaysChallenge: true
  });

  game.addPlayers([Natasha, Sasha]);
  expect(game.players.length).toBe(2);

  Sasha.takeCoins(treasury.payCoins(2));
  expect(Sasha.coins).toBe(2);
  expect(treasury.coins).toBe(0);

  game.action(actions.Steal(Natasha, Sasha));
  expect(Natasha.coins).toBe(0);
  expect(Sasha.coins).toBe(2);
});


ddescribe('Natasha\'s Steal can be challenged & counteracted', function () {
  var treasury = Treasury().takeCoins(2);
  expect(treasury.coins).toBe(2);

  var deck = Deck();
  var actions = Actions();
  var game = Game(treasury, deck, actions);

  var Natasha = Player('Natasha');

  var Sasha = Player('Sasha', {
    alwaysCounteract: true,
  });

  var Haig = Player('Haig', {
    alwaysChallenge: true,
  });

  var Will = Player('Will', {
    alwaysChallenge: true,
    alwaysCounteract: true,
  });

  game.addPlayers([Natasha, Sasha, Haig, Will]);
  expect(game.players.length).toBe(4);

  Sasha.takeCoins(treasury.payCoins(2));
  expect(Sasha.coins).toBe(2);
  expect(treasury.coins).toBe(0);

  game.action(actions.Steal(Natasha, Sasha));
  expect(Natasha.coins).toBe(2);
  expect(Sasha.coins).toBe(0);
});


























test.run();



