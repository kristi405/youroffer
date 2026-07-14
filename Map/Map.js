import React from "react";
import { StyleSheet, View, Text, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { useRef } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Location from 'expo-location';

export const Map = ({ navigation }) => {
    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
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
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    return (
        <View style={styles.container}>
            {location ? (
                <MapView provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={{ warsawRegion }}>
                    <Marker pinColor="blue" title='Home' description='Hi andrey' coordinate={{ latitude: 52.2403025, longitude: 20.9947616 }}>
                        <Image source={require('../assets/pin.png')} style={styles.imageContainer} />
                    </Marker>
                    <Marker pinColor="blue" title='Home' description='Hi andrey' coordinate={{ latitude: 53.2403026, longitude: 20.9947617 }}>
                        <Image source={require('../assets/pin.png')} style={styles.imageContainer} />
                    </Marker>
                </MapView>
            ) : (
                <Text>{errorMsg || 'Waiting for location...'}</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        width: 40,
        height: 50,
        tintColor: 'red',
    },
    marker: {
    }
})