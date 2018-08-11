import React, {Component} from 'react';
import {Text} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import VehicleDetails from './components/VehicleDetails';
import VehicleList from './components/VehicleList';
import VehicleOrdered from './components/VehicleOrdered';
 
const RootStack = createStackNavigator({
    List: {
      screen: VehicleList
    },
    Details: {
      screen: VehicleDetails
    },
    Ordered: {
      screen: VehicleOrdered
    }
  },{
    initialRouteName: 'List',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        padding: 10,
        color: '#fff'
      },
      headerTitle: 'Vehicle Browser',
    }
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}