import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const {navigation} = props;

    this.state ={
      id: navigation.getParam('id'),
      make: navigation.getParam('make'),
      model: navigation.getParam('model'),
      images: navigation.getParam('images'),
      price: navigation.getParam('price'),
    }
  }

  componentDidMount() {

  }

  render() {
    const {navigation} = this.props;
    const {make, model, images, price} = this.state;
    return (
      <View style={styles.container}>
        <Text>Show Vehicle Details Here</Text>
        <Text>Images: {images.length} ({Object.keys(images[0]).join(', ')})</Text>
        <Text>{make} - {model}</Text>
        <Text>${price}</Text>
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
