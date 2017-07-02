import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import BoardView from './BoardView';
import Controls from './Controls';
import LevelSolvedModal from './LevelSolvedModal';
import directions from '../../constants/directions';
import { movePlayer, undoMove } from '../../actions/playerActions';
import { loadLevel } from '../../actions/levelActions';
import colors from '../../constants/colors';


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 5,
  },
  headerItem: {
    flex:1,
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    // alignContent: 'center',
  },
  gameBoard: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  controls: {
    flex: 3,
    width: '100%',
    height: '100%',
  },
  controlsContainer: {
    width: '100%',
    height: '100%',
  }
});

class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      playerDirection: directions.down,
    };
    this.closeModal = this.closeModal.bind(this);
    this.loadNextLevel = this.loadNextLevel.bind(this);
    this.movePlayerDirection = this.movePlayerDirection.bind(this);
    this.onBackPressed = this.onBackPressed.bind(this);
    this.onUndoPressed = this.onUndoPressed.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.gameState.get('solved') === false
      && nextProps.gameState.get('solved') === true) {
      this.setState({
        showModal: true,
      });
    }
  }

  closeModal() {
    this.setState({
      showModal: false,
    });
  }

  loadNextLevel() {
    this.props.loadLevel((parseInt(this.props.gameState.get('level'), 10) || 0) + 1);
    this.closeModal();
  }

  movePlayerDirection(direction) {
    this.setState({
      playerDirection: direction,
    });
    this.props.movePlayer(direction);
  }

  onBackPressed() {
    this.props.navigation.goBack();
  }

  onUndoPressed() {
    this.props.undoMove();
  }

  render() {
    return <View style={styles.container}>
      <View style={styles.modal}>
        <LevelSolvedModal
          visible={this.state.showModal}
          onNextLevelPressed={this.loadNextLevel}
          onRequestClose={this.closeModal}
        />
      </View>
      <View style={styles.header}>
        <TouchableHighlight onPress={this.onBackPressed} style={styles.headerItem}>
          <Icon name='md-arrow-back' size={40} color='white'/>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.onUndoPressed} style={styles.headerItem}>
          <Icon name='md-undo' size={40} color='white'/>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => this.props.loadLevel(this.props.gameState.get('level'))}
          style={styles.headerItem}
        >
          <Icon name='md-refresh' size={40} color='white'/>
        </TouchableHighlight>
      </View>
      <View style={styles.gameBoard}>
        <BoardView
          board={this.props.gameState.get('board')}
          playerDirection={this.state.playerDirection}
        />
      </View>
      <View style={styles.controls}>
        <View style={styles.controlsContainer}>
          <Controls
            onPressUp={() => this.movePlayerDirection(directions.up)}
            onPressDown={() => this.movePlayerDirection(directions.down)}
            onPressLeft={() => this.movePlayerDirection(directions.left)}
            onPressRight={() => this.movePlayerDirection(directions.right)}
          />
        </View>
      </View>
    </View>
  }
}

GameScreen.navigationOptions = {
  header: null,
};

// TODO: on hardware back navigation

export default connect(state => ({
    gameState: state.gameState,
  }), dispatch => ({
    movePlayer: (direction) => dispatch(movePlayer(direction)),
    loadLevel: (level) => dispatch(loadLevel(level)),
    undoMove: () => dispatch(undoMove()),
  })
)(GameScreen);
