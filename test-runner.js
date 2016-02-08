(function () {
  
 'use strict';
 
  var tests = [], d_tests = [],
  begunTests = false,
  current_test = null,
  failures = 0;

  function expect (expect) {

    var assert = {
      expected: expect
    };

    current_test.asserts.push(assert);

    return {

      // Type check ===
      toBe: function (actual) {

        assert.actual = actual;
        assert.type = "toBe";

        if (expect === actual) {
          return pass(assert);
        }

        if (expect !== actual) {
          return fail(assert);
        }
      },

      // Truthy check ==
      toEqual: function (actual) {

        assert.actual = actual;
        assert.type = "toEqual";

        if (expect == actual) {
          return pass(assert);
        }

        if (expect != actual) {
          return fail(assert);
        }
      },

      toBeGreaterThan: function (actual) {

        assert.actual = actual;
        assert.type = "toBeGreaterThan";

        if (expect > actual) {
          return pass(assert);
        }

        if (expect <= actual) {
          return fail(assert);
        }
      },

      // Check 2 flat arrays are identical
      toEqualArray: function (actual) {

        assert.actual = actual;
        assert.type = "toEqualArray";

        if (expect.length !== actual.length) {
          return fail(assert);
        }

        var indentical = true;

        actual.forEach(function (item, index) {
          if (item !== expect[index]) {
            indentical = false;
            return false;
          }
        });

        if (!indentical) {
          return fail(assert);
        }

        return pass(assert);
      },

      // Check 2 flat arrays are different
      notToEqualArray: function (actual) {

        assert.actual = actual;
        assert.type = "notToEqualArray";

        if (expect.length !== actual.length) {
          return pass(assert);
        }

        var indentical = true;

        actual.forEach(function (item, index) {
          if (item !== expect[index]) {
            indentical = false;
            return false;
          }
        });

        if (!indentical) {
          return pass(assert);
        }

        return fail(assert);
      },

      // Check value exists in array
      toBeOneOf: function (actual) {

        assert.actual = actual;
        assert.type = "toBeOneOf";

        return actual.indexOf(expect) > -1 ? pass(assert) : fail(assert) ;
      },

    };
  }

  // hi
  // :) love you

  function pass () {
    // console.log('.');
    return true;
  }

  function fail (assert) {
    failures += 1;
    console.log('Fail: "'+(current_test.desc)+'",');
    console.log('\tExpected: '+('('+(typeof assert.actual)+') "'+assert.actual)+'" ' +
        assert.type+': '+('('+(typeof assert.expected)+') "'+assert.expected)+'"');
    return false;
  }

  function failTimeout (elapsed) {
    failures += 1;
    console.log('Fail: "'+current_test.desc+'",');
    console.log('\tTimeout expected: < '+current_test.timeout + ' ms, Actual: '+elapsed+' ms.');
    return false;
  }

  function describe (should, callback, ms) {
    tests.push({
      desc: should,
      spec: callback,
      asserts: [],
      timeout: ms
    });

    if (begunTests) {
      runTests();
    }
  }

  function ddescribe (should, callback, ms) {
    d_tests.push({
      desc: should,
      spec: callback,
      asserts: [],
      timeout: ms
    });

    if (begunTests) {
      runTests();
    }
  }



  function runTests () {

    //// overwrite describe for inner tests (maybe not a great idea)
    //describe = function (should, callback, ms) {
      //var start = + new Date();

      //(function (spec) {
        //spec();
      //}) (callback);

      //var now = + new Date()
        //, elapsed = now - start;
        

      //if (ms) {
        //if (elapsed > ms) {
          //failTimeout(elapsed);
        //}
      //}
    //};

    var startTests = + new Date();

    if (d_tests.length > 0) {
      tests = d_tests;
    }


    tests.forEach(function (test) {
      current_test = test;

      var start = + new Date();

      (function (spec) {
          spec();
      }) (test.spec);

      var now = + new Date(),
        elapsed = now - start;

      if (test.timeout) {
        if (elapsed > test.timeout) {
          failTimeout(elapsed);
        }
      }
    });

    var endTests = + new Date(),
      elapsed = endTests - startTests;

    if (failures === 0) {
      console.log('\nAll Tests pass in ' +(elapsed/1000) + ' seconds.');
    }

  }


  module.exports = {
    describe: describe,
    ddescribe: ddescribe,
    expect: expect,
    run: runTests,
  };




  // describe('Tests should work', function () {
  //   expect(1).toBe(1);
  //   expect(2).toBe(2);
  //   expect(3).toBe(3);
  //   expect(4).toBe(4);
  // });

  // describe('Tests should fail', function () {
  //   expect('').toEqual(0);
  // });

})();
