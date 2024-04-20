import React from "react";
import { StyleSheet, View, FlatList, Image } from 'react-native';

export const PromotionView = (route) => {
    const item = route?.data

    const CircleView = ({source}) => {
        if (source) {
            console.log('222222', item)
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

    return (
        <View style={styles.container}>
            {
                Array.from({ length: item.max_count + 1 }).map((_, index) => (
                    <Circle
                        key={index}
                        source={index == item.max_count && item.type == 'accumulative' ? require('../../../../assets/bonus1.png') : null}
                        size={25}
                        color={index < item.use_count ? '#0EA47A' : 'white' && index == item.max_count ? 'clear' : 'white'}
                    />
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333333',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%'
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
        width: 35,
        height: 35,
    },
    flatList: {
        width: '100%'
    },
})
