import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../components/Button';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import { color } from 'react-native-elements/dist/helpers';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icons

const ProfileHeader = ({ user }) => {
    return (
        <View style={styles.container}>
            <Image source={user.image} style={styles.profileImage} />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.garageInfo}>Cars in garage: <Text style={styles.garageCount}>{user.garageCount}</Text></Text>
            {/* <View style={styles.buttons}>
                <Button style={[styles.editButton, styles.view]} textColor={colors.black} title="View" />
                <Button style={styles.editButton} textColor={colors.black} title="Edit" />
            </View> */}
            <View style={styles.buttons}>
                <TouchableOpacity style={[styles.editButton , styles.view]} >
                    <Icon name="visibility" size={24} color={colors.black} />
                    <Text style={styles.buttonText}>View</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.editButton} >
                    <Icon name="edit" size={24} color={colors.white} />
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
        marginTop: 50,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
    },
    garageInfo: {
        fontSize: fonts.medium,
        color: colors.greyText,
        marginVertical: 5,
    },
    garageCount: {
        fontSize: fonts.large,
        fontWeight: '500',
        color: colors.black,
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        width: '100%'
    },
    editButton: {
        // width : '50%',
        flex: 1,
        flexDirection : 'row',
        marginLeft: 2,
        marginRight: 2,
        borderRadius: 10,
        height : 45,
        justifyContent : 'center',
        alignItems : 'center',
        // maxHeight : 30,
        fontSize: fonts.small,
        backgroundColor : colors.primary
    },
    view: {
        marginRight: 10,
        backgroundColor: colors.gray,
    },
    buttonText : 
    {
        marginLeft : 5,
    }
});

export default ProfileHeader;
