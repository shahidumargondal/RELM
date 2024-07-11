import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

//yup
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectList } from "react-native-dropdown-select-list";

import * as ImagePicker from "expo-image-picker";

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
import { useNavigation } from "@react-navigation/native";
import { font } from "../../constants";

let images = [];

export default function SignUp() {
  const [selected, setSelected] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const [Uploading, setUploading] = useState(false);
  const navigation = useNavigation();
  const auth = Firebase_Auth;
  const data = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
  ];

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      handleUpload(result.assets[0].uri);
    }
  };

  // UPLOAD IMAGE
  const handleUpload = async (Incidentimage) => {
    setUploading(true);
    const blobImage = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network Request Failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", Incidentimage, true);
      xhr.send(null);
    });

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: "image/jpg",
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "profile/" + Date.now().toString());
    const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

        switch (snapshot?.state) {
          case "paused":
            console.log("Upload is paused");
            // setUploading(false);
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error?.code) {
          case "storage/unauthorized":
            // setUploading(false);
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // setUploading(false);
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // setUploading(false);
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask?.snapshot?.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          console.log("File available at", ImageUrl);
          setUploading(false);
        });
      }
    );
    // setUploading(false);
  };

  const signInValidationSchema = yup.object().shape({
    firstname: yup
      .string()

      .required("First name is Required"),
    lastname: yup
      .string()

      .required("Last name is Required"),
    email: yup
      .string()
      .email("Please enter a valid email!")
      .required("Email is Required"),
    lastname: yup
      .string()

      .required("First name is Required"),
    birthday: yup.string(),

    currentcity: yup.string(),
    knownlanguages: yup.string(),
    password: yup.string().min(6),
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
    const newuser = {
      ...data,
      selected,
      ImageUrl,
    };
    console.log(newuser);

    handleSignUp(data.email, data.password, newuser);
  };

  const handleSignUp = async (email, password, newuser) => {
    console.log("in handle signup", email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        console.log("Sign up successful", userCredentials);
        const docRef = newuser;
        await setDoc(doc(db, "user", Date.now().toString()), docRef);
        navigation.navigate("SignIn");
      })
      .catch((error) => console.log(error));
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
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 100,
              paddingHorizontal: 10,
            }}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              style={{ marginTop: 20, marginLeft: 20 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back-outline" size={30} color="grey" />
            </TouchableOpacity>
            <View
              style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../assets/logotwo.png")}
                style={{
                  height: 100,
                  width: 250,
                  resizeMode: "contain",
                  marginTop: 10,
                }}
              />
            </View>

            {/* TEXT INPUTS */}
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <View
                  style={{
                    width: "50%",
                    height: 40,
                    borderBottomWidth: 1,
                    borderColor: "grey",

                    display: "flex",

                    marginLeft: 30,
                    marginTop: 20,
                  }}
                >
                  <TextInput
                    style={{
                      width: "100%",
                      height: 50,
                      fontFamily: font.medium,
                      fontSize: 14,
                    }}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    placeholder="first name"
                    placeholderTextColor={"rgba(145, 145, 145, 1)"}
                  />
                </View>
              )}
              name="firstname"
            />
            {errors.firstname && (
              <Text
                style={{
                  fontSize: 10,
                  color: "red",
                  marginLeft: 45,
                  marginTop: 5,
                }}
              >
                {errors.firstname.message}
              </Text>
            )}
            {/* First */}

            {/* 2nd */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <View
                    style={{
                      width: "50%",
                      height: 40,
                      borderBottomWidth: 1,
                      borderColor: "grey",
                      marginTop: 15,
                      display: "flex",

                      marginLeft: 30,
                    }}
                  >
                    <TextInput
                      style={{
                        width: "100%",
                        height: 50,
                        fontFamily: font.medium,
                        fontSize: 14,
                      }}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      placeholder="last name"
                      placeholderTextColor={"rgba(145, 145, 145, 1)"}
                    />
                  </View>
                )}
                name="lastname"
              />
              {errors.lastname && (
                <Text
                  style={{
                    fontSize: 10,
                    color: "red",
                    marginLeft: 45,
                    marginTop: 5,
                  }}
                >
                  {errors.lastname.message}
                </Text>
              )}
              <View style={{ marginTop: 15 }}>
                <SelectList
                  boxStyles={{
                    width: 65,
                    height: 40,
                    borderRadius: 100,
                    backgroundColor: "rgba(241, 241, 241, 1)",
                    borderColor: "transparent",
                   
                  }}
                  setSelected={(val) => setSelected(val)}
                  data={data}
                  save="value"
                  search={false}
                  placeholder="sex"
                  inputStyles={{ fontSize: 10, color: "grey",fontFamily: font.medium, }}
                  dropdownStyles={{ width: 100 }}
                  dropdownTextStyles={{ fontSize: 8 }}
                />
              </View>
            </View>

            {/* 2nd */}
            {/** 3rd */}
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <View
                  style={{
                    width: "70%",
                    height: 40,
                    borderBottomWidth: 1,
                    borderColor: "grey",
                    marginTop: 15,
                    display: "flex",

                    marginLeft: 30,
                  }}
                >
                  <TextInput
                    style={{
                      width: "100%",
                      height: 50,
                      fontFamily: font.medium,
                      fontSize: 14,
                    }}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    placeholder="birthday"
                    placeholderTextColor={"rgba(145, 145, 145, 1)"}
                  />
                </View>
              )}
              name="birthday"
            />
            {errors.birthday && (
              <Text
                style={{
                  fontSize: 10,
                  color: "red",
                  marginLeft: 45,
                  marginTop: 5,
                }}
              >
                {errors.birthday.message}
              </Text>
            )}

            {/** 3rd */}
            {/** 4th */}
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <View
                  style={{
                    width: "70%",
                    height: 40,
                    borderBottomWidth: 1,
                    borderColor: "grey",

                    display: "flex",
                    marginTop: 15,
                    marginLeft: 30,
                  }}
                >
                  <TextInput
                    style={{
                      width: "100%",
                      height: 50,
                      fontFamily: font.medium,
                      fontSize: 14,
                    }}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    placeholder="email"
                    placeholderTextColor={"rgba(145, 145, 145, 1)"}
                  />
                </View>
              )}
              name="email"
            />
            {errors.email && (
              <Text
                style={{
                  fontSize: 10,
                  color: "red",
                  marginLeft: 45,
                  marginTop: 5,
                }}
              >
                {errors.email.message}
              </Text>
            )}

            {/** 4th */}
            {/** 4th */}
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <View
                  style={{
                    width: "70%",
                    height: 40,
                    borderBottomWidth: 1,
                    borderColor: "grey",

                    display: "flex",
                    marginTop: 15,
                    marginLeft: 30,
                  }}
                >
                  <TextInput
                    style={{
                      width: "100%",
                      height: 50,
                      fontFamily: font.medium,
                      fontSize: 14,
                    }}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    placeholder="password"
                    placeholderTextColor={"rgba(145, 145, 145, 1)"}
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

            {/** 4th */}

            {/** 5th */}
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <View
                  style={{
                    width: "70%",
                    height: 40,
                    borderBottomWidth: 1,
                    borderColor: "grey",

                    display: "flex",
                    marginTop: 15,
                    marginLeft: 30,
                  }}
                >
                  <TextInput
                    style={{
                      width: "100%",
                      height: 50,
                      fontFamily: font.medium,
                      fontSize: 14,
                    }}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    placeholder="current city"
                    placeholderTextColor={"rgba(145, 145, 145, 1)"}
                  />
                </View>
              )}
              name="currentcity"
            />
            {errors.currentcity && (
              <Text
                style={{
                  fontSize: 10,
                  color: "red",
                  marginLeft: 45,
                  marginTop: 5,
                }}
              >
                {errors.currentcity.message}
              </Text>
            )}

            {/** 5th */}

            {/* Image picker */}
            <View style={{ width: "85%", alignSelf: "center", marginTop: 20 }}>
              <Text style={{ color: "rgba(145, 145, 145, 1)",fontFamily:font.medium  }}>add photos</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 20,
                width: "90%",
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              {ImageUrl ? (
                <View>
                  <Image
                    source={{ uri: ImageUrl }}
                    style={{ width: 50, height: 50, marginLeft: 20 }}
                  />
                </View>
              ) : null}
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,

                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "lightgrey",
                  marginTop: 10,
                }}
                onPress={pickImage}
              >
                <AntDesign name="plus" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {/* Image picker */}

            {/** 6th */}
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <View
                  style={{
                    width: "70%",
                    height: 40,
                    borderBottomWidth: 1,
                    borderColor: "grey",

                    display: "flex",

                    marginLeft: 30,
                    marginTop: 20,
                  }}
                >
                  <TextInput
                    style={{ width: "100%", height: 50,fontFamily: font.medium,fontSize:14 }}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    placeholder="known languages"
                    placeholderTextColor={"rgba(145, 145, 145, 1)"}
                  />
                </View>
              )}
              name="knownlanguages"
            />
            {errors.knownlanguages && (
              <Text
                style={{
                  fontSize: 10,
                  color: "red",
                  marginLeft: 45,
                  marginTop: 5,
                }}
              >
                {errors.knownlanguages.message}
              </Text>
            )}

            {/** 6th */}

            {/* inputs */}

            <TouchableOpacity
              style={{
                display: "flex",
                alignSelf: "flex-end",
                right: 10,
              }}
              onPress={handleSubmit(onSubmit)}
            >
              <Ionicons name="chevron-forward" size={30} color="grey" />
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
