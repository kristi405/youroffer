import React from "react";
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Alert} from 'react-native';
import {Keyboard} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Coupon } from "./Coupon";

export const Coupon = ({navigation}) => {
    return (
        <NavigationContainer>
          <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Coupon') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Coupon') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
             <Tab.Screen name="Coupon" component={Coupon} />
             {/* <Tab.Screen name="Coupon" component={Coupon} /> */}
          </Tab.Navigator>
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