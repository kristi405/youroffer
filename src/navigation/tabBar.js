import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CouponScreen } from "../screens/PromotionsList/main";
import { CompanyScreen } from "../screens/BusinessPointsList/main";
import { Map } from "../screens/Map/main";
import { Profile } from "../screens/Profile/main";
import { Scan } from "../screens/QrCodeScan/main";
import UserStore from '../stores/user'
import { ManagerScreen } from '../screens/Manager/main';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

function ScanStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ManagerScreen"
                component={ManagerScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Scan"
                component={Scan}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

const images = {
    coupon: require("../../assets/homeIcon.png"),
    company: require("../../assets/homeIcon.png"),
    map: require("../../assets/mapIcon2.png"),
    profile: require("../../assets/profileIcon.png"),
    couponSelected: require("../../assets/couponIconSelected.png"),
    companySelected: require("../../assets/companyIconSelected.png"),
    mapSelected: require("../../assets/mapIcon2.png"),
    profileSelected: require("../../assets/profileIcon.png"),
    scan: require("../../assets/scan.png"),
    scanSelected: require("../../assets/scanSelected.png"),
    sailIcon: require("../../assets/sailIcon4.png"),
    sailIconSelected: require("../../assets/sailIcon4.png"),
    // #939393
};

const TabBarImage = ({ focused, imgName }) => {
    return (
        <View>
            <Image
                source={images[imgName]}
                resizeMode="contain"
                tintColor={focused ? '#0EA47A' : '#939393'}
                style={{ width: 25 }}
            />
        </View>
    );
}

export const TabBar = () => {
    const [isShowScan, setIsShowScan] = useState(false);

    useEffect(() => {
        setTimeout(async () => {
            let user = await UserStore.getUser()
            setIsShowScan(user.role == 'admin' || user.role == 'manager' ? true : false)
        }, 300)
    })

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
                    tabBarIcon: ({ focused }) => (
                        <TabBarImage
                            focused={focused}
                            imgName={'sailIcon'}
                        />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Заведения"
                component={CompanyScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabBarImage
                            focused={focused}
                            imgName={'coupon'}
                        />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Карта"
                component={Map}
                options={{
                    tabBarIcon: ({ focused }) => (
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
                    tabBarIcon: ({ focused }) => (
                        <TabBarImage
                            focused={focused}
                            imgName={'profile'}
                        />
                    ),
                    headerShown: false
                }}
            />
            {isShowScan && (
                <Tab.Screen
                    name="Скан"
                    component={Scan}
                    visible={isShowScan}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <TabBarImage
                                focused={focused}
                                imgName={'scan'}
                            />
                        ),
                        headerShown: false,
                    }} />
            )}
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: 'black',
        borderTopColor: '#434343',
    }
})