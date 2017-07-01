import React from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

import LevelButton from './LevelButton';

import { loadLevel } from '../../actions/levelActions';

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
    justifyContent: 'center',
    alignItems: 'center',
  }
};

class LevelsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onLevelPressed = this.onLevelPressed.bind(this);
  }

  onLevelPressed(level) {
    this.props.loadLevel(level);
    this.props.navigation.navigate('GameScreen');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(1)} level="1" isSolved={true}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(2)} level="2" isSolved={false}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(3)} level="3" isSolved={false}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(4)} level="4" isSolved={false}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(5)} level="5" isSolved={false}/>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(6)} level="6" isSolved={true}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(7)} level="7" isSolved={false}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(8)} level="8" isSolved={false}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(9)} level="9" isSolved={false}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(10)} level="10" isSolved={false}/>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(11)} level="11" isSolved={true}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(12)} level="12" isSolved={false}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(13)} level="13" isSolved={false}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(14)} level="14" isSolved={false}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(15)} level="15" isSolved={false}/>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(16)} level="16" isSolved={true}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(17)} level="17" isSolved={false}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(18)} level="18" isSolved={false}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(19)} level="19" isSolved={false}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(20)} level="20" isSolved={false}/>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(21)} level="21" isSolved={true}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(22)} level="22" isSolved={false}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(23)} level="23" isSolved={false}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(24)} level="24" isSolved={false}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed(25)} level="25" isSolved={false}/>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(state => ({
    gameState: state.gameState,
  }), dispatch => ({
    loadLevel: (level) => dispatch(loadLevel(level))
  })
)(LevelsScreen);
