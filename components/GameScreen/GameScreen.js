import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import BoardView from './BoardView';
import Header from './Header';
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
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
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
      playerDirection: directions.down, // TODO: use latest from route
    };
    this.closeModal = this.closeModal.bind(this);
    this.loadNextLevel = this.loadNextLevel.bind(this);
    this.movePlayerDirection = this.movePlayerDirection.bind(this);
    this.onBackPressed = this.onBackPressed.bind(this);
    this.onUndoPressed = this.onUndoPressed.bind(this);
    this.onResetPressed = this.onResetPressed.bind(this);
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

  onResetPressed() {
    this.props.loadLevel(this.props.gameState.get('level'));
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
      <Header
        onBackPressed={this.onBackPressed}
        onUndoPressed={this.onUndoPressed}
        onResetPressed={this.onResetPressed}
      />
      <View style={styles.gameBoard}>
        <BoardView
          board={this.props.gameState.get('board')}
          playerPos={this.props.gameState.get('playerPos')}
          playerDirection={this.state.playerDirection}
          onPressUp={() => this.movePlayerDirection(directions.up)}
          onPressDown={() => this.movePlayerDirection(directions.down)}
          onPressLeft={() => this.movePlayerDirection(directions.left)}
          onPressRight={() => this.movePlayerDirection(directions.right)}
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
