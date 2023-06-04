import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Circle = ({ size }) => (
    <View style={[styles.circle, { width: size, height: size }]} />
)

export const PromotionView = ({ navigation, route }) => {
    const circles = Array.from({ length: 10 }).map((_, index) => (
        <Circle key={index} size={44} />
    ));

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatList}
                data={circles}
                numColumns={5}
                renderItem={({ item }) =>
                    <View style={styles.containerForRow}>
                        {item}
                    </View>
                }>
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        height: 130,
        backgroundColor: '#333333',
        borderRadius: 10,
    },
    containerForRow: {
        flex: 1,
        alignItems: 'center',
    },
    circle: {
        borderRadius: 22,
        backgroundColor: 'white',
        opacity: 0.8,
        margin: 10,
    },
    flatList: {
        width: '100%'
    },
})
