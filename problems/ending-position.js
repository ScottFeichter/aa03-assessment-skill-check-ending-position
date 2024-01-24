/*
Use what you have learned so far to complete the problem below.

Implement a solution so that all test specs pass when you run the following
command in your terminal:
npm test test/01-ending-position-spec.js
*/

// Define a function using a function expression called endingPosition. The
// function should should accept two parameters. The first parameter is an array
// that represents a board game map. Each element in the map represents the
// number of spaces that the player should move if they are in that position of
// the map. The second parameter is an integer that represents a starting
// position on the map. When a player is at a position in the map, the element
// at that position tells the player the number of spaces they should move to
// from that position. If the player moves to a new position with a non-zero
// number of spaces, they should repeat this process. The player's turn ends
// when they move to a position with zero spaces or a position that is off of
// the map.

// There are three different outcomes to a player's turn:
// 1: If the player ends on a position that has a value of 0, then the function
//    should return that position. Here's a visual representation of this
//    outcome:
//    https://tinyurl.com/yzs4eses
// 2. If the player ends on a position to the right side of the map, then the
//    function should return a string of "Finish!". Here's a visual
//    representation of this outcome:
//    https://tinyurl.com/57w9w3j9
// 3. If the player ends on a position to the left side of the map, then the
//    function should return a string of "Game Over..." Here's a visual
//    representation of this outcome:
//    https://tinyurl.com/3b9wm7p7

// Constraints:
// You must use recursion to solve this problem.
// Do NOT mutate the input array.


// Your code here 


// Comment these out to debug the test cases in the console:
// console.log(endingPosition([2, 3, 1, 0, 2],  0)); //=> 3
// console.log(endingPosition([2, 3, 1, 0, 2],  1)); //=> 'Finish!'
// console.log(endingPosition([2, 3, -3, 0, 2], 0)); //=> 'Game Over...'



/******************************** FIRST CHALLENGE *****************************/
// If the player revisits a position that the player has been before in the same
// turn, then return the revisited position.

// Open this link to view a visual representation of the first challenge:
// https://tinyurl.com/53xxa9z2

// Run the following command to test your code:
// npm test test/02-ending-position-challenge-spec.js


// Comment these out to debug the test cases in the console:
// console.log(endingPosition([2, 3, -2, 0, 2], 0)); //=> 0



/******************************* SECOND CHALLENGE *****************************/
// Suppose that instead of the map representing the number of spaces to move at
// a given position, that each position in the map represents the number of dice
// to roll at that position. The result of the rolling of die determines the
// number of spaces to move.

// To simulate the rolling of die, a callback function should be defined as a
// third parameter to the function. The number of spaces that the player should
// move at a position should be the return value of the callback function
// invoked with the number of die at that position. If there is no callback
// function passed in, then the number of spaces to move equals the number of
// die to roll at a given position.

// Run the following command to test your code:
// npm test test/03-ending-position-challenge-spec.js


// Comment these out to debug the test cases in the console:
// let rollDice = (numDie) => numDie + 1;
// console.log(endingPosition([2, 3, -3, 0, 2], 0, rollDice)); //=> 3
// console.log(endingPosition([2, 0, -2, 0, 2], 1, rollDice)); //=> 1

// rollDice = (numDie) => numDie * 2;
// console.log(endingPosition([2, 0, 0, 0, 0],  0, rollDice)); //=> 4
// console.log(endingPosition([0, 0, 1, 0, -2], 2, rollDice)); //=> 0
