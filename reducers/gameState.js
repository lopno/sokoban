import Immutable from 'immutable';
import actions from '../constants/actions';
import levels from '../constants/levels';
import {
  isMoveValid,
  updateBoard,
  updatePlayerPos,
  isSolved,
  getPlayerPos
} from '../utils/gameBoard';

const initialState = Immutable.fromJS({
  levelsSolved: {},
  level: null,
  board: null,
  playerPos: null,
  route: [],
  solved: false,
});

const gameState = (state = initialState, action) => {
  switch (action.type) {
    case actions.playerMove:
      const validMove = isMoveValid(state.get('board'), state.get('playerPos'), action.direction);
      if (validMove) {
        const updatedBoard = updateBoard(
          state.get('board'),
          state.get('playerPos'),
          validMove.nextTile,
          action.direction,
          validMove.shouldPush);
        const levelSolved = isSolved(updatedBoard);
        return state
          .withMutations(state => {
            const tempState = state
              .set('board', updatedBoard)
              .set('playerPos', updatePlayerPos(state.get('playerPos'), action.direction))
              .set('route', state.get('route').push(action.direction))
              .set('solved', levelSolved);
              return levelSolved
                ? tempState.setIn(['levelsSolved', state.get('level')], true)
                : tempState;
          });
      }
      return state;
    case actions.playerMoveUndo:
      return state; // TODO
    case actions.levelLoad:
      const loadedBoard = levels.get(`${action.level}`);
      return state
        .withMutations(state =>
          state
            .set('level', action.level)
            .set('board', loadedBoard)
            .set('playerPos', getPlayerPos(loadedBoard))
            .set('solved', false)
            .set('route', new Immutable.List())
        );
    default:
      return state;
  }
};

export default gameState;
