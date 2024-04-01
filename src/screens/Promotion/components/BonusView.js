import React from "react";
import { StyleSheet, View, FlatList, Image } from 'react-native';

export const BonusView = (route) => {
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

    return (
        <View style={styles.container}>
            {
                Array.from({ length: 8 }).map((_, index) => (
                    <Circle
                        key={index}
                        source={require('../../../../assets/bonus.png')}
                        size={40}
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
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        paddingHorizontal: 20
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
        width: 25,
        height: 25,
    },
    flatList: {
        width: '100%'
    },
})