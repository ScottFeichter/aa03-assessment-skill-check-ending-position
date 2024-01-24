const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-spies'));
let endingPosition;
let endingPositionSpy;

describe('FIRST CHALLENGE: endingPosition', function() {
  before(function() {
    endingPosition = formatFile();
  });

  it('if the player has visited a position in the map before, it should return that position', function() {
    expect(endingPosition([2, 3, -2], 0)).to.eq(0);
    expect(endingPositionSpy).to.have.been.min(2);
    
    expect(endingPosition([1, 3, 0, 0, -3], 0)).to.eq(1);
    expect(endingPositionSpy).to.have.been.min(3);
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