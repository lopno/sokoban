function updateBoard(board, action) {
  // const board = immutable.fromJS(board);
  let playerRow = 0;
  let playerCol = 0;

  // TODO: this could be optimized
  board.map((row, rowIndex) => {
    row.map((cell, colIndex) => {
      if (cell === 1) {
        playerRow = rowIndex;
        playerCol = colIndex;
      }
    })
  });
  switch (action) {
    case 'left': {
      if (playerCol > 0 && board.getIn([playerRow, playerCol - 1]) === 0) {
        return board.withMutations(b => {
          b.setIn([playerRow, playerCol - 1], 1)
            .setIn([playerRow, playerCol], 0)
        });
      }
      if (playerCol > 1 && board.getIn([playerRow, playerCol - 1]) === 2
        && board.getIn([playerRow, playerCol - 2]) === 0) {
        return board.withMutations(b => {
          b.setIn([playerRow, playerCol - 2], 2)
            .setIn([playerRow, playerCol - 1], 1)
            .setIn([playerRow, playerCol], 0)
        });
      }
      return board;
    }
    case 'right': {
      if (playerCol < board.get(0).size - 1 && board.getIn([playerRow, playerCol + 1]) === 0) {
        return board.withMutations(b => {
          b.setIn([playerRow, playerCol + 1], 1)
            .setIn([playerRow, playerCol], 0)
        });
      }
      if (playerCol < board.get(0).size - 2 && board.getIn([playerRow, playerCol + 1]) === 2
        && board.getIn([playerRow, playerCol + 2]) === 0) {
        return board.withMutations(b => {
          b.setIn([playerRow, playerCol + 2], 2)
            .setIn([playerRow, playerCol + 1], 1)
            .setIn([playerRow, playerCol], 0)
        });
      }
      return board;
    }
    case 'up': {
      if (playerRow > 0 && board.getIn([playerRow - 1, playerCol]) === 0) {
        return board.withMutations(b => {
          b.setIn([playerRow - 1, playerCol], 1)
            .setIn([playerRow, playerCol], 0)
        });
      }
      if (playerRow > 1 && board.getIn([playerRow - 1, playerCol]) === 2
        && board.getIn([playerRow - 2, playerCol]) === 0) {
        return board.withMutations(b => {
          b.setIn([playerRow - 2, playerCol], 2)
            .setIn([playerRow - 1, playerCol], 1)
            .setIn([playerRow, playerCol], 0)
        });
      }
      return board;
    }
    case 'down': {
      if (playerRow < board.size - 1 && board.getIn([playerRow + 1, playerCol]) === 0) {
        return board.withMutations(b => {
          b.setIn([playerRow + 1, playerCol], 1)
            .setIn([playerRow, playerCol], 0)
        });
      }
      if (playerRow < board.size - 2 && board.getIn([playerRow + 1, playerCol]) === 2
        && board.getIn([playerRow + 2, playerCol]) === 0) {
        return board.withMutations(b => {
          b.setIn([playerRow + 2, playerCol], 2)
            .setIn([playerRow + 1, playerCol], 1)
            .setIn([playerRow, playerCol], 0)
        });
      }
      return board;
    }
    default: return board;
  }
}

function isSolved(board, solution) {
  return solution.reduce((solved, location) =>
    solved && board.getIn([location.get('row'), location.get('col')]) === 2
  , true)
}

module.exports = {
  updateBoard,
  isSolved,
};
