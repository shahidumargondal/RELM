import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon} from 'react-native-elements';
import fonts from '../styles/fonts';
import Logo from './Logo';
import colors from '../styles/colors';
import Button from './Button';

const MyInfo = () => {
  return (
    <View style={styles.container}>
      {/* Header Text */}
      <Text style={styles.headerText}>
        Fellow car lovers! Thank you for joining carclub!
      </Text>
      <Text style={styles.subText}>
        We have many perks set up for you as a founding member, and we are excited to share them with you!
      </Text>

      {/* Location and Social Info */}
      <View style={styles.infoRow}>
        <Logo src={require('../../assets/location_on.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }}/>
        <Text style={styles.infoText}>Santa Monica, CA, USA</Text>
      </View>

      <View style={styles.infoRow}>
      <Logo src={require('../../assets/language.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }}/>
        <Text style={styles.infoText}>manny.gabe</Text>
      </View>

      <View style={styles.infoRow}>
      <Logo src={require('../../assets/insta.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }}/>
        <Text style={styles.infoText}>manny.gabe</Text>
      </View>

      {/* Liked Brands */}
      <Text style={styles.likedBrandsTitle}>Liked Brands</Text>
      <View style={styles.brandContainer}>
        <Button
          title="Austin Martin"
          type="outline"
          textColor={colors.black}
          styleText={{fontSize : fonts.small}}
          style={styles.brandButton}
          titleStyle={styles.brandTitle}
        />
        <Button
          title="BMW"
          type="outline"
          textColor={colors.black}
          styleText={{fontSize : fonts.small}}
          style={styles.brandButton}
          titleStyle={styles.brandTitle}
        />
        <Button
          title="Audi"
          type="outline"
          textColor={colors.black}
          styleText={{fontSize : fonts.small}}
          style={styles.brandButton}
          titleStyle={styles.brandTitle}
        />
        <Button
          title="Bentley"
          type="outline"
          textColor={colors.black}
          styleText={{fontSize : fonts.small}}
          style={styles.brandButton}
          titleStyle={styles.brandTitle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerText: {
    fontSize: fonts.medium,
    // fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    fontSize: fonts.medium,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 10,
  },
  likedBrandsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  brandContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  brandButton: {
    // marginBottom: 10,
    borderColor: colors.black,
    borderWidth : 1,
    padding : 10,
    borderRadius : 10,
    backgroundColor : colors.brands,
    color : colors.black,
    paddingVertical: 5,
    marginHorizontal : 5,
  },
  brandTitle: {
    fontSize: 12,
    color: 'gray',
  },
});

export default MyInfo;
