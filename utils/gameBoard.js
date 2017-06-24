import immutable from 'immutable';

function updateBoard(board, action) {
  const imBoard = immutable.fromJS(board);
  let playerRow = 0;
  let playerCol = 0;

  // TODO: this could be optimized
  imBoard.map((row, rowIndex) => {
    row.map((cell, colIndex) => {
      if (cell === 1) {
        playerRow = rowIndex;
        playerCol = colIndex;
      }
    })
  });
  switch (action) {
    case 'left': {
      if (playerCol > 0 && imBoard.getIn([playerRow, playerCol - 1]) === 0) {
        return imBoard.withMutations(b => {
          b.setIn([playerRow, playerCol - 1], 1)
            .setIn([playerRow, playerCol], 0)
        }).toJS()
      }
      return board;
    }
    case 'right': {
      if (playerCol < imBoard.get(0).size - 1 && imBoard.getIn([playerRow, playerCol + 1]) === 0) {
        return imBoard.withMutations(b => {
          b.setIn([playerRow, playerCol + 1], 1)
            .setIn([playerRow, playerCol], 0)
        }).toJS()
      }
      return board;
    }
    case 'up': {
      if (playerRow > 0 && imBoard.getIn([playerRow - 1, playerCol]) === 0) {
        return imBoard.withMutations(b => {
          b.setIn([playerRow - 1, playerCol], 1)
            .setIn([playerRow, playerCol], 0)
        }).toJS()
      }
      return board;
    }
    case 'down': {
      if (playerRow < imBoard.size - 1 && imBoard.getIn([playerRow + 1, playerCol]) === 0) {
        return imBoard.withMutations(b => {
          b.setIn([playerRow + 1, playerCol], 1)
            .setIn([playerRow, playerCol], 0)
        }).toJS()
      }
      return board;
    }
    default: return board;
  }
}

module.exports = {
  updateBoard,
};
