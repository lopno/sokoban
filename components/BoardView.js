'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image } from 'react-native';
import dimensions from 'Dimensions';

const boxImage = require('../assets/img/box.png');
const boxOnGoalImage = require('../assets/img/boxOnGoal.png');
const floorImage = require('../assets/img/floor.png');
const goalImage = require('../assets/img/goal.png');
const playerImage = require('../assets/img/player.png');
const wallImage = require('../assets/img/wall.png');

import boardElements from '../constants/boardElements';
const { width, height } = dimensions.get('window');

const styles = StyleSheet.create({
  tile: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function getTileImagePath(boardElement) {
  switch (boardElement) {
    case boardElements.wall: return wallImage;
    case boardElements.player: return playerImage;
    case boardElements.playerOnGoal: return playerImage;
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
          return <Image
            key={key}
            style={[
              styles.tile,
              position
            ]}
            source={getTileImagePath(tile)}
          />;
        })
      )}
    </View>;
  }
}

BoardView.props = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  board: PropTypes.any.isRequired, // TODO: describe immutable structure
};

module.exports = BoardView;