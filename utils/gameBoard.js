import Immutable from 'immutable';
import directions from '../constants/directions';
import boardElements from '../constants/boardElements';

function updateBoard(board, playerPos, nextTile, direction, shouldPush) {
  const currentTile = board.getIn([playerPos.get('row'), playerPos.get('col')]);
  const newPlayerPos = updatePlayerPos(playerPos, direction);
  const newBoxPos = updatePlayerPos(playerPos, direction, true);

  return board.withMutations(b =>
    shouldPush
      ? b.setIn(
      [playerPos.get('row'), playerPos.get('col')],
      currentTile === boardElements.playerOnGoal ? boardElements.goal : boardElements.floor)
      .setIn(
        [newPlayerPos.get('row'), newPlayerPos.get('col')],
        nextTile === boardElements.boxOnGoal || nextTile === boardElements.goal
          ? boardElements.playerOnGoal
          : boardElements.player)
      .setIn(
        [newBoxPos.get('row'), newBoxPos.get('col')],
        board.getIn([newBoxPos.get('row'), newBoxPos.get('col')]) === boardElements.goal
          ? boardElements.boxOnGoal
          : boardElements.box)
      : b.setIn(
      [playerPos.get('row'), playerPos.get('col')],
      currentTile === boardElements.playerOnGoal ? boardElements.goal : boardElements.floor)
      .setIn(
        [newPlayerPos.get('row'), newPlayerPos.get('col')],
        nextTile === boardElements.goal
          ? boardElements.playerOnGoal
          : boardElements.player)
  );
}

function isSolved(board) {
  return !board.some(row => row.includes(boardElements.box));
}

function getNextTile(board, playerPos, direction, isBox = false) {
  const distance = isBox ? 2 : 1;
  switch (direction) {
    case directions.up: return board.getIn([playerPos.get('row') - distance, playerPos.get('col')]);
    case directions.down: return board.getIn([playerPos.get('row') + distance, playerPos.get('col')]);
    case directions.right: return board.getIn([playerPos.get('row'), playerPos.get('col') + distance]);
    case directions.left: return board.getIn([playerPos.get('row'), playerPos.get('col') - distance]);
  }
}

function isMoveValid(board, playerPos, direction) {
  const nextTile = getNextTile(board, playerPos, direction);
  if (nextTile === boardElements.floor || nextTile === boardElements.goal) {
    return {
      nextTile,
      shouldPush: false,
    };
  }
  if (nextTile === boardElements.box || nextTile === boardElements.boxOnGoal) {
    const nextBoxTile = getNextTile(board, playerPos, direction, true);
    if (nextBoxTile === boardElements.floor || nextBoxTile === boardElements.goal) {
      return {
        nextTile,
        shouldPush: true,
      };
    }
  }
  return false;
}

function updatePlayerPos(playerPos, direction, isBox = false) {
  const distance = isBox ? 2 : 1;
  switch (direction) {
    case directions.up: return playerPos.set('row', playerPos.get('row') - distance);
    case directions.down: return playerPos.set('row', playerPos.get('row') + distance);
    case directions.right: return playerPos.set('col', playerPos.get('col') + distance);
    case directions.left: return playerPos.set('col', playerPos.get('col') - distance);
  }
}

function getPlayerPos(board) {
  let col = -1;
  let row = board.findIndex((row) => {
    let indexInRow = row.findIndex(element =>
    element === boardElements.player || element === boardElements.playerOnGoal);
    if (indexInRow > -1) {
      col = indexInRow;
      return true;
    }
    return false;
  });
  return Immutable.fromJS({
    col,
    row,
  });
}

function undoMove(board, playerPos, move) {
  return board;
}

module.exports = {
  updateBoard,
  updatePlayerPos,
  isSolved,
  isMoveValid,
  getPlayerPos,
  undoMove,
};
