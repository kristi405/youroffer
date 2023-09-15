import * as Location from 'expo-location';

const CAHCE = {}

export const getLocation = async () => {
    if (CAHCE.latitude && CAHCE.longitude) {
       return CAHCE
    }
    const status = await Location.requestForegroundPermissionsAsync();
    if (status.status == 'granted') {
        return await getUserLocation()
    } else {
        return;
    }
};

const getUserLocation = async () => {
    try {
        const location = await Location.getCurrentPositionAsync({});
        CAHCE.latitude = location.coords.latitude;
        CAHCE.longitude = location.coords.longitude;
        console.log(`Latitude: ${CAHCE.latitude}, Longitude: ${CAHCE.longitude}`);
        return CAHCE;
    } catch (error) {
        console.error(error);
        return
    }
};