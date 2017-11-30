/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});
  for (let i = 0; i < n; i++) {
    solution.togglePiece(i, i);
  }

  // var solution = undefined; //fixme
  // var board = new Board({n: n});
  // let placed = 0;
  // board.togglePiece(0, 0); 
  // placed++; 

  // for(let rowIndex = 0; rowIndex < n; rowIndex++){
  //   let row = board.get(rowIndex);
  //   console.log(board.get(rowIndex));
  //   for(let columnIndex = 0; columnIndex < n; columnIndex++){
  //    if(row[columnIndex] === 0){
  //     board.togglePiece(rowIndex, columnIndex);
  //     placed++;
  //     if(placed = n){
  //       solution = board.getMatrix;
  //       return solution;
  //     }else{
  //       board.togglePiece(rowIndex, columnIndex);
  //       placed--;
  //     }
  //    } 
  //   }
  // }  

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1; //fixme
  for (let i = 1; i <= n; i++) {
    solutionCount *= i;
  }
  

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
