import React from "react";
import { StyleSheet, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CouponScreen } from "../screens/PromotionsList/main";
import { CompanyScreen } from "../screens/BusinessPointsList/main";
import { Map } from "../screens/Map/main";
import { Profile } from "../screens/Profile/main";

const Tab = createBottomTabNavigator();

const images = {
    coupon: require("../../assets/couponIcon.png"),
    company: require("../../assets/companyIcon.png"),
    map: require("../../assets/mapIcon.png"),
    profile: require("../../assets/profile.png"),
    couponSelected: require("../../assets/couponIconSelected.png"),
    companySelected: require("../../assets/companyIconSelected.png"),
    mapSelected: require("../../assets/mapIconSelected.png"),
    profileSelected: require("../../assets/mapIconSelected.png"),
};

const TabBarImage = ({focused, imgName}) => {
    return (
        <View>
            <Image
                source= {images[focused ? imgName + 'Selected' : imgName]}
                resizeMode="contain"
                style={{ width: 25 }}
            />
        </View>
    );
}

export const TabBar = () => {
  return (
    <Tab.Navigator
        screenOptions={{
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: '#0EA47A'
        }}>
        <Tab.Screen
            name="Акции"
            component={CouponScreen}
            options={{
                tabBarIcon: ({focused}) => (
                    <TabBarImage
                        focused={focused}
                        imgName={'coupon'}
                    />
                ),
                headerShown: false
            }}
        />
        <Tab.Screen
            name="Компании"
            component={CompanyScreen}
            options={{
                tabBarIcon: ({focused}) => (
                    <TabBarImage
                        focused={focused}
                        imgName={'company'}
                    />
                ),
                headerShown: false
            }}
        />
        <Tab.Screen
            name="Карта"
            component={Map}
            options={{
                tabBarIcon: ({focused}) => (
                    <TabBarImage
                        focused={focused}
                        imgName={'map'}
                    />
                ),
                headerShown: false
            }}
        />
        <Tab.Screen
            name="Профиль"
            component={Profile}
            options={{
                tabBarIcon: ({focused}) => (
                    <TabBarImage
                        focused={focused}
                        imgName={'profile'}
                    />
                ),
                headerShown: false
            }}
        />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'black',
    borderTopColor: '#434343',
  }
})