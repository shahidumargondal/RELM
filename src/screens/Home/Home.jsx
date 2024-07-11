import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

import { useStateContext } from "../../context";
export default function Home() {
  const { test } = useStateContext();
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flex: 1,
      }}
    >
      <Text>{test.email}</Text>
      <Image
        source={{ uri: test.ImageUrl }}
        style={{ width: 100, height: 100, borderRadius: 50, marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
