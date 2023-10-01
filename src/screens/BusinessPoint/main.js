import React from "react";
import { StyleSheet, View, Image, Text } from 'react-native';
import { Coupons } from "../PromotionsList/components/Coupons";

export const CompanyProfile = ({ navigation, route }) => {
    const item = route?.params?.data

    const openDetail = item => {
        navigation.navigate('CouponDetailScreen', {data: item})
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image source={{ uri: `http://31.220.77.203:8888/api/v1/file/${item.img}.${item.img_ext}`}} style={styles.image} />
                <View style={styles.descriptionView}>
                    <Text style={styles.nameStyle}>{item.name} </Text>
                    <View style={styles.stack}>
                        <Image source={require('../../../assets/time.png')} style={styles.clock} />
                        <Text style={styles.time}> 9:00 - 22:00</Text>
                    </View>
                    <View style={styles.stack}>
                        <Image source={require('../../../assets/mapIcon.png')} style={styles.map} />
                        <Text style={styles.time}> 500 m </Text>
                    </View>
                    <Text style={styles.description}>Мы специализируемся на французской кухне, у нам большая винная карта. Также по выходным мы проводим закрытые мероприятия. Тел. +375(29)1234567 </Text>
                </View>
            </View>
            <Coupons openDetail={openDetail} isCompanyPromotions={true} businessPointId={item.id}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 10,
        paddingTop: 5,
        alignItems: 'flex-start',
        backgroundColor: 'black',
        gap: 15,
    },
    profile: {
        width: '100%',
        flexDirection: 'row',
        gap: 20,
        paddingBottom: 15
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
        width: 14,
        height: 22,
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