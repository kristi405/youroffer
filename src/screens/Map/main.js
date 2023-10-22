import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import MapView from "react-native-map-clustering";
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useState } from 'react';
import Modal from 'react-native-modal';
import BusinessPointsStore from "../../stores/businessPoints";
import { MAP_STYLE } from "../../services/geo"
import { getLocation } from '../../services/geo'

export const Map = ({ navigation }) => {
    const [selectedBp, setSelectedBp] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const location = getLocation()._j

    const openDetail = (item) => {
        setIsModalVisible(false)
        setSelectedBp(null)
        // для того чтобы окно перерисовалось и модальное окно скрылось
        setTimeout(() => {
            navigation.navigate('CompanyProfile', { data: item })
        })
    }

    return (
        <View style={styles.container}>
            <MapView
                mapType="standard"
                userInterfaceStyle="dark"
                style={styles.map}
                showsUserLocation={true}
                customMapStyle={MAP_STYLE}
                provider={PROVIDER_GOOGLE}
                tracksViewChanges={false}
                region={{
                    // TODO: добавить регионы (пока только брест)
                    latitude: location ? location.latitude : 52.08943642679975,
                    longitude: location ? location.longitude : 23.72369655950971,
                    latitudeDelta: 0.3,
                    longitudeDelta: 0.3,
                }}
                clusterColor='red'
                cluster={true}
                clusterRadius={80}
                minimumClusterSize={10}>
                    {BusinessPointsStore.all.map((bp) => (
                        <Marker
                            key={bp.id}
                            coordinate={{ latitude: parseFloat(bp.lat), longitude: parseFloat(bp.lng) }}
                            pinColor={'red'}
                            onPress={(e) => {
                                setSelectedBp(bp)
                                setIsModalVisible(true)
                            }}
                            tracksViewChanges={false}
                        />
                    ))}
                </MapView>
            {selectedBp && <View style={styles.modal}>
                <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)} style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.stackWithButton}>
                            <View style={styles.modalStack}>
                                <Image source={{ uri: `http://62.171.164.180:8888/api/v1/file/${selectedBp.img}.${selectedBp.img_ext}` }} style={styles.image} />
                                <View style={styles.vetricalStack}>
                                    <Text style={styles.name}>{selectedBp.name}</Text>
                                    {selectedBp.dist && <View style={styles.stack}>
                                        <Image source={require('../../../assets/mapIcon.png')} style={styles.mapIcon} />
                                        <Text style={styles.distans}>{selectedBp.dist} m</Text>
                                    </View>}
                                    <View style={styles.separator} />
                                </View>
                            </View>
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => openDetail(selectedBp)}>
                                <Text style={styles.showPromotionText}>Посмотреть</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    modalStack: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 15,
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
        fontSize: 18,
        fontWeight: 'bold'
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
        paddingTop: 10
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
        width: '100%',
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
    },
    marker: {
    },
    showPromotionText: {
        fontSize: 13,
        color: '#CCC',
        fontWeight: '600'
    },
    buttonStyle: {
        width: '60%',
        height: 40,
        borderRadius: 10,
        backgroundColor: '#0EA47A',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
})





