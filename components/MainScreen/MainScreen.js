import React from 'react';
import { StyleSheet, Text, Image, TouchableHighlight, View, Animated } from 'react-native';
import fontSizes from '../../constants/fontSizes';
import colors from '../../constants/colors';

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
    width: '100%'
  },
  imageContainer: {
    flex: 2,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  image: {
    height: 90,
    width: 90,
  },
  startButton: {
    height: '30%',
    width: '80%',
    backgroundColor: colors.lightBox2,
    borderBottomWidth: 10,
    borderRightWidth: 4,
    borderLeftWidth: 4,
    borderBottomColor: colors.darkBox3,
    borderRightColor: colors.lightBox3,
    borderLeftColor: colors.lightBox3,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePosition: new Animated.Value(0),
    };
    this.onPlayPressed = this.onPlayPressed.bind(this);
    this.moveImage = this.moveImage.bind(this);
  }

  componentDidMount() {
    this.moveImage();
  }

  onPlayPressed() {
    this.props.navigation.navigate('WorldsScreen')
  }

  moveImage() {
    Animated.sequence([
      Animated.timing(this.state.imagePosition, {
        toValue: 1,
        duration: 500,
      }),
      Animated.timing(this.state.imagePosition, {
        toValue: 0,
        duration: 500
      })
    ]).start(event => {
      if (event.finished) {
        this.moveImage();
      }
    });
  }

  render() {
    const spin = this.state.imagePosition.interpolate({
      inputRange: [0, 1],
      outputRange: ['-90deg', '90deg']
    });

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
          SUPER SOKOBAN
        </Text>
      </View>
      <Animated.View
        style={[
          styles.imageContainer,
          styles.center,
          {
            transform: [{ rotate: spin }],
          },
        ]}
      >
        <Image
          source={require('../../assets/img/playerRight.png')}
          style={styles.image}
        />
        <Image
          source={require('../../assets/img/boxOnGoal.png')}
          style={styles.image}
        />
      </Animated.View>

      <View
        style={[styles.startButtonContainer, styles.center]}
      >
        <TouchableHighlight
          style={[styles.startButton, styles.center]}
          onPress={this.onPlayPressed}
        >
          <Text style={styles.headline}>
            PLAY
          </Text>
        </TouchableHighlight>
      </View>
    </Image>;
  }
}

MainScreen.navigationOptions = {
  header: null,
};

export default MainScreen;
