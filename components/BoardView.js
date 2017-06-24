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

export default class BoardView extends React.Component {
  render() {
    const CELL_SIZE = Math.floor(width / this.props.layout[0].length); // 20% of the screen width
    const CELL_PADDING = Math.floor(CELL_SIZE * .05); // 5% of the cell size
    const BORDER_RADIUS = CELL_PADDING * 2;
    const TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;
/*
    let result = [];
    for (let row = 0; row < this.props.height; row++) {
      for (let col = 0; col < this.props.width; col++) {
        const key = `${row}${col}`;
        const position = {
          left: col * CELL_SIZE + CELL_PADDING,
          top: row * CELL_SIZE + CELL_PADDING,
          width: TILE_SIZE,
          height: TILE_SIZE,
          borderRadius: BORDER_RADIUS,
        };
        result.push(
          <View
            key={key}
            style={[
              styles.tile,
              position,
              {
                backgroundColor: this.props.layout[row][col] ? 'red' : '#BEE1D2',
              },
            ]}
          />
        );
      }
    }
    */

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
          // console.log('rowIndex', rowIndex, 'colIndex', colIndex);
          return <View
            key={key}
            style={[
              styles.tile,
              position,
              {
                backgroundColor: this.props.layout[rowIndex][colIndex] ? 'red' : '#BEE1D2',
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
  layout: PropTypes.array.isRequired,
};

module.exports = BoardView;