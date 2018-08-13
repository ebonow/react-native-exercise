import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, Dimensions } from 'react-native';

import {getVehicleDetails, reserveVehicle} from '../service.js';
import {highRes} from '../imageHelper.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    const {getParam} = props.navigation;

    this.state = {
      id: getParam('id'),
      make: getParam('make').toUpperCase(),
      model: getParam('model'),
      price: getParam('price').replace('.00',''),
      bgImage: require('../assets/car.png'), //getParam('photo'),
      images: [],
      isLoading: false,
      isReserved: false
    }

    this.useBgImg = true;
  }

  static navigationOptions = {
    headerTitle: 'Vehicle Details'
  }

  componentDidMount() {
    const {id} = this.state;
    this.setState({isLoading:true});
    getVehicleDetails(id).then(({vehicle, error})=>{
      const {images, description} = vehicle;

      this.setState({
        isLoading: false,
        images: highRes(images),
        description,
        error
      });
    })
  }

  _toSliderImage = (uri, i) => <Image source={{uri}} style={styles.sliderImage} key={i} />
  
  _onPress = () => {
    const vehicle = {id, make, model, price} = this.state;

    this.setState({isLoading: true});

    reserveVehicle(id).then(({orderPlacedAt, error}) => {

      this.setState({
        isLoading: false,
        error,
        isReserved: !!orderPlacedAt
      })
      
      if (!error) {
        this.props.navigation.navigate('Reserved', {orderPlacedAt, ...vehicle})
      }
    });
  }

  render() {
    const {make, model, price, description, isLoading, bgImage, images, error, isReserved} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.slider}>
          {(this.useBgImg) && (
            <View style={styles.sliderBg}>
              <Image source={bgImage} style={styles.sliderImage} resizeMode="cover" />
            </View>
          )}
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
          >
            {images.map(this._toSliderImage)}
          </ScrollView>
        </View>
        <View style={styles.content}>
          <Text style={[styles.bold, styles.text]}>{make}</Text>
          <Text style={styles.text}>{model}</Text>
          <Text style={styles.p}>{description}</Text>
        </View>
        <View style={styles.center}>
          {(!error) && 
            <Text style={styles.error}>{error}</Text>
          }
          <View style={styles.buttonContainer}>
            {(!isReserved) ? (
              <Button 
                title={`Reserve now for $${price}`} 
                styles={styles.button}
                onPress={this._onPress}
                disabled={isLoading}
                color={'#346094'}
            />
            ) : (
              <Text style={[styles.reserved, styles.bold]}>YOU RESERVED THIS VEHICLE</Text>
            )
          }
          </View>
        </View>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');
const height = width * .75;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  sliderBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: '#eee'
  },
  slider: {
    height
  },
  sliderImage: {
    width,
    height    
  },
  content: {
    justifyContent: 'flex-start',
    padding: 10
  },
  bold: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20
  },
  p: {
    marginVertical: 20
  },
  center: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  error: {
    marginVertical: 10,
    color: 'red'
  },
  reserved: {
    marginVertical: 10,
    color: '#346094'
  },
  buttonContainer: {
    width: 200
  }
});
