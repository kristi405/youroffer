import React from "react";
import { StyleSheet, View, FlatList, Text, Image } from 'react-native';

export const PromotionView = (route) => {
    const item = route?.data

    const Circle = ({ size, color, source }) => (
        <View style={[styles.circle, { width: size, height: size, backgroundColor: color }]}>
            <Image source={source} style={styles.image} />
        </View>
    )

    const circles = Array.from({ length: item.max_count + 1 }).map((_, index) => (
        <Circle key={index} source={index == item.max_count ? require('../../../../assets/gift.png') : null} size={48} 
        color={index < item.use_count ? '#0EA47A' : 'white' && index == item.max_count ? 'clear' : 'white'} />
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
        backgroundColor: '#333333',
        borderRadius: 10,
    },
    containerForRow: {
        paddingHorizontal: 2,
        alignItems: 'flex-start',
    },
    circle: {
        borderRadius: 24,
        opacity: 0.8,
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 50,
        height: 48,
    },
    flatList: {
        width: '100%'
    },
})
