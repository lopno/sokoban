'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image } from 'react-native';
import dimensions from 'Dimensions';

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
const { width, height } = dimensions.get('window');

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
            {tile !== boardElements.floor
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
    </View>;
  }
}

BoardView.propTypes = {
  board: PropTypes.any.isRequired,
  playerDirection: PropTypes.string
};

BoardView.defaultProps = {
  playerDirection: directions.down,
};

module.exports = BoardView;