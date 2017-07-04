import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Animated,
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const boxImage = require('../../assets/img/box.png');
const boxOnGoalImage = require('../../assets/img/boxOnGoal.png');
const floorImage = require('../../assets/img/floor.png');
const goalImage = require('../../assets/img/goal.png');
const playerDownImage = require('../../assets/img/playerDown.png');
const playerUpImage = require('../../assets/img/playerUp.png');
const playerLeftImage = require('../../assets/img/playerLeft.png');
const playerRightImage = require('../../assets/img/playerRight.png');
const wallImage = require('../../assets/img/wall.png');

import boardElements from '../../constants/boardElements';
import directions from '../../constants/directions';
const { width, height } = Dimensions.get('window');

const controllerSize = 80;

const styles = StyleSheet.create({
  tile: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moveButton: {
    position: 'absolute',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  upMoveButton: {
    top: 0,
    width: controllerSize,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  downMoveButton: {
    width: controllerSize,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  leftMoveButton: {
    left: 0,
    height: controllerSize,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rightMoveButton: {
    height: controllerSize,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  }
});

/*
 Animated.timing( this.state.xPosition, { toValue: 100, easing: Easing.back, duration: 2000, } ).start();
 */

function getTileImagePath(boardElement, direction = null) {
  switch (boardElement) {
    case boardElements.wall: return wallImage;
    case boardElements.playerOnGoal:
    case boardElements.player: switch (direction) {
      case directions.up: return playerUpImage;
      case directions.left: return playerLeftImage;
      case directions.right: return playerRightImage;
      case directions.down:
      default:
        return playerDownImage;
    }
    case boardElements.box: return boxImage;
    case boardElements.boxOnGoal: return boxOnGoalImage;
    case boardElements.goal: return goalImage;
    default: return floorImage;
  }
}

export default class BoardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moveButtonOpacity: new Animated.Value(0),
    };
    this.onBoardPressed = this.onBoardPressed.bind(this);
  }

  onBoardPressed() {
    Animated.sequence([
      Animated.timing(
        this.state.moveButtonOpacity,
        {
          toValue: 0.2,
          duration: 400,
        }
      ),
      Animated.timing(
        this.state.moveButtonOpacity,
        {
          toValue: 0,
          duration: 600,
        }
      )
    ]).start();
  }

  render() {
    const CELL_SIZE = Math.floor(width / this.props.board.get(0).size); // shouldn't be calculated every render
    return <TouchableWithoutFeedback
      onPress={this.onBoardPressed}
    >
      <View
        style={{
          width,
          height: CELL_SIZE * this.props.board.size, // needs to be 100% bc of the controller. we can have some other shit that is smaller
        }}
      >
        {this.props.board.map((row, rowIndex) =>
          row.map((tile, colIndex) => {
            const key = `${rowIndex}${colIndex}`;
            const position = { // replace this absolute stuff with flex-box
              left: colIndex * CELL_SIZE,
              top: rowIndex * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
            };

            return <View>
              {tile !== boardElements.floor && tile !== boardElements.wall
                ? <Image
                  key={`${key}floor`}
                  style={[
                    styles.tile,
                    position
                  ]}
                  source={getTileImagePath(floorImage)}
                />
                : null}
              <Image
                key={key}
                style={[
                  styles.tile,
                  position
                ]}
                source={getTileImagePath(tile, this.props.playerDirection)}
              />
            </View>;
          })
        )}
        <TouchableWithoutFeedback
          onPress={this.props.onPressRight}
        >
          <Animated.View
            style={[
              styles.moveButton,
              styles.rightMoveButton,
              {
                opacity: this.state.moveButtonOpacity,
                left: this.props.playerPos.get('col') * CELL_SIZE + CELL_SIZE,
                top: this.props.playerPos.get('row') * CELL_SIZE - ((controllerSize - CELL_SIZE) / 2),
                width: (this.props.board.get(0).size - this.props.playerPos.get('col')) * CELL_SIZE,
              }
            ]}
          >
            <Icon
              name="ios-arrow-dropright"
              color='white'
              size={60}/>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={this.props.onPressLeft}
        >
          <Animated.View
            style={[
              styles.moveButton,
              styles.leftMoveButton,
              {
                opacity: this.state.moveButtonOpacity,
                top: this.props.playerPos.get('row') * CELL_SIZE - ((controllerSize - CELL_SIZE) / 2),
                width: CELL_SIZE * this.props.playerPos.get('col'),
              }]
            }
          >
          <Icon
            name="ios-arrow-dropleft"
            color='white'
            size={60}/>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={this.props.onPressDown}
        >
          <Animated.View
            style={[
              styles.moveButton,
              styles.downMoveButton,
              {
                opacity: this.state.moveButtonOpacity,
                left: this.props.playerPos.get('col') * CELL_SIZE - ((controllerSize - CELL_SIZE) / 2),
                top: this.props.playerPos.get('row') * CELL_SIZE + CELL_SIZE,
                height: (this.props.board.size - this.props.playerPos.get('row')) * CELL_SIZE - CELL_SIZE,
              }
            ]}
          >
            <Icon
              name="ios-arrow-dropdown"
              color='white'
              size={60}/>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={this.props.onPressUp}
        >
          <Animated.View
            style={[
              styles.moveButton,
              styles.upMoveButton,
              {
                opacity: this.state.moveButtonOpacity,
                left: this.props.playerPos.get('col') * CELL_SIZE - ((controllerSize - CELL_SIZE) / 2),
                height: (this.props.playerPos.get('row')) * CELL_SIZE,
              }
            ]}
          >
            <Icon
              style={{
                opacity: this.state.moveButtonOpacity * 3,
              }}
              name="ios-arrow-dropup"
              color='white'
              size={60}/>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>;
  }
}

BoardView.propTypes = {
  board: PropTypes.any.isRequired,
  playerPos: PropTypes.any.isRequired,
  playerDirection: PropTypes.string,
  onPressUp: PropTypes.func,
  onPressDown: PropTypes.func,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
};

BoardView.defaultProps = {
  playerDirection: directions.down,
  onPressUp: () => {},
  onPressDown: () => {},
  onPressLeft: () => {},
  onPressRight: () => {},
};

module.exports = BoardView;