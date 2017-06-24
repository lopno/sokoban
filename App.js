import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Immutable from 'immutable';

import BoardView from './components/BoardView';

import { updateBoard } from './utils/gameBoard';

const layoutExample = Immutable.fromJS([
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,1,0,0,0],
  [0,0,0,0,0,0,0,0],
]);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: layoutExample,
    };

    this.updateLocation = this.updateLocation.bind(this);
  }

  updateLocation(direction) {
    console.log(direction);
    this.setState({
      layout: updateBoard(this.state.layout, direction),
    })
  }

  render() {
    console.log(JSON.stringify(this.state));
    return (
      <View style={styles.container}>
        <View style={styles.gameBoard}>
          <Text>Game board</Text>
          <Text>Hey Nuref!</Text>
          <BoardView width={8} height={3} layout={this.state.layout}/>
        </View>
        <View style={styles.controls}>
          <Text>Controller thing</Text>
          <Button onPress={() => this.updateLocation('up')} title="Up" color="red"/>
          <View style={{flexDirection: 'row'}}>
            <Button onPress={() => this.updateLocation('left')} title="Left" color="red"/>
            <View/>
            <Button onPress={() => this.updateLocation('right')} title="Right" color="red"/>
          </View>
          <Button onPress={() => this.updateLocation('down')} title="Down" color="red"/>

        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameBoard: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  controls: {
    flex: 1
  },
});
