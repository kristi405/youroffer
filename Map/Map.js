import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, MapStyle } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { useRef } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Location from 'expo-location';
import Modal from 'react-native-modal';

export const Map = ({ navigation }) => {
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
                <MapView style={styles.map} region={
                    location
                        ? {
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.03,
                            longitudeDelta: 0.03
                        } : undefined}>
                    <Marker onPress={() => setIsModalVisible(true)} pinColor="blue" title='Home' description='Hi andrey' coordinate={{ latitude: 52.2403025, longitude: 20.9947616 }}>
                        <Image source={require('../assets/pin.png')} style={styles.imageContainer} />
                    </Marker>
                    <Marker pinColor="blue" title='Home' description='Hi andrey' coordinate={{ latitude: 53.2403026, longitude: 20.9947617 }}>
                        <Image source={require('../assets/pin.png')} style={styles.imageContainer} />
                    </Marker>
                </MapView>
            ) : (
                <Text>{errorMsg || 'Waiting for location...'}</Text>
            )}
            <View style={styles.modal}>
                <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)} style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.stackWithButton}>
                            <View style={styles.modalStack}>
                                <Image source={require('../assets/444.jpg')} style={styles.image} />
                                <View style={styles.vetricalStack}>
                                    <Text style={styles.name}>My company</Text>
                                    <View style={styles.stack}>
                                        <Image source={require('../assets/mapIcon.png')} style={styles.mapIcon} />
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        width: '100%',
        height: '100%',
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
        width: 40,
        height: 50,
        tintColor: 'red',
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
  
  
  
  
  
  