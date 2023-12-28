import React from "react";
import { StyleSheet, View, FlatList, Image } from 'react-native';

export const PromotionView = (route) => {
    const item = route?.data

    const CircleView = ({source}) => {
        if (source) {
            return (<Image source={source} style={styles.image} />)
        }
        return (<View style={styles.image}></View>);
    }

    const Circle = ({ size, color, source }) => {
        return (
            <View style={[styles.circle, { width: size, height: size, backgroundColor: color }]}>
                <CircleView  source={source}/>
            </View>
        )
    }

    const circles = Array.from({ length: item.max_count + 1 }).map((_, index) => (
        <Circle
            key={index}
            source={index == item.max_count ? require('../../../../assets/gift.png') : null}
            size={40}
            color={index < item.use_count ? '#0EA47A' : 'white' && index == item.max_count ? 'clear' : 'white'}
        />
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
        paddingHorizontal: '1.5%',
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
