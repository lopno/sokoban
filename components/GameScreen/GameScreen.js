import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import BoardView from './BoardView';
import Controls from './Controls';
import LevelSolvedModal from './LevelSolvedModal';
import directions from '../../constants/directions';
import { movePlayer } from '../../actions/playerActions';
import { loadLevel } from '../../actions/levelActions';


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#758C8E',
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
    };
    this.closeModal = this.closeModal.bind(this);
    this.loadNextLevel = this.loadNextLevel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gameState.get('solved') === true) {
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
    this.props.loadLevel(this.props.gameState.get('level') + 1);
    this.closeModal();
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
        <TouchableHighlight onPress={() => {}} style={styles.headerItem}>
          <Icon name='md-arrow-back' size={40} color='white'/>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {}} style={styles.headerItem}>
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
        <BoardView board={this.props.gameState.get('board')}/>
      </View>
      <View style={styles.controls}>
        <View style={styles.controlsContainer}>
          <Controls
            onPressUp={() => this.props.movePlayer(directions.up)}
            onPressDown={() => this.props.movePlayer(directions.down)}
            onPressLeft={() => this.props.movePlayer(directions.left)}
            onPressRight={() => this.props.movePlayer(directions.right)}
          />
        </View>
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
