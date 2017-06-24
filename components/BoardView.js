'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import dimensions from 'Dimensions';

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
    case 0: return '#BEE1D2';
    case 1: return 'red';
    case 2: return 'blue';
    default: return '#BEE1D2';
  }
}

export default class BoardView extends React.Component {
  render() {
    const CELL_SIZE = Math.floor(width / this.props.layout.get(0).size);
    const CELL_PADDING = Math.floor(CELL_SIZE * .05); // 5% of the cell size
    const BORDER_RADIUS = CELL_PADDING * 2;
    const TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;

    return <View
      style={[
        styles.container,
        {
          width,
          height: CELL_SIZE * this.props.height,
        }
      ]}
    >
      {this.props.layout.map((row, rowIndex) =>
        row.map((col, colIndex) => {
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
                backgroundColor: getCellColor(this.props.layout.getIn([rowIndex, colIndex])),
              },
            ]}
          />;
        })
      )}
    </View>;
  }
}

BoardView.props = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  layout: PropTypes.any.isRequired, // TODO: describe immutable structure
};

module.exports = BoardView;