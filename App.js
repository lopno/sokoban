import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import BoardView from './components/BoardView';

const layoutExample = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,1,0,0,0],
  [0,0,0,0,0,0,0,0],
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      layout: layoutExample,
    };

    this.updateLocation = this.updateLocation.bind(this);
  }

  updateLocation(direction) {
    console.log(direction);
    switch (direction) {
      case 'up': this.setState({ y: this.state.y + 1}); break;
      case 'down': this.setState({ y: this.state.y - 1}); break;
      case 'left': this.setState({ x: this.state.x - 1}); break;
      case 'right': this.setState({ x: this.state.x + 1}); break;
      default: break;
    }
  }

  render() {
    console.log(JSON.stringify(this.state));
    return (
      <View style={styles.container}>
        <View style={styles.gameBoard}>
          <Text>Game board</Text>
          <Text>Hey Nuref!</Text>
          <BoardView width={8} height={3} layout={layoutExample}/>
          <Text>{`x: ${this.state.x}, y: ${this.state.y}`}</Text>
        </View>
        <View style={styles.controls}>
          <Text>Controller thing</Text>
          <Button onPress={() => this.updateLocation('up')} title="Up" color="red"/>
          <View style={{flexDirection: 'row'}}>
            <Button onPress={() => this.updateLocation('left')} title="Left" color="red"/>
            <View/>
            <Button onPress={() => this.updateLocation('right')} title="Right" color="red"/>
          </View>
          <Button onPress={() => this.updateLocation('down')} title="Down" color="red"/>

        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameBoard: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  controls: {
    flex: 1
  },
});
