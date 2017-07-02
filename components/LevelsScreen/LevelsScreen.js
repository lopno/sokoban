import React from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

import LevelButton from './LevelButton';

import { loadLevel } from '../../actions/levelActions';
import colors from'../../constants/colors';

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: colors.lightGray,

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
            <LevelButton
              onPress={() => this.onLevelPressed('1')}
              level="1"
              isSolved={this.props.gameState.getIn(['levelsSolved', '1'])}
            />
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('2')} level="2" isSolved={!!this.props.gameState.getIn(['levelsSolved', '2'])}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('3')} level="3" isSolved={!!this.props.gameState.getIn(['levelsSolved', '3'])}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('4')} level="4" isSolved={!!this.props.gameState.getIn(['levelsSolved', '4'])}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('5')} level="5" isSolved={!!this.props.gameState.getIn(['levelsSolved', '5'])}/>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('6')} level="6" isSolved={!!this.props.gameState.getIn(['levelsSolved', '6'])}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('7')} level="7" isSolved={!!this.props.gameState.getIn(['levelsSolved', '7'])}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('8')} level="8" isSolved={!!this.props.gameState.getIn(['levelsSolved', '8'])}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('9')} level="9" isSolved={!!this.props.gameState.getIn(['levelsSolved', '9'])}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('10')} level="10" isSolved={!!this.props.gameState.getIn(['levelsSolved', '10'])}/>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('11')} level="11" isSolved={!!this.props.gameState.getIn(['levelsSolved', '11'])}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('12')} level="12" isSolved={!!this.props.gameState.getIn(['levelsSolved', '12'])}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('13')} level="13" isSolved={!!this.props.gameState.getIn(['levelsSolved', '13'])}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('14')} level="14" isSolved={!!this.props.gameState.getIn(['levelsSolved', '14'])}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('15')} level="15" isSolved={!!this.props.gameState.getIn(['levelsSolved', '15'])}/>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('16')} level="16" isSolved={!!this.props.gameState.getIn(['levelsSolved', '16'])}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('17')} level="17" isSolved={!!this.props.gameState.getIn(['levelsSolved', '17'])}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('18')} level="18" isSolved={!!this.props.gameState.getIn(['levelsSolved', '18'])}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('19')} level="19" isSolved={!!this.props.gameState.getIn(['levelsSolved', '19'])}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('20')} level="20" isSolved={!!this.props.gameState.getIn(['levelsSolved', '20'])}/>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('21')} level="21" isSolved={!!this.props.gameState.getIn(['levelsSolved', '21'])}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('22')} level="22" isSolved={!!this.props.gameState.getIn(['levelsSolved', '22'])}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('23')} level="23" isSolved={!!this.props.gameState.getIn(['levelsSolved', '23'])}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('24')} level="24" isSolved={!!this.props.gameState.getIn(['levelsSolved', '24'])}/>
          </View>
          <View style={styles.button}>
            <LevelButton onPress={() => this.onLevelPressed('25')} level="25" isSolved={!!this.props.gameState.getIn(['levelsSolved', '25'])}/>
          </View>
        </View>
      </View>
    );
  }
}


LevelsScreen.navigationOptions = {
  header: null,
};

export default connect(state => ({
    gameState: state.gameState,
  }), dispatch => ({
    loadLevel: (level) => dispatch(loadLevel(level))
  })
)(LevelsScreen);
