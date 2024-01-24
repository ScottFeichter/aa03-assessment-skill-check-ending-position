const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-spies'));
let endingPosition;
let endingPositionSpy;

describe('SECOND CHALLENGE: endingPosition - number of spaces changed to number of die to roll', function() {
  before(function() {
    endingPosition = formatFile();
  });

  it('should use a callback function to determine the number of spaces to move based on the number of die', function() {
    let rollDice = (numDie) => numDie + 1;
    expect(endingPosition([2, 3, -3, 0, 2], 0, rollDice)).to.eq(3);
    expect(endingPositionSpy).to.have.been.called.min(1);

    expect(endingPosition([1, 0, -2, 0, -3], 4, rollDice)).to.eq(1);
    expect(endingPositionSpy).to.have.been.called.min(2);


    rollDice = (numDie) => numDie * 2;
    expect(endingPosition([2, 0, 0, 0, 0],  0, rollDice)).to.eq(4);
    expect(endingPositionSpy).to.have.been.called.min(1);

    expect(endingPosition([0, 0, 1, 0, -2], 2, rollDice)).to.eq(0);
    expect(endingPositionSpy).to.have.been.called.min(2);
  });

  it('should treat the number of die as number of spaces if there is no callback function passed in', function() {
    expect(endingPosition([3, 1, -2, 1, 0], 1)).to.eq(4);
  });
});

function formatFile () {
  const fs = require('fs');
  const path = require('path');
  const args = [
    /(function\s+endingPosition\()|((?<=\n\s*)(const|let|var)?\s*endingPosition\s*=\s*function\s*\()|((?<=\n\s*)(const|let|var)?\s*endingPosition\s*=\s*\((?=.*=>))/g,
    "exports.endingPosition = function (",
    /=>/g,
    "",
    /(?<!function\s*)endingPosition\s*\(/g,
    "exports.endingPosition("
  ]

  if (!args.length) return require("../problems/ending-position");
  let file = fs.readFileSync(
    path.resolve(__dirname, "../problems/ending-position.js"),
    "utf-8"
  );
  let i = 0;
  while (i < args.length) {
    let [regex, replaceStr] = [args[i], args[i + 1]];
    file = file.replace(
      regex,
      replaceStr
    );
    i += 2;
  }
  const Module = module.constructor;
  const m = new Module();
  m._compile(file, "");
  const obj = m.exports;
  return function(...args) {
    chai.spy.restore(obj);
    endingPositionSpy = chai.spy.on(obj, "endingPosition");
    const result = endingPositionSpy(...args);
    return result;
  };
};