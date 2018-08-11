import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import {getVehicles, test} from '../service.js';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      vehicles: [],
      error: null
    }
  }

  componentDidMount() {
    this.setState({isLoading: true});
    getVehicles().then(({vehicles, error}) =>
      this.setState({ isLoading: false, vehicles, error })
    );
  }

  _toVehicleListItem = ({item}) => <VehicleListItem {...item} />

  render() {
    const {vehicles=[], message, error, isLoading, resp} = this.state;

    const data = vehicles.length
      ? <FlatList data={vehicles} keyExtractor={item=>item.id} renderItem={this._toVehicleListItem} />
      : <Text>No results</Text>;

    return (
      <View style={styles.container}>
        {data}
        {/* <Text>Errors: {error}</Text>
        <Text>Test Message: {message}</Text>
        <Text>Vehicles returned: {vehicles.length}</Text> */}
      </View>
    );
  }
}

const VehicleListItem = (vehicle) => {
  console.log(vehicle)
  const {make, model} = vehicle;

  return (
    <View>
      <Text>{make} - {model}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
