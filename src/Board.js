// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      let row = this.get(rowIndex);
      let accumulator = [];
      row.forEach(function(value){
        if(value === 1){
          accumulator.push(value);
        }
      });
      if(accumulator.length > 1){
        return true;
      }      
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      let boardHeight = this.get('n');
      let conflict = false;
      for (let i = 0; i < boardHeight; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }  
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let boardHeight = this.get('n');
      let accumulator = [];
      for(let i = 0; i < boardHeight; i++){
        let row = this.get(i);
        if(row[colIndex] === 1){
          accumulator.push("");
        }
      }
      if(accumulator.length > 1){
        return true;
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let size = this.get('n');
      let conflict = false;
      for (let i = 0; i < size; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }  
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      let diagonal = [];
      let size = this.get('n');
      if (majorDiagonalColumnIndexAtFirstRow >= 0) {
        let start = majorDiagonalColumnIndexAtFirstRow;
        for (let i = 0; i < size - majorDiagonalColumnIndexAtFirstRow; i++) {
          let row = this.get(i);
          if (row[start] === 1){
            diagonal.push('');
          }
          if (diagonal.length > 1) {
            return true;
          }
          start++;
        }
      }
        
      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        let start = 0;
        let rowStart = majorDiagonalColumnIndexAtFirstRow * -1;
        for(let i = rowStart; i < size; i++) {
          let row = this.get(i);
          if (row[start] === 1) {
            diagonal.push('');
          }
          if (diagonal.length > 1) {
            return true;
          }
          start++;
        }
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let size = this.get('n');
      let start = size * -1 + 2;
      
      for(let i = start; i < size - 1; i++){
        if(this.hasMajorDiagonalConflictAt(i) === true){
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      let diagonal = [];
      let size = this.get('n');
      if (minorDiagonalColumnIndexAtFirstRow < size) {
        let start = minorDiagonalColumnIndexAtFirstRow;
        for (let i = 0; i < minorDiagonalColumnIndexAtFirstRow + 1; i++) {
          let row = this.get(i);
          if (row[start] === 1) {
            diagonal.push('');
          }
          if (diagonal.length > 1) {
            return true;
          }
          start--;
        }
      }
      if (minorDiagonalColumnIndexAtFirstRow >= size) {
        let start = size - 1;
        for (let i = minorDiagonalColumnIndexAtFirstRow - start; i < size; i++) {
          let row = this.get(i);
          if (row[start] === 1) {
            diagonal.push('');
          }
          if (diagonal.length > 1) {
            return true;
          }
          start--;
        }
        
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let size = this.get('n');
      for (let i = 1; i < size + 2; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
