import React from "react";
import { StyleSheet, View, Image, Text } from 'react-native';
import { Coupons } from "../PromotionsList/components/Coupons";
import { FILE_URL } from '../../services/constants'

export const CompanyProfile = ({ navigation, route }) => {
    const item = route?.params?.data

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image source={{ uri: `${FILE_URL}${item.img}.${item.img_ext}` }} style={styles.image} />
                <View style={styles.descriptionView}>
                    <Text style={styles.nameStyle}>{item.name} </Text>
                    <View style={styles.stack}>
                        <Image source={require('../../../assets/time.png')} style={styles.clock} />
                        <Text style={styles.time}> 9:00 - 22:00</Text>
                    </View>
                    {item.dist && <View style={styles.stack}>
                        <Image source={require('../../../assets/mapIcon.png')} style={styles.map} />
                        <Text style={styles.time}> {item.dist / 1000} км </Text>
                    </View>}
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </View>
            <Coupons navigation={navigation} isCompanyPromotions={true} businessPointId={item.id} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 15,
        paddingTop: 10,
        alignItems: 'flex-start',
        backgroundColor: 'black',
        gap: 15,
    },
    profile: {
        width: '100%',
        flexDirection: 'row',
        gap: 20,
        paddingBottom: 15,
        paddingLeft: 5
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 50,
        opacity: 0.9
    },
    descriptionView: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        paddingRight: 10,
        gap: 5
    },
    description: {
        color: 'white',
        fontSize: 13,
        opacity: 0.5
    },
    stack: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    map: {
        width: 16,
        height: 24,
        tintColor: '#0EA47A',
    },
    nameStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0EA47A',
    },
    clock: {
        width: 14,
        height: 14,
    },
    time: {
        color: 'white',
        paddingLeft: 5,
        paddingTop: 3,
        opacity: 0.5
    },
})