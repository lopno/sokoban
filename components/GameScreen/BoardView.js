'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, TouchableHighlight, Dimensions } from 'react-native';

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
});

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
  render() {
    const CELL_SIZE = Math.floor(width / this.props.board.get(0).size);

    return <View
      style={{
          width,
          height: CELL_SIZE * this.props.board.size,
        }}
    >
      {this.props.board.map((row, rowIndex) =>
        row.map((tile, colIndex) => {
          const key = `${rowIndex}${colIndex}`;
          const position = {
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
      <TouchableHighlight
        style={{
          position: 'absolute',
          left: this.props.playerPos.get('col') * CELL_SIZE + CELL_SIZE,
          top: this.props.playerPos.get('row') * CELL_SIZE - ((controllerSize - CELL_SIZE) / 2),
          backgroundColor: 'black',
          opacity: 0.8,
          height: 80,
          width: (this.props.board.get(0).size - this.props.playerPos.get('col')) * CELL_SIZE
        }}
        onPress={this.props.onPressRight}
      >
        <View>
          <Text>
            {`Right ${this.props.playerPos.get('row')}, ${this.props.playerPos.get('col')}`}
          </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={{
          position: 'absolute',
          left: 0,
          top: this.props.playerPos.get('row') * CELL_SIZE - ((controllerSize - CELL_SIZE) / 2),
          width: CELL_SIZE * this.props.playerPos.get('col'),
          backgroundColor: 'black',
          opacity: 0.8,
          height: controllerSize,
        }}
        onPress={this.props.onPressLeft}
      >
        <View>
          <Text>
            {`Left ${this.props.playerPos.get('row')}, ${this.props.playerPos.get('col')}`}
          </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={{
          position: 'absolute',
          left: this.props.playerPos.get('col') * CELL_SIZE - ((controllerSize - CELL_SIZE) / 2),
          top: this.props.playerPos.get('row') * CELL_SIZE + CELL_SIZE,
          width: controllerSize,
          backgroundColor: 'black',
          opacity: 0.8,
          height: (this.props.board.size - this.props.playerPos.get('row')) * CELL_SIZE - CELL_SIZE,
        }}
        onPress={this.props.onPressDown}
      >
        <View>
          <Text>
            {`Down ${this.props.playerPos.get('row')}, ${this.props.playerPos.get('col')}`}
          </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={{
          position: 'absolute',
          left: this.props.playerPos.get('col') * CELL_SIZE - ((controllerSize - CELL_SIZE) / 2),
          top: 0,
          width: controllerSize,
          backgroundColor: 'black',
          opacity: 0.8,
          height: (this.props.playerPos.get('row')) * CELL_SIZE,
        }}
        onPress={this.props.onPressUp}
      >
        <View>
          <Text>
            {`Up ${this.props.playerPos.get('row')}, ${this.props.playerPos.get('col')}`}
          </Text>
        </View>
      </TouchableHighlight>
    </View>;
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