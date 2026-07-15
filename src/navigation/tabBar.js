import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import { CouponScreen } from "../screens/PromotionsList/main";
import { CompanyScreen } from "../screens/BusinessPointsList/main";
import { Map } from "../screens/Map/main";
import { Profile } from "../screens/Profile/main";
import { Scan } from "../screens/QrCodeScan/main";
import { BonusCard } from "../screens/BonusCard/main";
import UserStore from '../stores/user'
import { ManagerScreen } from '../screens/Manager/main';
import { COLORS } from '../services/constants'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

// На iOS 26 нативный контейнер react-native-screens добавляет анимацию
// при переключении табов. createNativeStackNavigator от этого флага
// не зависит, поэтому здесь можно отключить screens только для таб-бара.
enableScreens(false);

const TAB_FADE_DURATION = 200;

const withFadeTransition = (ScreenComponent) => (props) => {
    const isFocused = useIsFocused();
    const opacity = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: isFocused ? 1 : 0,
            duration: TAB_FADE_DURATION,
            useNativeDriver: true,
        }).start();
    }, [isFocused]);

    return (
        <Animated.View style={{ flex: 1, opacity }}>
            <ScreenComponent {...props} />
        </Animated.View>
    );
};

const FadeCouponScreen = withFadeTransition(CouponScreen);
const FadeCompanyScreen = withFadeTransition(CompanyScreen);
const FadeMap = withFadeTransition(Map);
const FadeProfile = withFadeTransition(Profile);
const FadeScan = withFadeTransition(Scan);

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
    scan: require("../../assets/qrScanIcon.png"),
    scanSelected: require("../../assets/qrScanIcon.png"),
    sailIcon: require("../../assets/sailIcon4.png"),
    sailIconSelected: require("../../assets/sailIcon4.png"),
    bonusCard: require("../../assets/bonusCard.png"),
    // #939393
};

const TabBarImage = ({ focused, imgName }) => {
    return (
        <View>
            <Image
                source={images[imgName]}
                resizeMode="contain"
                tintColor={focused ? COLORS.primaryDark : COLORS.textSecondary}
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
                tabBarActiveTintColor: COLORS.primaryDark
            }}>
            <Tab.Screen
                name="Акции"
                component={FadeCouponScreen}
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
                name="Компании"
                component={FadeCompanyScreen}
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
            {/* <Tab.Screen
                name="Мои карты"
                component={BonusCard}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabBarImage
                            focused={focused}
                            imgName={'bonusCard'}
                        />
                    ),
                    headerShown: false
                }}
            /> */}
            <Tab.Screen
                name="Карта"
                component={FadeMap}
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
                component={FadeProfile}
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
                    component={FadeScan}
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