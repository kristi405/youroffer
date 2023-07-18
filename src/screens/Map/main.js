import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import MapView from "react-native-map-clustering";
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { useRef } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Location from 'expo-location';
import Modal from 'react-native-modal';

export const Map = ({ navigation }) => {
    const markers = [
        { id: 0, coordinates: { latitude: 52.2503026, longitude: 20.9947617 } },
        { id: 1, coordinates: { latitude: 52.2402027, longitude: 20.9847620 } },
        { id: 2, coordinates: { latitude: 52.2835028, longitude: 20.9647620 } },
        { id: 3, coordinates: { latitude: 52.2335028, longitude: 20.9647620 } },
        { id: 4, coordinates: { latitude: 52.2135028, longitude: 20.9447620 } },
        { id: 5, coordinates: { latitude: 52.2865028, longitude: 21.0047620 } },
        { id: 6, coordinates: { latitude: 52.2815028, longitude: 21.0547620 } },
        { id: 7, coordinates: { latitude: 52.2535028, longitude: 21.0747620 } },
        { id: 8, coordinates: { latitude: 52.2235028, longitude: 21.0447620 } },
        { id: 9, coordinates: { latitude: 52.2135028, longitude: 21.0347620 } },
        { id: 10, coordinates: { latitude: 52.2035028, longitude: 21.0117620 } },
        { id: 11, coordinates: { latitude: 52.2012028, longitude: 21.0297620 } },
        { id: 12, coordinates: { latitude: 52.1735028, longitude: 21.0347620 } },
        { id: 13, coordinates: { latitude: 52.1735028, longitude: 21.0207620 } },
        { id: 14, coordinates: { latitude: 52.1635028, longitude: 21.0507620 } },
        { id: 15, coordinates: { latitude: 52.1635028, longitude: 20.9997620 } },
    ];

    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const mapViewRef = useRef(null);
    const warsawRegion = {
        latitude: 52.2403025,
        longitude: 20.9947616,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    }
    const goToWarszaw = () => {
        mapViewRef.current.animateToRegion(warsawRegion, 3000)
    }

    useEffect(() => {
        async function getLocationAsync() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let { coords } = await Location.getCurrentPositionAsync({});
            setLocation(coords);
        }

        getLocationAsync();
    }, []);

    return (
        <View style={styles.container}>
            {location ? (
                <MapView style={styles.map} provider={PROVIDER_GOOGLE} region={
                    location
                        ? {
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.03,
                            longitudeDelta: 0.03
                        } : undefined}
                    clusterColor='red'
                    cluster={true}
                    clusterRadius={80}
                    minimumClusterSize={10}>
                    <Marker pinColor="blue" coordinate={location}>
                        <Image source={require('../../../assets/pin.png')} style={styles.imageContainer} />
                    </Marker>
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={marker.coordinates}
                            pinColor='red'
                            onPress={(e) => setIsModalVisible(true)}
                            tracksViewChanges={false}
                        />
                    ))}
                </MapView>
            ) : (
                <Text>{errorMsg || 'Waiting for location...'}</Text>
            )}
            <View style={styles.modal}>
                <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)} style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.stackWithButton}>
                            <View style={styles.modalStack}>
                                <Image source={require('../../../assets/333.webp')} style={styles.image} />
                                <View style={styles.vetricalStack}>
                                    <Text style={styles.name}>My company</Text>
                                    <View style={styles.stack}>
                                        <Image source={require('../../../assets/mapIcon.png')} style={styles.mapIcon} />
                                        <Text style={styles.distans}>500 м</Text>
                                    </View>
                                    <View style={styles.separator} />
                                </View>
                            </View>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.showPromotionText}>Посмотреть на карте</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
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
        color: 'black',
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





