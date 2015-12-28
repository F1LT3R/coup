var test = require('./test-runner.js');

describe = test.describe;
expect = test.expect;
run = test.run;


var Game = require('lib/game');
var Treasury = require('lib/treasury');
var Deck = require('lib/deck');
var Actions = require('lib/actions');
var Player = require('lib/player');



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


describe('Natasha\'s Foreign Aid can be blocked', function () {
  var treasury = Treasury().takeCoins(2);
  var deck = Deck();
  var actions = Actions();
  var game = Game(treasury, deck, actions);

  var Natasha = Player('Natasha');
  var Sasha = Player('Sasha', { alwaysBlocks: true });
  game.addPlayers([Natasha, Sasha]);

  expect(game.players.length).toBe(2);

  game.action(actions.ForeignAid(Natasha, treasury));
  expect(Natasha.coins).toBe(0);
});


describe('Natasha\'s Foreign Aid can be blocked & challenged', function () {
  var treasury = Treasury().takeCoins(2);
  var deck = Deck();
  var actions = Actions();
  var game = Game(treasury, deck, actions);

  var Natasha = Player('Natasha');
  var Sasha = Player('Sasha', { alwaysBlocks: true });
  var Haig = Player('Haig', { alwaysChallenges: true });
  game.addPlayers([Natasha, Sasha, Haig]);
  expect(game.players.length).toBe(3);

  game.action(actions.ForeignAid(Natasha, treasury));
  expect(Natasha.coins).toBe(2);
});





test.run();



