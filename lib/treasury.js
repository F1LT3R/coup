module.exports = function Treasury () {

  "use strict";

  return {

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

  };

};