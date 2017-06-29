import actions from '../constants/actions';

export function loadLevel(level) {
  return {
    type: actions.levelLoad,
    level,
  };
}
