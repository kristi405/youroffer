import React from "react";
import { StyleSheet, View, FlatList } from 'react-native';

const Circle = ({ size, color }) => (
    <View style={[styles.circle, { width: size, height: size, backgroundColor: color }]} />
)

export const PromotionView = (route) => {
    const item  = route?.data

    const circles = Array.from({ length: item.max_count }).map((_, index) => (
        <Circle key={index} size={44} color={index < item.use_count ? '#0EA47A' : 'white'} />
    ));

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatList}
                data={circles}
                numColumns={5}
                scrollEnabled={false}
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
        // flexDirection: 'row',
        backgroundColor: '#333333',
        borderRadius: 10,
    },
    containerForRow: {
        paddingHorizontal: 2,
        alignItems: 'flex-start',
    },
    circle: {
        borderRadius: 22,
        opacity: 0.8,
        margin: 10,
    },
    flatList: {
        width: '100%'
    },
})
