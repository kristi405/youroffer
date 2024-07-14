import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Linking, TouchableWithoutFeedback } from 'react-native';
import MapView from "react-native-map-clustering";
import { Marker } from 'react-native-maps';
import { useState } from 'react';
import Modal from 'react-native-modal';
import { MAP_STYLE, getLocation, distanceBetweenGeoPoints } from '../../services/geo'
import { getRegion } from '../../services/auth'
import { FILE_URL } from '../../services/constants'
import { observer } from "mobx-react-lite"


let CURRENT_COORD;
// async function getCurrentCoordinates() {
//     CURRENT_COORD = await getLocation(false, 'start2')
// }
// getCurrentCoordinates()

export const BusinessPointOnMap = observer(({ navigation, route }) => {
    const [bp, setBp] = useState(route?.params?.data)
    const [selectedBp, setSelectedBp] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [regionCoord, setRegionCoord] = useState({
        latitude: 52.08943642679975,
        longitude: 23.72369655950971,
    });

    useEffect(() => {
        init()
    }, []);

    const init = async () => {
        CURRENT_COORD = await getLocation()
        const region = await getRegion()
        setRegionCoord({
            latitude: Number(region.lat),
            longitude: Number(region.lng),
        })
        setSelectedBp({
            ...bp,
            dist: CURRENT_COORD?.latitude && bp.lat ? distanceBetweenGeoPoints(
                {latitude: bp.lat, longitude: bp.lng},
                CURRENT_COORD
            ) : null
        })
    }


    const openDetail = (item) => {
        setIsModalVisible(false)
        // для того чтобы окно перерисовалось и модальное окно скрылось
        setTimeout(() => {
            navigation.navigate('CompanyProfile', { data: item })
        })
    }

    const workTime = (item) => {
        let workTime = '-'
        if (item.start_time && item.end_time) {
            const [start_h, start_m] = item.start_time.split(':')
            const [end_h, end_m] = item.end_time.split(':')
            workTime = `${start_h}:${start_m} - ${end_h}:${end_m}`
        }

        return workTime;
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

    const openDelivery = async (url) => {
        url = url?.trim();
        await Linking.openURL(url);
    }

    return (
        <View style={styles.container}>
            <MapView
                mapType="standard"
                userInterfaceStyle="dark"
                style={styles.map}
                showsUserLocation={CURRENT_COORD?.latitude ? true : false}
                customMapStyle={MAP_STYLE}
                tracksViewChanges={false}
                region={{
                    latitude: parseFloat(bp.lat),
                    longitude: parseFloat(bp.lng),
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}
                clusterColor='red'
                cluster={true}
                clusterRadius={80}
                minimumClusterSize={10}>
                <Marker
                    key={bp.id}
                    coordinate={{ latitude: parseFloat(bp.lat), longitude: parseFloat(bp.lng) }}
                    pinColor={'red'}
                    onPress={(e) => {
                        setIsModalVisible(true)
                    }}
                    tracksViewChanges={false}
                />
            </MapView>
            {selectedBp && <View style={styles.modal}>
                <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)} style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.stackWithButton}>
                            <View style={styles.modalStack}>
                                <Image source={{ uri: `${FILE_URL}${selectedBp.img}.${selectedBp.img_ext}` }} style={styles.image} />
                                <View style={styles.vetricalStack}>
                                    <Text style={styles.name}>{selectedBp.name}</Text>
                                    <View style={styles.stack}>
                                        <Image source={require('../../../assets/mapIcon.png')} style={styles.mapIcon} />
                                        <Text style={styles.distans}>{selectedBp.dist ? selectedBp.dist / 1000 : 'нет доступа'} {selectedBp.dist ? 'км' : ''}</Text>
                                    </View>
                                    <View style={styles.stack}>
                                        <Image source={require('../../../assets/time.png')} style={styles.timeIcon} />
                                        <Text style={styles.distans}>{workTime(selectedBp)}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.actionsView}>
                                <View style={styles.buttonPromotionBlock}>
                                    <TouchableOpacity style={styles.buttonStyle}   onPress={() => openDetail(selectedBp)}>
                                        <Text style={styles.showPromotionText}>Все акции</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonAdditionalBlock}>
                                    {
                                        selectedBp.instagram?.trim()
                                        ?   <TouchableWithoutFeedback style={styles.instagramBtn} onPress={() => {openInstagram(selectedBp.instagram)}}>
                                                <View>
                                                    <Image source={require('../../../assets/instagram3.png')} style={styles.instagramIcon} />
                                                </View>
                                            </TouchableWithoutFeedback>
                                        : null
                                    }
                                    {
                                        selectedBp.delivery_url?.trim()
                                        ?   <TouchableWithoutFeedback style={styles.deliveryBtn} onPress={() => {openDelivery(selectedBp.delivery_url)}}>
                                                <View  >
                                                    <Image source={require('../../../assets/delivery.png')} style={styles.deliveryIcon} />
                                                </View>
                                            </TouchableWithoutFeedback>
                                        : null
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>}
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    modalStack: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 25,
        paddingVertical: 15,
        gap: 20
    },
    vetricalStack: {
        width: '70%',
        height: 80,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    name: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        paddingTop: 7,
        marginBottom: 10,
    },
    stackWithButton: {
        alignItems: 'center',
        flexDirection: 'column',
        gap: 20
    },
    distans: {
        color: 'white',
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        opacity: 0.5,
        paddingTop: 5
    },
    imageContainer: {
        width: 20,
        height: 20,
        tintColor: 'blue',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        opacity: 0.8
    },
    modal: {
        justifyContent: 'flex-end',
        paddingBottom: 60,
        paddingHorizontal: 10,
        margin: 0,
    },
    modalContainer: {
        flexDirection: 'column',
        backgroundColor: 'black',
        height: 200,
        borderRadius: 20,
        gap: 10
    },
    separator: {
        height: 1,
        width: '95%',
        backgroundColor: 'white',
        opacity: 0.2,
    },
    stack: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mapIcon: {
        width: 17,
        height: 25,
        tintColor: '#0EA47A',
    },
    timeIcon: {
        marginTop: 5,
        width: 15,
        height: 15,
        tintColor: '#0EA47A',
    },
    marker: {
    },
    showPromotionText: {
        fontSize: 13,
        color: '#CCC',
        fontWeight: '600'
    },
    buttonStyle: {
        height: 40,
        borderRadius: 10,
        backgroundColor: '#0EA47A',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10
    },
    instagramIcon: {
        marginTop: 10,
        width: 40,
        height: 40,
        opacity: 0.8
    },
    deliveryIcon: {
        width: 30,
        height: 30,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    actionsView: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingRight: 10,
        paddingLeft: 10
    },
    buttonPromotionBlock: {
        width: '60%',
    },
    buttonAdditionalBlock: {
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
})