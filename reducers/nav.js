import { AppNavigator } from '../navigators/AppNavigator';
import { NavigationActions } from 'react-navigation';

const firstAction = AppNavigator.router.getActionForPathAndParams('MainScreen');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const initialNavState = AppNavigator.router.getStateForAction(
  tempNavState
);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case NavigationActions.BACK:
      nextState = {
        index: state.index > 0 ? state.index - 1 : 0,
        routes: state.routes.length > 1 ? state.routes.slice(0, -1) : state.routes,
      };
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
}

export default nav;
