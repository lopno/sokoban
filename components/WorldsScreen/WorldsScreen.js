import React from 'react';
import { connect } from 'react-redux';
import { BackHandler, FlatList, View, Button, Text, TouchableHighlight } from 'react-native';
import WorldItem from './WorldItem';

import { loadLevel } from '../../actions/levelActions';
import colors from'../../constants/colors';

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: colors.lightGray,
  },
};

class WorldsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onLevelPressed = this.onLevelPressed.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  onLevelPressed(level) {
    this.props.loadLevel(level);
    this.props.navigation.navigate('GameScreen');
  }

  render() {
    return (
      <FlatList
        data={[{key: '1', header: 'header 1', description: 'description 1'}, {key: '2', header: 'header 2', description: 'description 2'}]}
        renderItem={({item}) =>
          (<View>
            <WorldItem
              header={item.header}
              description={item.description}
              onPress={() => this.props.navigation.navigate('LevelsScreen')}
            />
          </View>)}
      />
    );
  }
}


WorldsScreen.navigationOptions = {
  header: null,
};

export default connect(state => ({
    gameState: state.gameState,
  }), dispatch => ({
    loadLevel: (level) => dispatch(loadLevel(level))
  })
)(WorldsScreen);
