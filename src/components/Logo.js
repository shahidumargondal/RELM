import React from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';

const Logo = ({ src, style }) => {
    return <View>
        <Image source={src || require("../../assets/black_logo.png")} style={style || styles.logo} /></View>
};

const styles = StyleSheet.create({
    logo: {
        height: 150, width: 200, resizeMode: 'contain', marginTop: 10,
        
    },
});

export default Logo;
