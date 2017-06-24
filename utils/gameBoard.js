import immutable from 'immutable';

function updateBoard(board, playerCol, playerRow, action) {
  const imBoard = immutable.fromJS(board);
  switch (action) {
    case 'left': {
      if (imBoard.getIn([playerRow, playerCol - 1]) === 0
        && playerCol > 0) {
        return imBoard.withMutations(b => {
          b.setIn([playerRow, playerCol -1], 1)
            .setIn([playerRow, playerCol], 0)
        }).toJS()
      }
      return board;
    }
  }
}

module.exports = {
  updateBoard,
};
