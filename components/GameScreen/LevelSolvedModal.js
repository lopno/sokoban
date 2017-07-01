import React from 'react';
import PropTypes from 'prop-types'
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import fontSizes from '../../constants/fontSizes';
import fontFamilies from '../../constants/fontFamilies';
import styleConstants from '../../constants/style';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '80%',
    height: '40%',
    backgroundColor: '#AA733C',
  },
  header: {
    flex: 1,
  },
  headerText: {
    fontFamily: fontFamilies.normal,
    fontWeight: '900',
    color: 'white',
    fontSize: fontSizes.large,
  },
  buttonContainer: {
    flex: 2,
  },
  button: {
    width: '80%',
    height: '80%',
    backgroundColor: '#D9944E',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  round: {
    borderRadius: styleConstants.borderRadius,
  }
});

class LevelSolvedModal extends React.Component {
  render () {
    return <Modal
        animationIn='bounceInDown'
        animationInTiming={1000}
        animationOut='bounceOutUp'
        animationOutTiming={1000}
        isVisible={this.props.visible}
        onBackButtonPress={this.props.onRequestClose}
      >
        <View style={[styles.container, styles.center]}>
          <View style={[styles.content, styles.round]}>
            <View style={[styles.header, styles.center]}>
              <Icon name="md-star" color="gold" size={60}/>
            </View>
            <View style={[styles.header, styles.center]}>
              <Text style={styles.headerText}>
                LEVEL CLEARED
              </Text>
            </View>
            <View style={[styles.buttonContainer, styles.container, styles.center]}>
              <TouchableHighlight onPress={this.props.onNextLevelPressed} style={[styles.button, styles.center, styles.round]}>
                <View style={styles.center}>
                  <Text style={styles.headerText}>
                    NEXT LEVEL
                  </Text>
                  <Icon name='md-arrow-forward' size={60} color='white'/>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
    </Modal>;
  }
}

LevelSolvedModal.propTypes = {
  visible: PropTypes.bool,
  onNextLevelPressed: PropTypes.func,
  onRequestClose: PropTypes.func,
};

LevelSolvedModal.defaultProps = {
  visible: false,
  onNextLevelPressed: () => {},
  onRequestClose: () => {},
};

export default LevelSolvedModal;
