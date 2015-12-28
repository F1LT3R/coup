var log = require('lib/log');

module.exports = function Actions () {

  return {

    // General  Actions

    Challenge: function (action, challenger) {
      return {
        name: 'Challenge',
        player: challenger,
        action: action,
        success: function () {
          log('SUCCESS', this);
          action.fail();
          action.player.looseOneInfluence();
        },
        fail: function () {
          log('FAIL', this);
          challenger.looseOneInfluence();
          action.success();
        },
      };
    },

    Income: function (player, treasury) {
      return {
        name: 'Income',
        player: player,
        success: function () {
          player.takeCoins(treasury.payCoins(1));
          log('SUCCESS', this);
        },
      };
    },

    ForeignAid: function (player, treasury) {
      return {
        name: 'Foreign Aid',
        player: player,
        counteractable: true,
        whoCanCounteract: 'ANYONE',
        counteraction: 'BlockForeignAid',
        success: function () {
          player.takeCoins(treasury.payCoins(2));
          log('SUCCESS', this);
        },
        fail: function () {
          // No foreign aid for player!
          log('FAIL', this);
        },
      };
    },

    Coup: function (player, foe) {
      return  {
        success: function () {
          foe.looseOneInfluence();
        }
      };
    },


    // Character Actions

    Tax: function (player, treasury) {
      return {
        requires: ['Duke'],
        challengeable: true,
        success: function () {
          player.takeCoins(treasury.payCoins(3));
        }
      };
    },

    Assassinate: function (player, foe, treasury, deck) {
      return {
        requires: ['Assassin'],
        blockable: ['Contessa'],
        challengeable: true,
        success: function () {
          treasure.takeCoins(player.payCoins(3));
          deck.returnCard(foe.looseOneInfluence());
        },
      };
    },

    Steal: function (player, foe) {
      return {
        requires: ['Captain'],
        challengeable: true,
        blockable: ['Captain', 'Ambassador'],
        success: function () {
          player.takeCoins(foe.payCoins(2));
        },
      };
    },

    Exchange: function (player, deck) {
      return {
        challengeable: true,
        requires: ['Ambassador'],

        success: function () {

          var influences = player.influences;
          influences.push(deck.draw());
          influences.push(deck.draw());

          var returnCards = player.discardTwoOfFour(influences);
          deck.returnCard(returnCards);
          deck.shuffle(4);
        }
      };
    },

    // Character Counteractions

    BlockForeignAid: function (action, counteractor) {
      return {
        name: 'Block Foreign Aid',
        player: counteractor,
        requires: ['Duke'],
        challengeable: true,
        success: function () {
          action.fail();
          log('SUCCESS', this);
        },
        fail: function () {
          log('FAIL', this);
          counteractor.looseOneInfluence();
          action.success();
        }

      };
    },

    // BlockAssassination: function (action) {
    //   treasury: 0,
    //   characters: ['Contessa'],
    //   callback: function () {
    //   }
    // },

    // 'Block Steal': {
    //   treasury: 0,
    //   characters: ['Ambassador', 'Captain'],
    //   callback: function () {
    //   }
    // },

















































    // byCharacter: {
    //   Duke: 'Tax',
    //   Assassin: 'Assassinate',
    //   Ambassador: 'Exchange',
    //   Captain: 'Steal',
    //   Contessa: null
    // },

    // byCounter: {
    //   Duke: 'Block Foreign Aid',
    //   Ambassador: 'Block Steal',
    //   Captain: 'Block Steal',
    //   Contessa: 'Block Assassination',
    // },

    // byBluff: [
    //   'Tax',
    //   'Assassinate',
    //   'Steal',
    //   'Exchange',
    // ],

    // general: [
    //   'Income',
    //   'Foreign Aid',
    //   'Coup',
    // ],

    // unChallengeable: [
    //   'Income',
    //   'Foreign Aid',
    //   'Coup',
    // ],

    // unBlockable: [
    //   'Income',
    //   'Coup',
    // ],


  };

};