import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import ProfileHeader from '../../components/ProfileHeader';
import MyInfo from '../../components/MyInfo';
import MyGarage from '../../components/MyGarage';
import { TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const Profile = () => {

  const [activeSection, setActiveSection] = useState('info'); // Default is 'my info'

  const user = {
    name: 'Manny',
    garageCount: 3,
    image: require('../../../assets/me1.png'), // Replace with actual image URL
  };

  const carImages = [
    'https://path-to-image-1.com',
    'https://path-to-image-2.com',
    'https://path-to-image-3.com',
    // Add more URLs here
  ];

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader user={user} />
      <View style={styles.header}>
        <TouchableOpacity
          style={activeSection === 'info' ? styles.activeButton : styles.inactiveButton}
          onPress={() => setActiveSection('info')}
        >
          <Text style={activeSection === 'info' ? styles.activeButtonText : styles.inactiveButtonText}>
            my info
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={activeSection === 'garage' ? styles.activeButton : styles.inactiveButton}
          onPress={() => setActiveSection('garage')}
        >
          <Text style={activeSection === 'garage' ? styles.activeButtonText : styles.inactiveButtonText}>
            my garage
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conditionally Render the Content */}
      <View style={styles.content}>
        {activeSection === 'info' && <MyInfo />}
        {activeSection === 'garage' && <MyGarage carImages={carImages} />}
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : colors.textColor
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginHorizontal : 10,
  },
  activeButton: {
    paddingVertical: 10,
    borderBottomColor : colors.primary,
    borderBottomWidth : 1,
    margin : 0,
    flex : 1,
  },
  inactiveButton: {
    borderColor: colors.black,
    paddingVertical: 10,
    borderBottomColor : colors.greyText,
    borderBottomWidth : 1,
    margin : 0,
    flex:  1,
  },
  activeButtonText: {
    color: colors.primary,
    fontSize: fonts.medium,
    fontWeight: 'bold',
    textAlign : 'center'
  },
  inactiveButtonText: {
    color: colors.black,
    fontSize: fonts.medium,
    fontWeight: '500',
    textAlign : 'center'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Profile;
