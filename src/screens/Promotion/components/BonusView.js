import React from "react";
import { StyleSheet, View, Text, Image } from 'react-native';

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
        <View>
            <Text style={styles.text}>* при покупке сообщите что у вас есть бонусы</Text>
            <View style={styles.container}>

                {
                    Array.from({ length: item.bonuses }).map((_, index) => (
                        <Circle
                            key={index}
                            source={require('../../../../assets/bonus1.png')}
                            size={35}
                        />
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 13,
        color: '#fff',
        paddingBottom: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#333333',
        borderRadius: 10,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        paddingHorizontal: 10
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
        width: 40,
        height: 40,
    },
    flatList: {
        width: '100%'
    },
})