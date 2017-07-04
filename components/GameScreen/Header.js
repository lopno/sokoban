import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  header: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: colors.darkBox1,
    borderTopWidth: 4,
    borderBottomWidth: 5,
    borderBottomColor: colors.lightBox3,
    borderTopColor: colors.lightBox3,
  },
  headerItem: {
    flex:1,
    height: '100%',
    flexDirection: 'column',
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderColor: colors.lightBox1,
  },
  headerItemContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 10,
  },
});

const Header = ({onBackPressed, onUndoPressed, onResetPressed}) =>
  (<View style={styles.header}>
    <TouchableHighlight onPress={onBackPressed} style={styles.headerItem}>
      <View style={styles.headerItemContent}>
        <Icon name='md-arrow-back' size={40} color='white'/>
        <Text style={styles.headerText}>
          BACK
        </Text>
      </View>
    </TouchableHighlight>
    <TouchableHighlight onPress={onUndoPressed} style={styles.headerItem}>
      <View style={styles.headerItemContent}>
        <Icon name='md-undo' size={40} color='white'/>
        <Text style={styles.headerText}>
          UNDO MOVE
        </Text>
      </View>
    </TouchableHighlight>
    <TouchableHighlight
      onPress={onResetPressed}
      style={styles.headerItem}
    >
      <View style={styles.headerItemContent}>
        <Icon name='md-refresh' size={40} color='white'/>
        <Text style={styles.headerText}>
          RESET LEVEL
        </Text>
      </View>
    </TouchableHighlight>
  </View>);

export default Header;
