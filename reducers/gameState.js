import Immutable from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';
import actions from '../constants/actions';
import levels from '../constants/levels';
import {
  isMoveValid,
  updateBoard,
  undoMove,
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
  console.log('action', action.type);
  switch (action.type) {
    case REHYDRATE:
      const incoming = Immutable.fromJS(action.payload.gameState);
      return incoming
        ? incoming
        : state;
    case actions.playerMove:
      const validMove = isMoveValid(state.get('board'), state.get('playerPos'), action.direction);
      if (validMove && !state.get('solved')) {
        const updatedBoard = updateBoard(
          state.get('board'),
          state.get('playerPos'),
          validMove.nextTile,
          action.direction,
          validMove.shouldPush);
        const levelSolved = isSolved(updatedBoard);
        const newState = state
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
        return newState;
      }
      return state;
    case actions.playerMoveUndo:
      const latestMove = state.get('route').last();
      return latestMove
        ? state.withMutations(state =>
          state
            .set('board', undoMove(state.get('board'), state.get('playerPos'), latestMove))
            .set('playerPos', updatePlayerPos(state.get('playerPos'), latestMove, -1))
            .set('route', state.get('route').pop())
        )
        : state;
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
