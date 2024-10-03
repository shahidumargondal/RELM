import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

const TextField = ({ label, value, onChangeText, placeholder, secureTextEntry, onBlur }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: fonts.medium, // Adjust to make the label text slightly bigger
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    height: 48,  // Slightly increase the height to match the screenshot
    borderColor: '#EDF1F3',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: fonts.medium,
    color: colors.black,
    backgroundColor: '#F9F9FC', // Light background color for input field
  },
});

export default TextField;
