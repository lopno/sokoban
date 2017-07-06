import React from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist'

import AppReducer from './reducers';
import AppWithNavigationState from './navigators/AppNavigator';

const store = createStore(
  AppReducer,
  undefined,
  compose(
    autoRehydrate()
  )
);

persistStore(
  store,
  {
    storage: AsyncStorage,
    whitelist: ['gameState'],
  },
  () => {
    console.log('PERSISTED');
  }
);

class SokobanApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default SokobanApp;
