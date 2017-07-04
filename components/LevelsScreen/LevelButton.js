import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, Image, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import fontFamilies from '../../constants/fontFamilies';
import fontSizes from '../../constants/fontSizes';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    left:0,
    right:0,
    bottom:0,
  },
  topOverlay: {
    flex: 5
  },
  bottomOverlay: {
    flex: 4
  },
  text: {
    fontFamily: fontFamilies.normal,
    fontSize: fontSizes.medium,
    fontWeight: '900',
    color: 'white'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const LevelButton = ({onPress, level, isSolved}) =>
  (<TouchableHighlight onPress={onPress}>
    <View>
      {isSolved
      ? <Image source={require('../../assets/img/box.png')}/>
      : <Image source={require('../../assets/img/boxOnGoal.png')}/>}
      <View style={styles.overlay}>
        <View style={[styles.topOverlay, styles.center]}>
          {isSolved
            ? <Icon name='md-star' color="gold" size={35}/>
            : <Icon name='md-star-outline' color={colors.darkGray} size={35}/>}
        </View>
        <View style={[styles.bottomOverlay, styles.center]}>
          <Text style={styles.text}>
            {level}
          </Text>
        </View>
      </View>
    </View>
  </TouchableHighlight>);

LevelButton.propTypes = {
  onPress: PropTypes.func,
  level: PropTypes.string,
  isSolved: PropTypes.bool,
};

LevelButton.defaultProps = {
  onPress: () => {},
  level: '',
  isSolved: false,
};

export default LevelButton;