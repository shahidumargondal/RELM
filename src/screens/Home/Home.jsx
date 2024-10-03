import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

import { useStateContext } from "../../context";
import { LinearGradient } from "expo-linear-gradient";
import { font } from "../../constants";
export default function Home() {
  const { test } = useStateContext();
  return (
    <LinearGradient  colors={["rgba(94, 110, 143, 1)", "rgba(228, 187, 241, 1)"]}
    style={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
    <View
     style={{
      height: "90%",
      width: "90%",
      backgroundColor: "white",
      borderRadius: 30,
      alignItems:'center',
      gap:10
      
    }}
    >
      {/* <Image
        source={{ uri: test.ImageUrl }}
        style={{ width: 100, height: 100, borderRadius: 50, marginTop: 30 }}
      />
      <Text style={{fontFamily:font.regular,color:"rgba(145, 145, 145, 1)"}}>{test.firstname}</Text>
       */}
       <Text style={{marginTop : 13}}>Home Page</Text>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
