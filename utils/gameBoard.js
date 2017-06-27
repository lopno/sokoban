import directions from '../constants/directions';
import boardElements from '../constants/boardElements';

function updateBoard(board, playerPos, nextTile, direction, shouldPush) {
  const currentTile = board.getIn([playerPos.get('row'), playerPos.get('col')]);
  const newPlayerPos = updatePosition(playerPos, direction);
  const newBoxPos = updatePosition(playerPos, direction, true);

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
        shouldPush ? boardElements.box : board.getIn([newBoxPos.get('row'), newBoxPos.get('col')]))
      : b.setIn(
      [playerPos.get('row'), playerPos.get('col')],
      currentTile === boardElements.playerOnGoal ? boardElements.goal : boardElements.floor)
      .setIn(
        [newPlayerPos.get('row'), newPlayerPos.get('col')],
        nextTile === boardElements.boxOnGoal || nextTile === boardElements.goal
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
  if (nextTile === boardElements.box || boardElements.boxOnGoal) {
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

function updatePosition(playerPos, direction, isBox = false) {
  const distance = isBox ? 2 : 1;
  switch (direction) {
    case directions.up: return playerPos.set('row', playerPos.get('row') - distance);
    case directions.down: return playerPos.set('row', playerPos.get('row') + distance);
    case directions.right: return playerPos.set('col', playerPos.get('col') + distance);
    case directions.left: return playerPos.set('col', playerPos.get('col') - distance);
  }
}

module.exports = {
  updateBoard,
  updatePosition,
  isSolved,
  isMoveValid,
};
