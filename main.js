'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
/**
 * this function move the piece based on the strings that the user provided.
 * @param {string} startStack 
 * @param {string} endStack 
 */
const movePiece = (startStack, endStack) => {
  let move = stacks[startStack].pop();
  stacks[endStack].push(move);
  // Your code here

}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
/**
 * 
 * @param {string} startStack 
 * @param {string} endStack 
 * @returns 
 */

const isLegal = (startStack, endStack) => {
  if (stacks[startStack].length > 0) {
  if (stacks[endStack].length == 0 || stacks[endStack].slice(-1) > stacks[startStack].slice(-1)) {
    return true
  } else {
    return false
  }
  }
  // Your code here
}

// What is a win in Towers of Hanoi? When should this function run?
/**
 * 
 * @returns true if the user won the game.
 */
const checkForWin = () => {
  // Your code here
if (stacks['b'].length == 4 || stacks['c'].length == 4) {
  return true
} else {
  return false
}
}

// When is this function called? What should it do with its argument?
/**
* This function judje if the move is legal and if the player won the game.
 * @param {string} startStack 
 * @param {string} endStack 
*/
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  if (isLegal(startStack, endStack)){
    movePiece(startStack, endStack)
  } else {
    console.log("ILLEGAL MOVE");
  }
  if (checkForWin()){
    console.log("YOU WON!");
  }


}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
