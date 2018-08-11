import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ReservationComplete extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Your reservation has been comfirmed!</Text>
        <Text>Congrats! You are ready to roll!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
