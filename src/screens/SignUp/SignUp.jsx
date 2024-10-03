import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import ImagePicker from 'react-native-image-picker';
import Logo from '../../components/Logo';

//firebase
import {
  app,
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  query,
  where,
  getDoc,
  orderBy,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
  createUserWithEmailAndPassword,
  Firebase_Auth,
} from "../../Services";
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {

  const auth = Firebase_Auth;
  const [selected, setSelected] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const [Uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);

  let navigation = useNavigation();


  const [photos, setPhotos] = useState([
    require('../../../assets/me1.png'),
    require('../../../assets/me2.png'),
    require('../../../assets/me3.png'),
  ]);

  const handleImageUpload = () => {
    // const options = {
    //   title: 'Select Photo',
    //   storageOptions: {
    //     skipBackup: true,
    //     path: 'images',
    //   },
    // };

    // ImagePicker.showImagePicker(options, (response) => {
    //   if (response.uri) {
    //     setPhotos([...photos, response]);
    //   }
    // });
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    birthDate: Yup.string().required('Birth date is required'),
    sex: Yup.string().required('Sex is required'),
    zipCode: Yup.string().required('Zip code is required'),
  });

  const onBackPress = () => {
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>

      <View style={[styles.row, { justifyContent: '', }]}>
        <TouchableOpacity onPress={ onBackPress}>
          <Image source={require("../../../assets/back.png")} style={styles.logo} />
        </TouchableOpacity>
        <Logo />
      </View>


      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', birthDate: '', sex: 'male', zipCode: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          Alert.alert('Form Submitted', JSON.stringify(values));
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <TextField
                  label="First Name"
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  placeholder="manny"
                />
                {touched.firstName && errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
              </View>
              <View style={styles.halfWidth}>
                <TextField
                  label="Last Name"
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  placeholder="roman"
                />
                {touched.lastName && errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
              </View>
            </View>

            <TextField
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="manny@carclub.life"
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <TextField
                  label="Birth Date"
                  value={values.birthDate}
                  onChangeText={handleChange('birthDate')}
                  onBlur={handleBlur('birthDate')}
                  placeholder="03-11-1983"
                />
                {touched.birthDate && errors.birthDate && <Text style={styles.errorText}>{errors.birthDate}</Text>}
              </View>
              <View style={styles.halfWidth}>
                <TextField
                  label="Sex"
                  value={values.sex}
                  onChangeText={handleChange('sex')}
                  onBlur={handleBlur('sex')}
                  placeholder="male"
                />
                {touched.sex && errors.sex && <Text style={styles.errorText}>{errors.sex}</Text>}
              </View>
            </View>

            <TextField
              label="Zip Code"
              value={values.zipCode}
              onChangeText={handleChange('zipCode')}
              onBlur={handleBlur('zipCode')}
              placeholder="90404"
            />
            {touched.zipCode && errors.zipCode && <Text style={styles.errorText}>{errors.zipCode}</Text>}

            <Text style={styles.addPhotoText}>Add Self Photos</Text>
            <View style={styles.photoContainer}>
              {photos.map((photo, index) => (
                <Image key={index} source={photo} style={styles.photo} />
              ))}
              <TouchableOpacity style={styles.addPhotoButton} onPress={handleImageUpload}>
                <Image source={require('../../../assets/add-photo.png')} style={styles.photo} />
              </TouchableOpacity>
            </View>

            <Button style={{ marginTop: 20 }} textColor={colors.black} title="Submit" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    marginTop: 75,
    width: 30,
    height: 20,
    resizeMode: 'contain',
    marginRight: 20,
  },
  halfWidth: {
    width: '48%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 10,
  },
  addPhotoText: {
    marginTop: 20,
    fontSize: fonts.medium,
    color: colors.black,
    fontWeight: 500
  },
  photoContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 5,
    resizeMode: 'contain',
    marginRight: 10,
  },
  addPhotoButton: {
    width: 50,
    height: 50,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default SignupScreen;
