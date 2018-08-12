import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import VehicleListItem from './VehicleListItem.js';

import {getVehicles} from '../service.js';

export default class VehicleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      vehicles: [],
      error: null
    }

    this._goToDetails = this._goToDetails.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});
    getVehicles().then(({vehicles, error}) => {
      this.setState({ isLoading: false, vehicles, error })
    });
  }

  _goToDetails = (vehicle) => this.props.navigation.navigate('Details', vehicle);

  _toVehicleListItem = ({item}) => <VehicleListItem {...item} onPress={this._goToDetails} />

  render() {
    const {vehicles=[], error, isLoading} = this.state;

    return (
      <View style={styles.container}>
        {!isLoading && (
          <FlatList data={vehicles} 
            keyExtractor={item=>item.id} 
            renderItem={this._toVehicleListItem} 
            contentContainerStyle={styles.vehicleList}
            numColumns={2}
            ListEmptyComponent={<Text>No results</Text>}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 40,
    backgroundColor: '#dfdfdf'
  },
  image: {
    borderColor: '#ff0000',
    borderWidth: 2,
    height: 120,
    width: 160
  },
  vehicleList: {
    alignItems: 'center',
    margin: 'auto'
  }
});
