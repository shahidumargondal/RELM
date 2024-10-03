import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { useNavigation } from '@react-navigation/native';

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

// Define the Yup validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen = () => {

  const auth = Firebase_Auth;

  let navigation = useNavigation();

  const btnSignUpClick = () => {
    navigation.navigate('SignUp');
  }

  const btnInstagramClick = () => {

  }

  const btnGoogleClick = () => {
    // navigation.navigate('Profile')
  }

  const handleSubmit = (values) => {
    // Handle form submission

    // handleSignIn(values.email, values.password);
    
    navigation.navigate('Profile')
    // Here, you can make an API call or any other action
  };

  const handleSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        console.log("Signing in", userCredentials);
        const myquery = query(
          collection(db, "user"),
          where("email", "==", email)
        );
        const querysnapshot = await getDocs(myquery);
        if (querysnapshot.empty) {
          alert("Something wrong");
          return;
        }
        querysnapshot.forEach((doc) => {
          console.log(doc.data());
          settest(doc.data());
        });

        navigation.navigate("Home");
      })
      .catch((error) => alert(error));
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextField
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="johndoe832@gmail.com"
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextField
              label="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              placeholder="*******"
              secureTextEntry={true}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>forgot password?</Text>
            </TouchableOpacity>

            <Button textColor={colors.black} title="log in" onPress={handleSubmit} />

            <View style={styles.orTextDiv}>
              <View style={styles.line} />
              <View>
                <Text style={styles.orText}> Or  </Text>
              </View>
              <View style={styles.line} />
            </View>

            <TouchableOpacity onPress={btnGoogleClick}>
              <Logo src={require("../../../assets/google_login.png")} style={{ width: '100%', height: 50, resizeMode: 'contain' }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={btnInstagramClick}>
              <Logo src={require("../../../assets/instagram_login.png")} style={{ width: '100%', height: 50, resizeMode: 'contain', marginTop: 10 }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={btnSignUpClick}>
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  don't have an account? <Text style={styles.signUpText}>sign up</Text>
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: colors.blue,  // Use grey color for the "forgot password" text
    textAlign: 'right',
    marginVertical: 10,
    fontSize: fonts.medium,  // Medium font size for the text
  },
  orTextDiv: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.lightGray
  },
  orText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: fonts.medium,  // Larger font for "Or"
    color: colors.greyText,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: fonts.medium,
    color: colors.greyText,  // Grey color for "don't have an account?"
  },
  signUpText: {
    color: colors.blue,
  },
});

export default LoginScreen;
