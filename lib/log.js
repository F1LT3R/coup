var indentChar = '.';


require('req/color');


function repeat (char, n) {
  var str = '';

  for (var i=0; i< n; i +=1) {
    str += char;
  }

  return str;
}


var offset = -2;
var offsetAmt = 2;


var colors = [
  'red',
  'green',
  'yellow',
  'magenta',
  'cyan',
];


function log (msg) {
  var str = indent() + msg;
  var index = ((offset/offsetAmt)) % (colors.length-1);
  console.log(str[colors[index]]);
}


function indent () {
  return repeat(indentChar, offset);
}


function successByAction (data) {

  switch (data.name) {

    case 'Income':
      console.log(indent() + data.player.name.bold + ' recevies ' + '1 coins'.bold + ' from the Court Treasury.');
      break;

    case 'Foreign Aid':
      console.log(indent() + data.player.name.bold + ' recevies ' + '2 coins'.bold + ' from the Court Treasury.');
      break;

    case 'Challenge':
      console.log(indent() +
        data.player.name.bold + ' causes ' + data.action.player.name.bold + ' to loose an influence.');
      break;
  }
}


module.exports = function Log (type, data) {

  switch (type) {

    case 'PLAY':
      offset += offsetAmt;
      log('PLAY: ' + (data.name.underline) + ' by: ' +(data.player.name.underline));
      // byAction(type, data);
      break;

    case 'SUCCESS':
      log('SUCCESS: ' + (data.name.underline) + ' by: ' +(data.player.name.underline));
      successByAction(data);
      offset -= offsetAmt;
      break;

    case 'FAIL':
      log('FAIL: ' + (data.name.underline) + ' by: ' +(data.player.name.underline));
      // byAction(type, data);
      offset -= offsetAmt;
      break;
  }

};