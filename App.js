import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Immutable from 'immutable';

import BoardView from './components/BoardView';

import { updateBoard, isSolved } from './utils/gameBoard';

const boardExample = Immutable.fromJS([
  [3,3,3,3,3,3,0],
  [3,1,0,0,0,3,3],
  [3,0,2,2,0,0,3],
  [3,0,3,0,0,0,3],
  [3,0,0,0,0,0,3],
  [3,3,3,3,3,3,3],
]);

const solutionExample = Immutable.fromJS([
  {
    row: 3,
    col: 3,
  },
  {
    row: 3,
    col: 5,
  },
]);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: boardExample,
      solved: false,
    };

    this.updateLocation = this.updateLocation.bind(this);
  }

  updateLocation(direction) {
    console.log(direction);
    const newBoard = updateBoard(this.state.board, direction);
    const solved = isSolved(newBoard, solutionExample);
    console.log(solved);
    this.setState({
      board: newBoard,
      solved,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.gameBoard}>
          <Text>{this.state.solved ? 'WELL DONE!' : 'Do the thing'}</Text>
          <BoardView board={this.state.board} solution={solutionExample}/>
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
