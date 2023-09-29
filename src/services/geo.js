import * as Location from 'expo-location';

const CAHCE = {}
const EARTH_RADIUS = 6371;  // Радиус Земли в километрах

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

export const distanceBetweenGeoPoints = (pointA, pointB) => {
    // Получаем координаты точек
    const lat1 = pointA.latitude;
    const lng1 = pointA.longitude;
    const lat2 = pointB.latitude;
    const lng2 = pointB.longitude;

    // Вычисляем расстояние по формуле Гаверсинусов
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = φ2 - φ1;
    const Δλ = (lng2 - lng1) * Math.PI / 180;

    // Вычисляем расстояние
    const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseInt(EARTH_RADIUS * c * 1000);
}

const getUserLocation = async () => {
    try {
        const location = await Location.getCurrentPositionAsync({});
        CAHCE.latitude = location.coords.latitude;
        CAHCE.longitude = location.coords.longitude;
        console.log(CAHCE)
        return CAHCE;
    } catch (error) {
        console.error(error);
        return
    }
};