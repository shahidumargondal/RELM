import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

const Button = ({ title, onPress, backgroundColor, textColor , style , styleText }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColor || colors.primary  } , style]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor || '#fff' } , styleText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: fonts.large,
    

  },
});

export default Button;
