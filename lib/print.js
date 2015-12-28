require('req/color');

var actions = require('lib/actions');


function log (text, col) {
  console.log((text)[col || 'reset']);
}

module.exports = {

  steals: function (player, coins, foe) {
    log('Player: '+ player.name.underline +
      ', steals '+ (''+coins+' coins').underline +', from: ' +
      (foe.name.underline) +'.', 'green');
  },

  playerPickedRandom: function (player) {
    log('Player: '+ player.name.underline +
      ', picked a new influence from the deck at random.');
  },

  shuffle: function (times) {
    log('The deck was shuflled: '+(''+times+' times').underline+'.');
  },

  playerReturnedInfluence: function (player, influence) {
    log('Player: '+ player.name.underline +
      ', returned their '+ (influence.underline) +' to the Deck.');
  },

  chooseReturnInfluence: function (player) {
    log('Player: '+ player.name.underline +
      ', must choose to '+('return'.underline) +' an influence...');
  },

  playerLostInfluence: function (player, lostInfluence) {
    log('Player: '+ player.name.underline +
      ', chose to loose their: ' + lostInfluence.underline, 'reset');
  },

  chooseLooseInfluence: function (player) {
    log('Player: '+ player.name.underline +
      ', must choose to '+('loose'.underline)+' an influence...');
  },

  challengeSucceeded: function (player, influence) {
    log('Player: '+ player.name.underline +
      ', does not have influence: ' + influence.underline, 'red');

    log('Challenge suceeded!', 'green');
  },

  challengeFailed: function (player, influence) {
    log('Player: '+ player.name.underline +
      ', revealed influence: ' + influence.underline);

    log('Challenge failed!', 'red');
  },

  actionChallenged: function (action, challenger, player, influence) {
    log('Action: '+ (action).underline +
      ', challenged by: ' + (challenger.name).underline + '!', 'red');

    log(player.name.underline +
      ', must reveal their: ' + influence.underline + '.');
  },

  notChallenged: function (action, player) {
    log('Action: '+ action.underline +
      ', goes un-challenged.', 'reset');
  },

  unChallengeable: function (action) {
    log('Action: '+ action.underline + ' is not challengeable.', 'reset');
  },

  continueAction: function (action, target) {
    var parts = [
      'Continue action: '+ (action.underline),
      (target ? ', against: ' + (target.name.underline) : ''),
    ];

    log(parts.join(''), 'cyan');
  },

  actionClaimed: function (action, player, target) {
    var parts = [
      player.name.underline + ' claimed: ' + (action.underline),
      (target ? ', against: ' + target.name.underline : ''),
    ];

    log(parts.join(''), 'cyan');
  },

  recievedFromTreasury: function (value, player) {
    log(player.name.underline.green +
      (', recieves: ').green +
      ( ''+value+' coin' + (value > 1 ? 's' : '') ).underline.green +
      ' from the Court Treasury.'.green);
  },

  paidToTreasury: function (value, player) {
    log(player.name.underline.green +
      (', pays: ').green +
      ( ''+value+' coin' + (value > 1 ? 's' : '') ).underline.green +
      ' to the Court Treasury.'.green);
  },

  turn : function (game) {
    console.log('\n'.reset + (' Turn: ' + game.turnCount + ' ').bgRed.white);
  },

  title: function () {
    console.log(' -+♦+- C O U P -+♦+- '.bgGreen.white.bold);
  },

  status: function (game) {

    function repeat (char, n) {
      var str = '';

      for (var i=0; i< n; i +=1) {
        str += char;
      }

      return str;
    }

    var parts = [
      '\n'.reset,
      'Court'.white.underline + '\n\n',
      'Treasury: '.cyan + (repeat('✪', game.treasury.coins) + ' x' +
        game.treasury.coins).yellow + '\n',
      'Deck: '.cyan + (repeat('🂠', game.deck.cards.length)  + ' x' +
        game.deck.cards.length).green+'\n',

      // 'Claimed Action: '.cyan + (game.actionClaimed || 'None') + '\n',
      // 'Challenged By: '.cyan + (game.actionChallengedBy || 'Nobody') + '\n',

      '\n'.reset,
      'Players'.white.underline + '\n',
    ];

    console.log(parts.join(''));



    game.players.forEach(function (player) {

      var parts = [
        (player.isCurrent ? '>'.green : ' '.reset) + ' ',
        (player.name + ':')[player.isCurrent ? ['white'] : 'reset'] + ' ',
        (repeat('🂠', player.influences.length) + ' x' + player.influences.length).green + ', ',
        player.lostInfluences.length ? ('[' + player.lostInfluences.join() + '] ').red : '',
        (repeat('✪', player.coins) + ' x' + player.coins).yellow,
      ];

      console.log(parts.join(''));
    });

    console.log('\n');
  },

};