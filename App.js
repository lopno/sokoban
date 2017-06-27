import React from 'react';
import { View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import gameState from './reducers/gameState'
import GameScreen from './components/GameScreen';

let store = createStore(gameState);

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    // flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  row: {
    flex: 1,
    marginTop: 10,
    // flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'red',
    color: 'red',
    //flexBasis: '15%',
    // width: 200,
    // height: 200,
    // width: width * 0.2
  }
};

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '1'})} title="1"/>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '2'})} title="2"/>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '3'})} title="3"/>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '4'})} title="4"/>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '5'})} title="5"/>
          </View>
          <View style={styles.row}>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '1'})} title="1"/>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '2'})} title="2"/>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '3'})} title="3"/>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '4'})} title="4"/>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '5'})} title="5"/>
          </View>
          <View style={styles.row}>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '1'})} title="1"/>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '2'})} title="2"/>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '3'})} title="3"/>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '4'})} title="4"/>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '5'})} title="5"/>
          </View>
          <View style={styles.row}>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '1'})} title="1"/>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '2'})} title="2"/>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '3'})} title="3"/>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '4'})} title="4"/>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '5'})} title="5"/>
          </View>
          <View style={styles.row}>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '1'})} title="1"/>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '2'})} title="2"/>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '3'})} title="3"/>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '4'})} title="4"/>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate('GameScreen', { level: '5'})} title="5"/>
          </View>
        </View>
      </Provider>
    );
  }
}

export default StackNavigator({
  Home: { screen: App },
  GameScreen: { screen: GameScreen }
});
