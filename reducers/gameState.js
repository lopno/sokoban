import Immutable from 'immutable';
import actions from '../constants/actions';
import { isMoveValid, updateBoard, updatePosition, isSolved } from '../utils/gameBoard';

const initialState = Immutable.fromJS({
  levelsSolved: [],
  level: null,
  board: null,
  playerPosition: null,
  route: [],
  solved: false,
});

const gameState = (state = initialState, action) => {
  switch (action.type) {
    case actions.playerMove:
      const validMove = isMoveValid(state.get('board'), state.get('playerPosition'), action.direction);
      if (validMove) {
        const updatedBoard = updateBoard(state.get('board'), action.direction, validMove.shouldPush);
        const levelSolved = isSolved(updatedBoard);
        return state
          .withMutations(state =>
            state
              .set('board', updatedBoard)
              .set('playerPos', updatePosition(state.get('playerPosition')))
              .set('route', state.get('route').push(action.direction))
              .set('solved', levelSolved)
              .set('levelsSolved', state.get('levelsSolved').push(state.get('level')))
          );
      }
      return state;
    case actions.playerMoveUndo:
      return state;
    case actions.levelLoad:
      return state;
    case actions.levelReset:
      return state;
    default:
      return state;
  }
};

export default gameState;
