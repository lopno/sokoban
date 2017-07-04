import Immutable from 'immutable';
import directions from '../constants/directions';
import boardElements from '../constants/boardElements';

function updateBoard(board, playerPos, nextTile, direction, shouldPush) {
  const currentTile = board.getIn([playerPos.get('row'), playerPos.get('col')]);
  const newPlayerPos = updatePlayerPos(playerPos, direction);
  const newBoxPos = updatePlayerPos(playerPos, direction, 2);

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

function updatePlayerPos(playerPos, direction, distance = 1) {
  switch (direction) {
    case directions.up: return playerPos.set('row', playerPos.get('row') - distance);
    case directions.down: return playerPos.set('row', playerPos.get('row') + distance);
    case directions.right: return playerPos.set('col', playerPos.get('col') + distance);
    case directions.left: return playerPos.set('col', playerPos.get('col') - distance);
  }
}

function getRelativePos(position, direction, distance) {
  switch (direction) {
    case directions.up: return position.set('row', position.get('row') - distance);
    case directions.down: return position.set('row', position.get('row') + distance);
    case directions.left: return position.set('col', position.get('col') - distance);
    case directions.right: return position.set('col', position.get('col') + distance);
    default: return position;
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

function undoMove(board, playerPos, latestMove) {
  const boxPosition = getRelativePos(playerPos, latestMove.direction, 1);
  const boxTile = board.getIn([boxPosition.get('row'), boxPosition.get('col')]);
  const playerTile = board.getIn([playerPos.get('row'), playerPos.get('col')]);
  const previousPosition = getRelativePos(playerPos, latestMove.direction, -1);
  const previousTile = board.getIn([previousPosition.get('row'), previousPosition.get('col')]);
  let newBoxTile;
  switch (boxTile) {
    case boardElements.wall:
      newBoxTile = boardElements.wall;
      break;
    case boardElements.box:
      newBoxTile = latestMove.shouldPush ? boardElements.floor : boardElements.box;
      break;
    case boardElements.floor:
      newBoxTile = boardElements.floor;
      break;
    case boardElements.boxOnGoal:
      newBoxTile = latestMove.shouldPush ? boardElements.goal : boardElements.boxOnGoal;
    case boardElements.goal:
      newBoxTile = boardElements.goal;
      break;
    default:
      newBoxTile = boxTile;
  }

  let newPlayerTile;
  if (playerTile === boardElements.playerOnGoal) {
    if (latestMove.shouldPush
      && (boxTile === boardElements.box || boxTile === boardElements.boxOnGoal)) {
      newPlayerTile = boardElements.boxOnGoal;
    } else {
      newPlayerTile = boardElements.goal;
    }
  } else {
    if (latestMove.shouldPush
      && (boxTile === boardElements.box || boxTile === boardElements.boxOnGoal)) {
      newPlayerTile = boardElements.box;
    } else {
      newPlayerTile = boardElements.floor;
    }
  }

  return board.withMutations(b =>
    b
      .setIn([boxPosition.get('row'), boxPosition.get('col')], newBoxTile)
      .setIn([playerPos.get('row'), playerPos.get('col')], newPlayerTile)
      .setIn([previousPosition.get('row'), previousPosition.get('col')],
        previousTile === boardElements.goal
          ? boardElements.playerOnGoal
          : boardElements.player)
  );
}

module.exports = {
  updateBoard,
  updatePlayerPos,
  isSolved,
  isMoveValid,
  getPlayerPos,
  undoMove,
};
