import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import MainScreen from '../components/MainScreen/MainScreen';
import GameScreen from '../components/GameScreen/GameScreen';
import LevelsScreen from '../components/LevelsScreen/LevelsScreen';
import WorldsScreen from '../components/WorldsScreen/WorldsScreen';

export const AppNavigator = StackNavigator(
  {
    MainScreen: { screen: MainScreen },
    WorldsScreen: { screen: WorldsScreen },
    LevelsScreen: { screen: LevelsScreen },
    GameScreen: { screen: GameScreen },
  });

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
