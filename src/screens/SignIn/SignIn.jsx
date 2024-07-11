import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

//yup
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

//context
import { useStateContext } from "../../context";
import { Lock, User } from "../../svgs";
import { font } from "../../constants";

export default function SignIn() {
  const navigation = useNavigation();
  const auth = Firebase_Auth;
  const { test, settest } = useStateContext();

  const signInValidationSchema = yup.object().shape({
    username: yup
      .string()

      .required("Username is Required"),
    password: yup.string().required("Password cannot be empty!"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(signInValidationSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    handleSignIn(data.username, data.password);
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
    <LinearGradient
      colors={["rgba(94, 110, 143, 1)", "rgba(228, 187, 241, 1)"]}
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: "90%",
          width: "90%",
          backgroundColor: "white",
          borderRadius: 30,
        }}
      >
        <View
          style={{
            marginTop: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
         <Image source={require("../../../assets/logo.png")} style={{height:150,width:250,resizeMode:'contain',marginTop:10}}/>
        </View>
        {/* inputs */}
        <View
          style={{
            alignSelf: "center",
            width: "100%",
            alignItems: "center",
            marginTop: 70,
          }}
        >
          {/* 1st */}
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View
                style={{
                  width: "90%",
                  height: 50,
                  backgroundColor: "grey",
                  borderRadius: 7,
                  opacity: 0.3,
                  display: "flex",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  flexDirection: "row",
                  alignSelf: "center",
                }}
              >
                <User/>
                <TextInput
                  style={{ width: "90%", height: 50, paddingHorizontal: 20,fontFamily:font.regular }}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  placeholder="username"
                  placeholderTextColor={"black"}
                  
                />
              </View>
            )}
            name="username"
          />
          {errors.username && (
            <Text
              style={{
                fontSize: 10,
                color: "red",
                marginLeft: 45,
                marginTop: 5,
              }}
            >
              {errors.username.message}
            </Text>
          )}
          {/* 1st */}
          {/* 2nd */}
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View
                style={{
                  width: "90%",
                  height: 50,
                  backgroundColor: "grey",
                  borderRadius: 7,
                  opacity: 0.3,
                  display: "flex",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  flexDirection: "row",
                  alignSelf: "center",
                  marginTop: 30,
                }}
              >
                <Lock/>
                <TextInput
                  style={{ width: "90%", height: 50, paddingHorizontal: 20,fontFamily:font.regular }}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  placeholder="password"
                  secureTextEntry={true}
                  placeholderTextColor={"black"}
                />
              </View>
            )}
            name="password"
          />
          {errors.password && (
            <Text
              style={{
                fontSize: 10,
                color: "red",
                marginLeft: 45,
                marginTop: 5,
              }}
            >
              {errors.password.message}
            </Text>
          )}

          {/* 2nd */}
        </View>
        {/* inputs */}
        {/* buttons */}
        <TouchableOpacity
          style={{
            width: "90%",
            height: 50,
            backgroundColor: "lightgrey",
            borderRadius: 8,
            alignSelf: "center",
            marginTop: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={{fontFamily:font.medium,fontSize:18,color:"rgba(79, 79, 79, 1)"}}>validate membership</Text>
        </TouchableOpacity>
        {/* buttons */}
        {/* sign up password reset */}
        <View
          style={{
            width: "90%",
            alignSelf: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ color: "rgba(0, 117, 255, 1)", textDecorationLine: "underline", fontFamily:font.regular }}>
              signup
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{fontFamily:font.regular,color:"rgba(145, 145, 145, 1)"}}>password reset?</Text>
          </TouchableOpacity>
        </View>

        {/* sign up password reset */}
        {/* Sign In with */}
        <View
          style={{
            display: "flex",
            alignSelf: "center",
            marginTop: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "rgba(145, 145, 145, 1)", fontSize: 20,fontFamily:font.medium }}>
            sign in with
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <TouchableOpacity>
              <SimpleLineIcons name="social-linkedin" size={28} color="grey" />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="instagram" size={30} color="grey" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Sign In with */}
        {/* bottom */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignSelf: "center",
            gap: 20,
            position: "absolute",
            bottom: 20,
          }}
        >
          <TouchableOpacity>
            <Text style={{fontFamily:font.regular,fontSize:10}}>terms of service</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{fontFamily:font.regular,fontSize:10}}>privacy policy</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{fontFamily:font.regular,fontSize:10}}>help</Text>
          </TouchableOpacity>
        </View>
        {/* bottom */}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
