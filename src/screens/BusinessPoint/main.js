import React from "react";
import { StyleSheet, View, Image, Text } from 'react-native';
import { Coupons } from "../PromotionsList/components/Coupons";
import { FILE_URL } from '../../services/constants'
import { observer } from "mobx-react-lite"

export const CompanyProfile = observer(({ navigation, route }) => {
    const item = route?.params?.data
    let workTime = '-'

    if (item.start_time && item.end_time) {
        const [start_h, start_m] = item.start_time.split(':')
        const [end_h, end_m] = item.end_time.split(':')
        workTime = `${start_h}:${start_m} - ${end_h}:${end_m}`
    }


    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image source={{ uri: `${FILE_URL}${item.img}.${item.img_ext}` }} style={styles.image} />
                <View style={styles.descriptionView}>
                    <Text style={styles.nameStyle}>{item.name} </Text>
                    <View style={styles.stack}>
                        <Image source={require('../../../assets/time.png')} style={styles.clock} />
                        <Text style={styles.time}>{workTime}</Text>
                    </View>
                    {item.dist && <View style={styles.stack}>
                        <Image source={require('../../../assets/mapIcon.png')} style={styles.map} />
                        <Text style={styles.time}> {item.dist / 1000} км </Text>
                    </View>}
                </View>
            </View>
            <Text style={styles.description}>{item.description}</Text>
            <Coupons navigation={navigation} isCompanyPromotions={true} businessPointId={item.id} />
        </View>
    )
})

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
        color: '#FFF',
        fontSize: 13,
        opacity: 1,
        textAlign: 'left'
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