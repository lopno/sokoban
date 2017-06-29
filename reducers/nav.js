import { AppNavigator } from '../navigators/AppNavigator';
import { NavigationActions } from 'react-navigation';
// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('LevelsScreen');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const initialNavState = AppNavigator.router.getStateForAction(
  tempNavState
);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    /*
     case 'Login':
     nextState = AppNavigator.router.getStateForAction(
     NavigationActions.back(),
     state
     );
     break;
     case 'Logout':
     nextState = AppNavigator.router.getStateForAction(
     NavigationActions.navigate({ routeName: 'Login' }),
     state
     );
     break;
     */
    default:
      console.log('state', state, 'action', action);
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

export default nav;
