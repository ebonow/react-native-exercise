import React from 'react';
import { StyleSheet, Text, View, Image, TouchableNativeFeedback } from 'react-native';

import {lowRes} from '../imageHelper.js';

export default VehicleListItem = (props) => {
    const {make, model, images=[{}], id, price, onPress} = props;
    const photo = lowRes(images)[0];
    const vehicle = {make, model, photo, id, price};
  
    return (
      <View style={styles.vehicleListItem}>
        <TouchableNativeFeedback onPress={() => onPress(vehicle)}>
          <View>
            <Image source={{uri:photo}} style={styles.vehicleListItemImage} resizeMode='cover' />
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
        backgroundColor: '#E1E43C',
        color: '#000',
        elevation: 2,
        opacity: .9
    }
});