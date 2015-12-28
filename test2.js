var test = require('./test-runner.js');

describe = test.describe;
expect = test.expect;
run = test.run;


var Actions = require('lib/actions');
var Treasury = require('lib/treasury');
var Game = require('lib/treasury');
var Player = require('lib/Player');

describe('Treasury should start with 0 coins', function () {


  var treasury = Treasury();
  var deck = Deck();
  var actions = Actions();

  var game = Game(treasure, deck, actions);
  var player1 = Player('Player 1');
  var player2 = Player('Player 2');


  treasury.recieve(2);
  expect(treasury.coins).toBe(2);

  // game.addAction(actions.Income(player, treasury));
  // game.resolveActions();

});

test.run();



