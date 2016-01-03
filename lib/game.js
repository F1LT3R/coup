var log = require('lib/log');
var strategy = require('lib/strategy');

module.exports = function Game (treasury, deck, actions) {

  return {

    treasury: treasury,
    deck: deck,

    turnCount: 0,
    players: [],
    exiled: [],

    addPlayer: function (player) {
      if (this.players.length === 6) {
        throw 'Max players reached!';
      }

      this.players.push(player);
    },

    addPlayers: function (players) {
      var game = this;
      players.forEach(function (player) {
        game.addPlayer(player);
      });
    },

    action: function (action) {
      log('PLAY', action);

      if (action.counteractable) {
        var counteractor = this.offerCounteraction(action);

        if (counteractor) {
          this.action(actions[action.counteraction](action, counteractor));
          return;
        }
      }

      if (action.challengeable) {
        var challenger = this.offerChallenge(action);

        if (challenger) {
          this.action(actions.Challenge(action, challenger));
          return;
        }
      }

      // Not counteracted or challenged:
      action.resolve();
    },

    offerCounteraction: function (action) {
      var counteractor = false;

      if (action.whoCanCounteract === 'ANYONE') {
        this.playersAtRandom(action.player).forEach(function (player) {
          if (player.counteractionOffered(action)) {
            counteractor = player;
            return false;
          }
        });
      }

      if (action.whoCanCounteract === 'FOE') {
        if (action.foe.counteractionOffered(action)) {
          counteractor = action.foe;
        }
      }

      return counteractor;
    },

    offerChallenge: function (action) {
      var challenger = false;

      this.playersAtRandom(action.player).forEach(function (player) {
        if (player.challengeOffered(action)) {
          challenger = player;
          return false;
        }
      });

      return challenger;
    },

    playersAtRandom: function (exceptPlayer) {
      var randomList = [];

      this.players.forEach(function (player) {

        if (player.uid !== exceptPlayer.uid) {
          randomList.push(player);
        }
      });

      return randomList;
    },



    // actionStack: [],

    // addAction: function (action) {
    //   this.actionStack.push(action);
    // },

    // resolveAction: function (index) {
    //   var action = this.actionStack[index];

    //   if (action.challengeable) {
    //     this.addAction(this.offerChallenge(action));
    //   }

    //   console.log(action);
    // },



    // offerChallenge: function () {
    //   this.actionStack.push(action);
    // },






    // addPlayers: function (names) {
    //   names.forEach(function (name) {
    //     game.addPlayer(name);
    //   });
    // },

    // addPlayer: function (name) {
    //   if (game.players.length === 6) {
    //     throw 'Max players reached!';
    //   }

    //   var newPlayer = Player(name);
    //   newPlayer.joinGame(game);
    //   game.players.push(newPlayer);
    //   return newPlayer;
    // },


    deal: function () {
      var playerCount = game.players.length;
      var nCards = playerCount * 2;

      for (var i=0; i< nCards; i += 1) {
        var player = game.players[i % playerCount];
        player.recieveInfluence(deck.draw());
        player.recieveCoins(game.treasury.take(1));
      }
    },

    setup: function () {
      deck.shuffle(4);
      game.deal();
    },

    start: function () {
      print.title();
      game.turn();
    },

    // isChallengable: function (action) {
    //   return actions.unChallengeable.indexOf(action) === -1;
    // },

    // isBlockable: function (action) {
    //   return actions.unBlockable.indexOf(action) === -1;
    // },

    // offerChallenge: function (action) {
    //   for (var i=0; i< game.players.length; i += 1) {
    //     var _player = game.players[i];

    //     // Make sure a player does not challenge themselves
    //     if (_player.name !== game.currentPlayer.name) {

    //       var challenged = _player.oponentActionClaimed(action);

    //       if (challenged) {
    //         return _player;
    //       }
    //     }
    //   }

    //   return false;
    // },

    // claimAction: function (action, player, target) {
    //   // What is the action name?
    //   game.actionClaimed = action;

    //   // Who is the target? (player object)
    //   game.actionTarget = target || null;

    //   print.actionClaimed(action, player, target);

    //   if (game.isChallengable(action)) {
    //     var challengedBy = game.offerChallenge(action);

    //     if (challengedBy) {
    //       game.playerChallenge(challengedBy, game.currentPlayer);
    //     } else {
    //       print.notChallenged(action, player);
    //       game.continueAction(action, player, target);
    //     }
    //   } else {
    //     print.unChallengeable(action);
    //     game.continueAction(action, player, target);
    //   }
    // },

    // transactCoinsForAction: function () {
    //   var coins = actions[game.actionClaimed].treasury;
    //   var value = Math.abs(coins);

    //   if (coins < 0) {
    //     print.recievedFromTreasury(value, game.currentPlayer);
    //     game.currentPlayer.recieveCoins(game.treasury.take(value));
    //   }

    //   if (coins > 0) {
    //     print.paidToTreasury(value, game.currentPlayer);
    //     game.treasury.recieve(game.currentPlayer.payCoins(value));
    //   }
    // },

    // continueAction: function (action, player, target) {
    //   print.continueAction(action, target);

    //   if (actions[action].treasury) {
    //     game.transactCoinsForAction();
    //   }

    //   actions[action].callback(player, target);
    //   print.status(game);
    // },

    // playerChallenge: function (challenger) {
    //   game.actionChallengedBy = challenger.name;

    //   var influence = actions[game.actionClaimed].characters[0];

    //   print.actionChallenged(game.actionClaimed, challenger,
    //     game.currentPlayer, influence);


    //   if (game.currentPlayer.hasInfluence(game.actionClaimed)) {
    //     game.challengeFailed(challenger, influence);
    //   } else {
    //     game.challengeSucceeded(game.currentPlayer, influence);
    //   }
    // },

    // challengeSucceeded: function (player, influence) {
    //   print.challengeSucceeded(player, influence);

    //   print.chooseLooseInfluence(player);

    //   var lostInfluence = player.chooseWhichInflucenceToLoose();
    //   player.looseInfluence(lostInfluence);

    //   print.playerLostInfluence(player, lostInfluence);

    //   print.status(game);
    //   // turn ends
    // },

    // // Player DOES have influence
    // challengeFailed: function (challenger, influence) {
    //   print.challengeFailed(game.currentPlayer, influence);

    //   // Challenger looses influence
    //   game.makeChallengerLooseInfluence(challenger);

    //   game.makePlayerReturnInfluence(game.currentPlayer, influence);

    //   game.continueAction(game.actionClaimed, game.currentPlayer,
    //     challenger);
    // },

    // makePlayerReturnInfluence: function (player, influence) {
    //   var actualInfluence = player.returnInfluence(influence);
    //   deck.returnInfluence(actualInfluence);

    //   print.playerReturnedInfluence(player, influence);

    //   deck.shuffle(4);
    //   print.shuffle(4);

    //   var newInfluence = deck.drawRandom();
    //   player.recieveInfluence(newInfluence);

    //   print.playerPickedRandom(player);

    //   print.status(game);
    // },

    // makeChallengerLooseInfluence: function (challenger) {
    //   print.chooseLooseInfluence(challenger);

    //   var lostInfluence = challenger.chooseWhichInflucenceToLoose();
    //   challenger.looseInfluence(lostInfluence);

    //   print.playerLostInfluence(challenger, lostInfluence);

    //   return lostInfluence;
    // },

    // getPlayersNotSelf: function (requestor) {
    //   var playerList = [];

    //   game.players.forEach(function (player) {
    //     if (player.uid !== requestor.uid) {
    //       playerList.push(player);
    //     }
    //   });

    //   return playerList;
    // },

    // turn: function () {
    //   print.turn(game);

    //   var playerCount = game.players.length;
    //   game.currentPlayer = game.players[game.turnCount % playerCount];
    //   game.currentPlayer.isCurrent = true;
    //   print.status(game);
    //   game.currentPlayer.takeTurn(game);
    // },

    // completeTurn: function () {
    //   game.currentPlayer.isCurrent = false;
    //   game.turnCount += 1;

    //   if (game.turnCount < 1) {
    //     game.turn();
    //   }
    // },


  };

};