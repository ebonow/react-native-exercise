import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableNativeFeedback } from 'react-native';

import {getVehicles} from '../service.js';

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

  _onPress = (vehicle) => this.props.navigation.navigate('Details', vehicle);

  _toVehicleListItem = ({item}) => <VehicleListItem {...item} onPress={()=>this._onPress(item)} />

  render() {
    const {vehicles=[], message, error, isLoading, resp} = this.state;

    return (
      <View style={styles.container}>
        <FlatList data={vehicles} 
          keyExtractor={item=>item.id} 
          renderItem={this._toVehicleListItem} 
          contentContainerStyle={styles.vehicleList}
          numColumns={2}
          ListEmptyComponent={<Text>No results</Text>}
        />
      </View>
    );
  }
}

const VehicleListItem = (props) => {
  const {make, model, images=[{}], id, price, onPress} = props;
  const uri = (images[0].low + '?random=' + id);
  
  return (
    <View style={styles.vehicleListItem}>
      <TouchableNativeFeedback onPress={onPress}>
        <View>
          <Image source={{uri}} style={styles.vehicleListItemImage} resizeMode='cover' />
          <View style={styles.vehicleListItemTextContainer}>
            <Text style={styles.vehicleListItemMake}>{make.toUpperCase()}</Text>
            <Text style={styles.vehicleListItemModel}>{model}</Text>
          </View>
          <Text style={styles.vehicleListItemPrice}>${price.replace('.00','')}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
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
  },
  vehicleListItem: {
    backgroundColor: '#fff', 
    width: '48%',
    margin: '1%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4
  },
  vehicleListItemTextContainer: {
    padding: 5
  },
  vehicleListItemImage: {
    aspectRatio: 1.5,
    width: '100%'
  },
  vehicleListItemMake: {
    fontWeight: 'bold',

  },
  vehicleListItemModel: {
  },
  vehicleListItemPrice: {
    position: 'absolute',
    top: 5,
    right: 0,
    padding: 5,
    backgroundColor: '#E1E43C', //'#346094',
    color: '#000',
    elevation: 2,
    opacity: .9
  }
});
