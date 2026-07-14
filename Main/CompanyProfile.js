import React from "react";
import { TouchableWithoutFeedback, StyleSheet, View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export const CompanyProfile = ({navigation, route}) => {
    return (
       <View>
         <Text>route.params.data.name</Text>
       </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
    },
})

