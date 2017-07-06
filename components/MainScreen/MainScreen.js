import React from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';

class MainScreen extends React.Component {
  constructor(props) {
    super(props);

    this.onPlayPressed = this.onPlayPressed.bind(this);
  }

  onPlayPressed() {
    this.props.navigation.navigate('LevelsScreen')
  }

  render() {
    return <View>
      <Button title='PLAY' onPress={this.onPlayPressed} />
    </View>;
  }
}

export default connect(state => ({
    // gameState: state.gameState,
  }), dispatch => ({
    // loadLevel: (level) => dispatch(loadLevel(level))
  })
)(MainScreen);
