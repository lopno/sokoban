import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight, Text } from 'react-native';

const WorldItem = ({
   header,
   description,
   onPress,
 }) => (
  <TouchableHighlight
    onPress={onPress}
  >
    <View>
      <Text>{header}</Text>
      <Text>{description}</Text>
    </View>
  </TouchableHighlight>
);

WorldItem.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default WorldItem;
