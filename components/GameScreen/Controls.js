import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const width = '70.71%';
const height = '141.42%';
const xMargin = '20.71%';
const yMargin = '10.36%';
// 141.42

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 2,
    overflow: 'hidden',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    width,
    height,
    transform: [{ rotate: '45deg'}],
    alignItems: 'center',
    justifyContent: 'center',
  },
  topButton: {
    bottom: '35%',
    left: '24%',
  },
  leftButton: {
    bottom: '35%',
    right: '76%',
  },
  downButton: {
    top: '15%',
    right: '118%',
  },
  rightButton: {
    top: '15%',
    right: '19%',
  },
  icon: {
    transform: [{ rotate: '315deg'}],
  }
});

const Controls = ({ onPressUp, onPressDown, onPressLeft, onPressRight }) => (
  <View style={styles.container}>
    <View style={styles.left}>

    </View>
    <View style={styles.right}>
      <View style={styles.innerContainer}>
        <TouchableHighlight onPress={onPressUp} style={[styles.button, styles.topButton]}>
          <Icon style={[styles.icon, { top: '25%', left: '25%' }]} name="ios-arrow-dropup" color='white' size={60}/>
        </TouchableHighlight>
        <TouchableHighlight onPress={onPressRight} style={[styles.button, styles.rightButton]}>
          <Icon style={[styles.icon, { top: '25%', right: '25%' }]} name="ios-arrow-dropright" color='white' size={60}/>
        </TouchableHighlight>
      </View>
      <View style={styles.innerContainer}>
        <TouchableHighlight onPress={onPressLeft} style={[styles.button, styles.leftButton]}>
          <Icon style={[styles.icon, { bottom: '25%', left: '25%' }]} name="ios-arrow-dropleft" color='white' size={60}/>
        </TouchableHighlight>
        <TouchableHighlight onPress={onPressDown} style={[styles.button, styles.downButton]}>
          <Icon style={[styles.icon, { bottom: '25%', right: '25%' }]} name="ios-arrow-dropdown" color='white' size={60}/>
        </TouchableHighlight>
      </View>
    </View>
    <View style={styles.left}>

    </View>
  </View>
);

Controls.propTypes = {
  onPressUp: PropTypes.func,
  onPressDown: PropTypes.func,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
};

Controls.defaultProps = {
  onPressUp: () => {},
  onPressDown: () => {},
  onPressLeft: () => {},
  onPressRight: () => {},
};

export default Controls;