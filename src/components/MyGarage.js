import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import fonts from '../styles/fonts';
import Logo from './Logo';
// import Carousel from 'react-native-snap-carousel';

const { width: viewportWidth } = Dimensions.get('window');

const Garage = () => {
  const carouselRef = useRef(null);


  const [photos, setPhotos] = useState([
    require('../../assets/image_1.png'),
    require('../../assets/image_2.png'),
    require('../../assets/image_3.png'),
    require('../../assets/image_4.png'),
    require('../../assets/image_5.png'),
  ]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={{ uri: item }} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Car Title */}

      <Text style={styles.carTitle}>2000 Bentley Arnage Turbo</Text>

      <Logo src={require("../../assets/image.png")} style={{ width : null, height: 200 , resizeMode: 'cover' }} />

      <View style={styles.photoContainer}>
        
        {photos.map((photo, index) => (
          <Image key={index} source={photo} style={styles.photo} />
        ))}
      </View>

      {/* Car Description */}
      <Text style={styles.carDescription}>
        I got the car two years ago, it needed a radiator and a new ECU. Since then, I’ve fixed a few relays, replaced the battery, tuned it up, and a few other smaller repairs.
      </Text>
      <Text style={styles.carDescription}>
        Amazing roadtrip car, it's a joy on the highway.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  carTitle: {
    fontSize: fonts.medium,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  slide: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 200,
    padding: 20,
    marginLeft: 0,
    marginRight: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  carDescription: {
    fontSize: fonts.medium,
    marginTop: 10,
    color: 'gray',
  },
  photoContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 5,
    resizeMode: 'contain',
    marginRight: 10,
  }
});

export default Garage;
