'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import dimensions from 'Dimensions';

import boardElements from '../constants/boardElements';
const { width, height } = dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  tile: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: 'red'
  }
});

function getCellColor(cellValue) {
  switch (cellValue) {
    case boardElements.floor: return '#BEE1D2';
    case boardElements.player: return 'red';
    case boardElements.playerOnGoal: return 'red';
    case boardElements.box: return 'blue';
    case boardElements.goal: return 'green';
    case boardElements.boxOnGoal: return 'yellow';
    case boardElements.wall: return 'black';
    default: return '#BEE1D2';
  }
}

export default class BoardView extends React.Component {
  render() {
    const CELL_SIZE = Math.floor(width / this.props.board.get(0).size);
    const CELL_PADDING = Math.floor(CELL_SIZE * .05); // 5% of the cell size
    const BORDER_RADIUS = CELL_PADDING * 2;
    const TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;

    return <View
      style={[
        styles.container,
        {
          width,
          height: CELL_SIZE * this.props.board.size,
        }
      ]}
    >
      {this.props.board.map((row, rowIndex) =>
        row.map((tile, colIndex) => {
          const key = `${rowIndex}${colIndex}`;
          const position = {
            left: colIndex * CELL_SIZE + CELL_PADDING,
            top: rowIndex * CELL_SIZE + CELL_PADDING,
            width: TILE_SIZE,
            height: TILE_SIZE,
            borderRadius: BORDER_RADIUS,
          };
          return <View
            key={key}
            style={[
              styles.tile,
              position,
              {
                backgroundColor: getCellColor(this.props.board.getIn([rowIndex, colIndex])),
              },
            ]}
          >
            <Text>
              {tile}
            </Text>
          </View>;
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