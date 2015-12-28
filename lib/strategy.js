module.exports = {

  coinFlip: function (flipCb) {

    function success (finalCb) {
      finalCb();
    }

    function fail () {}

    if (Math.random() > 0.5) {
      flipCb(success, fail);
    } else {
      flipCb(fail, success);
    }

  },

  fifty50: function () {
    return Math.random() > 0.5;
  },

  oneOfThree: function (a, b, c) {
    switch (parseInt(Math.random() * 3)) {
      case 0: return a;
      case 1: return b;
      case 1: return c;
    }
  },

  oneOfN: function (ary) {
    var index = parseInt(Math.random() * ary.length);
    return ary[index];
  },

  flip: function (heads, tails) {
    return Math.random() > 0.5 ? heads() : tails () ;
  },


  challenge: function (callback) {
    // if (Math.random() > 0.854321) {
    if (Math.random() > 0.5) {
      callback();
    }
  },

  selectAtRandomFrom: function (list) {
    var index = parseInt(Math.random() * list.length);
    return list[index];
  },

};