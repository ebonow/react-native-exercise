import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';

import VehicleDetails from './components/VehicleDetails';
import VehicleList from './components/VehicleList';
import VehicleReservation from './components/VehicleReservation';
 
const RootStack = createStackNavigator({
    List: {
      screen: VehicleList
    },
    Details: {
      screen: VehicleDetails
    },
    Reserved: {
      screen: VehicleReservation
    }
  },{
    initialRouteName: 'List',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#346094'
      },
      headerTintColor: '#fff',
      headerTitleStyle: { 
        fontWeight: '100',
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