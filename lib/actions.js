var log = require('lib/log');

module.exports = function Actions () {

  return {

    // General  Actions

    Challenge: function (action, challenger) {
      return {
        name: 'Challenge',
        player: challenger,
        action: action,
        resolve: function () {
          log('RESOLVE', this);
          if (challenger.hasInfluence(action.requires)) {
            this.fail();
          } else {
            this.success();
          }
        },
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
        resolve: function () {
          this.success();
        },
        success: function () {
          player.takeCoins(treasury.payCoins(1));
          log('SUCCESS', this);
        },
      };
    },

    ForeignAid: function (player, treasury) {
      return {
        name: 'ForeignAid',
        player: player,
        counteractable: true,
        whoCanCounteract: 'ANYONE',
        counteraction: 'BlockForeignAid',
        resolve: function () {
          // Only fires if not blocked or challenged
          this.success();
        },
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

    Coup: function (player, foe, treasury) {
      return  {
        name: 'Coup',
        player: player,
        foe: foe,
        resolve: function () {
          log('RESOLVE', this);
          this.success();
        },
        success: function () {
          treasury.takeCoins(player.payCoins(7));
          foe.looseOneInfluence();
          log('SUCCESS', this);
        }
      };
    },


    // Character Actions

    Tax: function (player, treasury) {
      return {
        name: 'Tax',
        requires: ['Duke'],
        challengeable: true,
        player: player,
        resolve: function () {
          log('RESOLVE', this);
          this.success();
        },
        success: function () {
          player.takeCoins(treasury.payCoins(3));
          log('SUCCESS', this);
        },
        fail: function () {
          log('FAIL', this);
          player.looseOneInfluence();
        },
      };
    },

    Assassinate: function (player, foe, treasury, deck) {
      return {
        name: 'Assassinate',
        requires: ['Assassin'],
        player: player,
        foe: foe,
        challengeable: true,
        counteractable: true,
        whoCanCounteract: 'FOE',
        counteraction: 'BlockAssassination',
        resolve: function () {
          log('RESOLVE', this);
          this.success();
        },
        success: function () {
          treasury.takeCoins(player.payCoins(3));
          // deck.returnCard(foe.looseOneInfluence());
          foe.looseOneInfluence();
          log('SUCCESS', this);
        },
        fail: function () {
          log('FAIL', this);
        },
      };
    },

    Steal: function (player, foe) {
      return {
        name: 'Steal',
        requires: ['Captain'],
        challengeable: true,
        counteractable: true,
        whoCanCounteract: 'FOE',
        counteraction: 'BlockSteal',
        player: player,
        foe: foe,
        blockable: ['Captain', 'Ambassador'],
        resolve: function () {
          log('RESOLVE', this);
          this.success();
        },
        success: function () {
          player.takeCoins(foe.payCoins(2));
          log('SUCCESS', this);
        },
        fail: function () {
          log('FAIL', this);
        },
      };
    },

    Exchange: function (player, deck) {
      return {
        challengeable: true,
        requires: ['Ambassador'],

        success: function () {

          // var influences = player.influences;
          // influences.push(deck.draw());
          // influences.push(deck.draw());

          // var returnCards = player.discardTwoOfFour(influences);
          // deck.returnCard(returnCards);
          // deck.shuffle(4);
        }
      };
    },

    // Character Counteractions

    BlockForeignAid: function (action, counteractor) {
      return {
        name: 'BlockForeignAid',
        requires: ['Duke'],
        challengeable: true,
        player: counteractor,
        resolve: function () {
          // Only fires if not blocked or challenged
          this.success();
        },
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

    BlockAssassination: function (action, counteractor) {
      return {
        name: 'BlockAssassination',
        requires: ['Contessa'],
        challengeable: true,
        player: counteractor,
        resolve: function () {
          this.success();
        },
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

    BlockSteal:  function (action, counteractor) {
      return {
        name: 'BlockSteal',
        requires: ['Captain', 'Ambassador'],
        challengeable: true,
        player: counteractor,
        resolve: function () {
          this.success();
        },
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

  };

};