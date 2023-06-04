import React from "react";
import { StyleSheet, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CouponScreen } from "./CouponScreen";
import { CompanyScreen } from "./CompanyScreen";
import { Map } from "../Map/Map";
import { Profile } from "../Profile/Profile";

const Tab = createBottomTabNavigator();

export const TabBar = ({ navigation }) => {
  return (
    <Tab.Navigator screenOptions = {{tabBarStyle: styles.tabBar, tabBarActiveTintColor: '#0EA47A'}}>
      <Tab.Screen name="Акции" component={CouponScreen} options={{
        tabBarIcon: ({focused}) => {
          return (
            <View>
              <Image
                source= {focused ? require('../assets/couponIconSelected.png') : require('../assets/couponIcon.png')}
                resizeMode="contain"
                style={{ width: 25 }}
              /> 
            </View>
          );
        },
      headerShown: false}} />
      <Tab.Screen name="Компании" component={CompanyScreen} options={{
        tabBarIcon: ({ focused }) => {
          return (
            <View>
              <Image
                source={focused ? require('../assets/companyIconSelected.png') : require('../assets/companyIcon.png')}
                resizeMode="contain"
                style={{ width: 25 }}
              />
            </View>
          );
        },
      headerShown: false}} />
      <Tab.Screen name="Карта" component={Map} options={{
        tabBarIcon: ({ focused }) => {
          return (
            <View>
              <Image
                source={focused ? require('../assets/mapIconSelected.png') : require('../assets/mapIcon.png')}
                resizeMode="contain"
                style={{ width: 25 }}
              />
            </View>
          );
        },
      headerShown: false}} />
      <Tab.Screen name="Профиль" component={Profile} options={{
        tabBarIcon: ({ focused }) => {
          return (
            <View>
              <Image
                source={focused ? require('../assets/profileSelected.png') : require('../assets/profile.png')}
                resizeMode="contain"
                style={{ width: 25 }}
              />
            </View>
          );
        },
      headerShown: false}} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'black',
    borderTopColor: '#434343',
  }
})