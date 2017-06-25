import React from 'react';
import { View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import GameScreen from './components/GameScreen';


class App extends React.Component {
  render() {
    return (
      <View>
        <Button onPress={() => this.props.navigation.navigate('GameScreen', { level: '1'})} title="1"/>
        <Button onPress={() => this.props.navigation.navigate('GameScreen', { level: '2'})} title="2"/>
      </View>
    );
  }
}

export default StackNavigator({
  Home: { screen: App },
  GameScreen: { screen: GameScreen }
});
