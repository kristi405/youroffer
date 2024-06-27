import React, { useCallback } from "react";
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback, Linking, Share, Alert } from 'react-native';
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

    const openInstagram = async (url) => {
        url = url.trim();
        instagram = url.split('?')[0];
        instagram = instagram.replace("https://", '')
        instagram = instagram.replace("www.", '')
        instagram = instagram.replace("instagram.com/", '')
        instagram = instagram.replace("/", '')
        if (instagram) {
            try {
                await Linking.openURL(`instagram://user?username=${instagram}`)
            } catch (e) {
                await Linking.openURL(url)
            }
        }
    };
    const OpenInstagramButton = ({ instagram }) => {
        if (instagram?.trim()) {
            return (
                <TouchableWithoutFeedback onPress={() => {openInstagram(instagram)}}>
                    <View style={styles.instagramBtn}>
                        <Image source={require('../../../assets/instagram3.png')} style={styles.instagramIcon} />
                        <Text style={styles.link}>Перейти в Instagram</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    };

    const openWebsite = async (url) => {
        url = url?.trim();
        await Linking.openURL(url)
    };

    const OpenURLButton = ({ website, text, delivery }) => {
        if (website) {
            return (
                <TouchableWithoutFeedback onPress={() => {openWebsite(website)}}>
                    <View style={styles.websiteBtn}>
                        <Image source={delivery ? require('../../../assets/delivery.png') : require('../../../assets/website2.png')} style={styles.websiteIcon} />
                        <Text style={styles.link}>{text ? text : 'Перейти на сайт'}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    };

    const openMap = () => {
        navigation.navigate('BusinessPointOnMap', { data: item, name: item.name })
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
                    {item.instagram && <View style={styles.stack}>
                        <OpenInstagramButton instagram={item.instagram} />
                    </View>}
                    {item.dist && <View style={styles.stack}>
                        <Image source={require('../../../assets/mapIcon.png')} style={styles.map} />
                        <Text style={styles.time}> {item.dist / 1000} км </Text>
                    </View>}
                    {item.website && <View style={styles.stack}>
                        <OpenURLButton text="Заказать доставку" website={item.website}  delivery={true}/>
                    </View>}
                    {item.website &&  <View style={styles.stack}>
                        <OpenURLButton website={item.website} text='Перейти на сайт' delivery={false}/>
                    </View>}
                </View>
            </View>
            <TouchableWithoutFeedback onPress={() => { openMap() }}>
                <View style={styles.stack}>
                    <Image source={require('../../../assets/mapIcon.png')} style={styles.map} />
                    <Text style={styles.address}>{item.address}</Text>
                </View>
            </TouchableWithoutFeedback>

            {item.description && (<Text style={styles.description}>{item.description}</Text>)}
            <Coupons style={styles.listView} navigation={navigation} isCompanyPromotions={true} businessPointId={item.id} />
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
        textAlign: 'left',
    },
    address: {
        fontSize: 14,
        color: '#0EA47A',
        paddingHorizontal: 10,
        textDecorationLine: 'underline',
        opacity: 0.9,
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
    link: {
        color: '#FFF',
        textDecorationLine: 'underline',
        paddingLeft: 5,
        paddingTop: 3,
        opacity: 0.6
    },
    instagramBtn: {
        marginLeft: -3,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    websiteBtn: {
        marginLeft: -2,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    instagramIcon: {
        width: 20,
        height: 20,
        opacity: 0.8
    },
    websiteIcon: {
        width: 20,
        height: 20,
        opacity: 0.5
    }
})