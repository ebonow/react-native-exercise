import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Checkmark from './CheckMark';

export default class VehicleReservation extends Component {
  constructor(props) {
    super(props);

    this.orderNumber = props.navigation.getParam('orderPlacedAt');
  }

  static navigationOptions = {
    headerLeft: null,
    headerTitle: 'Reservation Confirmed'
  }

  render() {
    const {goBack, popToTop} = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={[styles.bold, styles.text]}>Your reservation has been comfirmed!</Text>
        <Checkmark color="green" size="100"></Checkmark>
        <Text style={[styles.bold, styles.text, styles.p]}>You are ready to roll!</Text>
        <View>
          <Text style={[styles.text]}>Your order number is:</Text>
          <Text style={[styles.text, styles.bold]}>{this.orderNumber}</Text>
        </View>
        <View style={styles.buttons}>
          <Button color="#346094" title="Vehicle Details" style={styles.button} onPress={() => goBack()} />
          <Button color="#346094" title="Back to Home" style={styles.button} onPress={() => popToTop()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20
  },
  bold: {
    fontWeight: '500'
  },
  text: {
    fontSize: 20,
    textAlign: 'center'
  },
  checkmark: {
    marginVertical: 40
  },
  buttons: {
    marginTop: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    flex: 1
  },
  p: {
    marginVertical: 20
  },
});
