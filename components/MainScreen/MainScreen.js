import React from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import { connect } from 'react-redux';
import fontSizes from '../../constants/fontSizes';

const styles = StyleSheet.create({
  background: {
    display: 'flex',
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  headLineContainer: {
    flex: 2,
  },
  headline: {
    fontSize: fontSizes.huge,
    color: 'white',
    fontWeight: '900',
  },
  startButtonContainer: {
    flex: 4,
  },
  startButton: {

  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
//
class MainScreen extends React.Component {
  constructor(props) {
    super(props);

    this.onPlayPressed = this.onPlayPressed.bind(this);
  }

  onPlayPressed() {
    this.props.navigation.navigate('LevelsScreen')
  }

  render() {
    return <Image
      source={require('../../assets/img/background_boxes.png')}
      style={styles.background}
    >
      <View
        style={[styles.headLineContainer, styles.center]}
      >
        <Text
          style={styles.headline}
        >
          Title of the game
        </Text>
      </View>
      <View
        style={[styles.startButtonContainer, styles.center]}
      >
        <Button
          title='PLAY'
          style={styles.startButton}
          onPress={this.onPlayPressed}
        />
      </View>
    </Image>;
  }
}

MainScreen.navigationOptions = {
  header: null,
};

export default connect(state => ({
    // gameState: state.gameState,
  }), dispatch => ({
    // loadLevel: (level) => dispatch(loadLevel(level))
  })
)(MainScreen);
