import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import BoardView from './BoardView';
import { movePlayer } from '../actions/playerActions';
import { loadLevel } from '../actions/levelActions';
import directions from '../constants/directions';

// TODO: use all the state and actions and stuff in this component
// TODO: also remember to handle the load level stuff here boiiii

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

class GameScreen extends React.Component {
  render() {
    console.log('this.props', this.props);
    return <View style={styles.container}>
      <View style={styles.gameBoard}>
        <Button
          onPress={() => this.props.loadLevel(this.props.gameState.get('level'))}
          title="Reset"
          color="red"
        />
        <Text>{`Level ${this.props.gameState.get('level')}`}</Text>
        <Text>{this.props.gameState.get('solved') ? 'WELL DONE!' : 'Do the thing'}</Text>
        <BoardView board={this.props.gameState.get('board')}/>
      </View>
      <View style={styles.controls}>
        <Text>Controller thing</Text>
        <Button onPress={() => this.props.movePlayer(directions.up)} title="Up" color="red"/>
        <View style={{flexDirection: 'row'}}>
          <Button onPress={() => this.props.movePlayer(directions.left)} title="Left" color="red"/>
          <View/>
          <Button onPress={() => this.props.movePlayer(directions.right)} title="Right" color="red"/>
        </View>
        <Button onPress={() => this.props.movePlayer(directions.down)} title="Down" color="red"/>
      </View>
    </View>
  }
}

// TODO: back navigation

export default connect(state => ({
    gameState: state.gameState,
  }), dispatch => ({
    movePlayer: (direction) => dispatch(movePlayer(direction)),
    loadLevel: (level) => dispatch(loadLevel(level))
  })
)(GameScreen);
