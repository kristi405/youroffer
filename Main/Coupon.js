import React from "react";
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Alert} from 'react-native';
import {Keyboard} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export const Coupon = ({navigation}) => {
    return (
        <NavigationContainer>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style = {styles.container}>

             </View>
          </TouchableWithoutFeedback>
        </NavigationContainer>
    )
}  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'red',
        paddingTop: 80
    }
})