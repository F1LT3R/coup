// var actions = require('lib/actions');
// var strategy = require('lib/strategy');

var playerCount = 0;
var game;

function Player (name, behavior) {

  "use strict";

  if (!name) {
    throw "Player needs name!";
  }

  playerCount += 1;

  var player = {

    uid: playerCount,
    name: name,
    behavior: behavior || {},

    isExiled: false,
    influences: [],
    lostInfluences: [],

    coins: 0,

    payCoins: function (amount) {
      if (this.coins >= amount) {
        this.coins -= amount;
        return amount;
      }

      if (this.coins > 0 && this.coins < amount) {
        var availableCoins = this.coins;
        this.coins = 0;
        return availableCoins;
      }

      return false;
    },

    takeCoins: function (amount) {
      this.coins += amount;
      return this;
    },

    counteractionOffered: function (action) {
      if (this.behavior.alwaysCounteract) {
        return true;
      }

      return false;
    },

    challengeOffered: function (action) {
      if (this.behavior.alwaysChallenge) {
        return true;
      }

      return false;
    },

    looseOneInfluence: function () {
      //
    },

    hasInfluence: function (influences) {
      var has = false;

      this.influences.forEach(function (influence) {
        if (this.influences.indexOf(influence) > -1) {
          has = true;
        }
      });

      return has;
    }


    // joinGame: function (gameInstance) {
    //   game = gameInstance;
    //   player.game = game;
    // },

    // recieveInfluence: function (influence) {
    //   player.influences.push(influence);
    // },

    // looseInfluence: function (influence) {
    //   var index = player.influences.indexOf(influence);

    //   if (index > -1) {
    //     var influenceToLoose = player.influences.splice(index, 1)[0];

    //     player.lostInfluences.push(influenceToLoose);
    //     player.checkExiled();

    //     return influenceToLoose;
    //   }
    // },

    // returnInfluence: function (influence) {
    //   var index = player.influences.indexOf(influence);

    //   if (index > -1) {
    //     var influenceToReturn = player.influences.splice(index, 1)[0];
    //     return influenceToReturn;
    //   } else {
    //     return false;
    //   }
    // },

    // checkExiled: function () {
    //   if (player.lostInfluences.length === 2 &&
    //       player.influences.length === 0) {
    //     player.exiled = true;
    //   }
    // },

    // returnAllCoins: function () {
    //   if (player.coins > 0) {
    //     var amount = player.coins;
    //     player.coins = 0;
    //     return amount;
    //   }
    // },

    // recieveCoins: function (amount) {
    //   player.coins += amount;
    // },

    // payCoins: function (amount) {
    //   if (this.coins >= amount) {
    //     this.coins -= amount;
    //     return amount;
    //   }

    //   if (this.coins > 0 && this.coins < amount) {
    //     var availableCoins = this.coins;
    //     this.coins = 0;
    //     return availableCoins;
    //   }

    //   return false;
    // },

    // takeTurn: function (game) {
    //   player.computeActions();

    //   var randomAction = player.actions.all[parseInt(Math.random() *
    //     player.actions.all.length)];

    //   var target;
    //   // console.log(randomAction, actions[randomAction]);

    //   if (actions[randomAction].requiresTarget) {
    //     target = player.pickTarget();
    //   } else {
    //     target = null;
    //   }

    //   game.claimAction(randomAction, player, target);

    //   game.completeTurn();
    // },

    // pickTarget: function () {
    //   var playerList = game.getPlayersNotSelf(player);
    //   return strategy.selectAtRandomFrom(playerList);
    // },

    // hasInfluence: function (action) {
    //   if (player.actions.bluffable.indexOf(action) !== -1) {
    //     // It was a bluff!
    //     return false;
    //   } else {
    //     // Challenger does have the influence!
    //     return true;
    //   }
    // },

    // chooseExchange: function () {
    //   // perhaps later: if (card1 || card 2) > player.influences[1 || 2] ?
    //   // For now: Make it random...
    //   var doExchange = strategy.fifty50();

    //   if (!doExchange) {
    //     return false;
    //   }

    //   var card1 = game.deck.drawRandom();
    //   var card2 = game.deck.drawRandom();
    //   var oldInfluence = strategy.oneOfN(player.influences);

    //   return strategy.flip(function () {
    //     return {
    //       oldCard: oldInfluence,
    //       newCard: card1,
    //       returnCard: card2,
    //     };
    //   }, function () {
    //     return {
    //       oldCard: oldInfluence,
    //       newCard: card2,
    //       returnCard: card1,
    //     };
    //   });

    // },

    // chooseWhichInflucenceToLoose: function () {
    //   return strategy.flip(function () {
    //     return player.influences[0];
    //   }, function () {
    //     return player.influences[1];
    //   });
    // },

    // chooseWhichInflucenceToReturn: function () {
    //   return strategy.flip(function () {
    //     return player.influences[0];
    //   }, function () {
    //     return player.influences[1];
    //   });
    // },

    // oponentActionClaimed: function (action) {
    //   // Challenge or pass
    //   var challenged = false;

    //   strategy.challenge(function () {
    //     challenged = true;
    //   });

    //   return challenged;
    // },

    // isActionChallengeable: function (action) {
    //   //return actions.general.concat(player.getCharacterActions());
    // },

    // getCharacterActions: function () {
    //   var characterActions = [];

    //   player.influences.forEach(function (influence) {
    //     var action = actions.byCharacter[influence];

    //     if (action && characterActions.indexOf(action) === -1) {
    //       characterActions.push(action);
    //     }
    //   });

    //   return characterActions;
    // },

    // getAvailableActions: function () {
    //   return actions.general.concat(player.getCharacterActions());
    // },

    // getAffordableActions: function (available) {
    //   var affordable = [];

    //   available.forEach(function (name) {
    //     if (Math.abs(actions[name].treasury) <= player.coins) {
    //       affordable.push(name);
    //     }
    //   });

    //   return affordable;
    // },

    // getBluffableActions: function (available) {
    //   var bluffable = [];

    //   actions.byBluff.forEach(function (bluff_action) {
    //     if (available.indexOf(bluff_action) === -1) {
    //       bluffable.push(bluff_action);
    //     }
    //   });

    //   return player.getAffordableActions(bluffable);
    // },

    // computeActions: function () {
    //   var available = player.getAvailableActions();
    //   var affordable = player.getAffordableActions(available);
    //   var bluffable = player.getBluffableActions(available);

    //   player.actions = {
    //     all: affordable.concat(bluffable),

    //     // Have the money and the card
    //     available: affordable,

    //     // Have the money but don't have the card
    //     bluffable: bluffable,
    //   };

    // },

  };

  return player;

}


module.exports = Player;