const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-spies'));
let endingPosition;
let endingPositionSpy;

describe('endingPosition (must use recursion)', function() {
  before(function() {
    endingPosition = formatFile();
  });

  it('should return the starting position if the map at the starting position has 0 number of spaces to move', function() {
    expect(endingPosition([0, 1], 0)).to.eq(0);
    expect(endingPosition([2, 0], 1)).to.eq(1);
    expect(endingPosition([3, 2, 0], 2)).to.eq(2);
    expect(endingPosition([-3, -2, 0], 2)).to.eq(2);
  });

  it('should return "Finish!" if the number of spaces at the starting position goes past the right side of the map', function() {
    expect(endingPosition([0, 1], 2)).to.eq("Finish!");
    expect(endingPosition([3, 0], 3)).to.eq("Finish!");
    expect(endingPosition([3, 2, 0], 3)).to.eq("Finish!");
    expect(endingPosition([2, -2, 3], 5)).to.eq("Finish!");
  });

  it('should return "Game Over..." if the number of spaces at the starting position goes past the left side of the map', function() {
    expect(endingPosition([-1, 0], -1)).to.eq("Game Over...");
    expect(endingPosition([2, -3], -2)).to.eq("Game Over...");
    expect(endingPosition([3, -4, 0], -3)).to.eq("Game Over...");
    expect(endingPosition([-3, -2, -6], -4)).to.eq("Game Over...");
  });

  it('should return the ending position in the map when the player ends their turn and they are still on the map', function() {
    expect(endingPosition([1, 0], 0)).to.eq(1);
    expect(endingPositionSpy).to.have.been.min(1);

    expect(endingPosition([2, 4, 0], 0)).to.eq(2);
    expect(endingPositionSpy).to.have.been.min(1);

    expect(endingPosition([1, 2, 2, 1, 0], 0)).to.eq(4);
    expect(endingPositionSpy).to.have.been.min(3);

    expect(endingPosition([0, -1, -2, -3, -4, -5], 4)).to.eq(0);
    expect(endingPositionSpy).to.have.been.min(1);

    expect(endingPosition([3, 1, -2, 1, 0], 1)).to.eq(4);
    expect(endingPositionSpy).to.have.been.min(4);
  });

  it('should return "Finish!" when the player ends their turn past the right side of the map', function() {
    expect(endingPosition([2, 0], 0)).to.eq("Finish!");
    expect(endingPosition([3, 0], 0)).to.eq("Finish!");
    expect(endingPosition([0, 1], 1)).to.eq("Finish!");
    expect(endingPosition([0, 2], 1)).to.eq("Finish!");
    expect(endingPosition([0, 3, 0], 1)).to.eq("Finish!");
    expect(endingPosition([0, 0, 25, 0, 0, 0, 0], 2)).to.eq("Finish!");

    expect(endingPosition([1, 1], 0)).to.eq("Finish!");
    expect(endingPositionSpy).to.have.been.min(2);

    expect(endingPosition([2, -1, 4], 1)).to.eq("Finish!");
    expect(endingPositionSpy).to.have.been.min(3);

    expect(endingPosition([2, 3, 1, 0, 2], 1)).to.eq("Finish!");
    expect(endingPositionSpy).to.have.been.min(2);
  });

  it('should return "Game Over..." when the player ends their turn past the left side of the map', function() {
    expect(endingPosition([-1, 4], 0)).to.eq("Game Over...");
    expect(endingPosition([-2, 0], 0)).to.eq("Game Over...");
    expect(endingPosition([0, -2], 1)).to.eq("Game Over...");
    expect(endingPosition([2, -2], 1)).to.eq("Game Over...");
    expect(endingPosition([-3, -4, 0, 0, 0, 0, -8], 6)).to.eq("Game Over...");

    expect(endingPosition([1, -2], 0)).to.eq("Game Over...");
    expect(endingPositionSpy).to.have.been.min(2);

    expect(endingPosition([1, -4], 0)).to.eq("Game Over...");
    expect(endingPositionSpy).to.have.been.min(2);

    expect(endingPosition([4, 0, 0, 0, -5], 0)).to.eq("Game Over...");
    expect(endingPositionSpy).to.have.been.min(2);

    expect(endingPosition([0, -1, -2, -4, -4, -5], 3)).to.eq("Game Over...");
    expect(endingPositionSpy).to.have.been.min(1);

    expect(endingPosition([2, 3, -3, 0, 2], 0)).to.eq("Game Over...");
    expect(endingPositionSpy).to.have.been.min(2);
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