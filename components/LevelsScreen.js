import React from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { loadLevel } from '../actions/levelActions';

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
          <Button style={styles.button} onPress={() => this.onLevelPressed(1)} title="1"/>
          <Button style={styles.button} onPress={() => this.onLevelPressed(2)} title="2"/>
          <Button style={styles.button} onPress={() => this.onLevelPressed(3)} title="3"/>
          <Button style={styles.button} onPress={() => this.onLevelPressed(4)} title="4"/>
          <Button style={styles.button} onPress={() => this.onLevelPressed(5)} title="5"/>
        </View>
        <View style={styles.row}>
          <Button style={styles.button} onPress={() => this.onLevelPressed(1)} title="1"/>
          <Button style={styles.button} onPress={() => this.onLevelPressed(2)} title="2"/>
          <Button style={styles.button} onPress={() => this.onLevelPressed(3)} title="3"/>
          <Button style={styles.button} onPress={() => this.onLevelPressed(4)} title="4"/>
          <Button style={styles.button} onPress={() => this.onLevelPressed(5)} title="5"/>
        </View>
        <View style={styles.row}>
          <Button style={styles.button} onPress={() => this.onLevelPressed(1)} title="1"/>
          <Button style={styles.button} onPress={() => this.onLevelPressed(2)} title="2"/>
          <Button style={styles.button} onPress={() => this.onLevelPressed(3)} title="3"/>
          <Button style={styles.button} onPress={() => this.onLevelPressed(4)} title="4"/>
          <Button style={styles.button} onPress={() => this.onLevelPressed(5)} title="5"/>
        </View>
        <View style={styles.row}>
          <Button style={styles.button} onPress={() => this.onLevelPressed(1)} title="1"/>
          <Button style={styles.button} onPress={() => this.onLevelPressed(2)} title="2"/>
          <Button style={styles.button} onPress={() => this.onLevelPressed(3)} title="3"/>
          <Button style={styles.button} onPress={() => this.onLevelPressed(4)} title="4"/>
          <Button style={styles.button} onPress={() => this.onLevelPressed(5)} title="5"/>
        </View>
        <View style={styles.row}>
          <Button style={styles.button} onPress={() => this.onLevelPressed(1)} title="1"/>
          <Button style={styles.button} onPress={() => this.onLevelPressed(2)} title="2"/>
          <Button style={styles.button} onPress={() => this.onLevelPressed(3)} title="3"/>
          <Button style={styles.button} onPress={() => this.onLevelPressed(4)} title="4"/>
          <Button style={styles.button} onPress={() => this.onLevelPressed(5)} title="5"/>
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
