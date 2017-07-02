import actions from '../constants/actions';

export function movePlayer(direction) {
  return {
    type: actions.playerMove,
    direction,
  };
}

export function undoMove(direction) {
  return {
    type: actions.playerMoveUndo,
    direction,
  };
}
