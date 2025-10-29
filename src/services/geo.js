import * as Location from 'expo-location';
// import * as Sentry from 'sentry-expo';
import { Alert, Linking } from 'react-native';

let CAHCE = null
const EARTH_RADIUS = 6371;  // Радиус Земли в километрах
let SHOW_FORCE_ALERT = true
let ALREADY_ASKED = false
let STATUS = null

export const requestGeoPermissions = async () => {
  STATUS = await Location.requestForegroundPermissionsAsync();
}

export const getLocation = async (update) => {
    // так как мы пытаемся получить геолокацию на разных экранах нам нужно проверять не запросили ли мы уже геолокацию
    if (ALREADY_ASKED && CAHCE?.latitude && CAHCE?.longitude) return CAHCE;
    ALREADY_ASKED = true;
    if (update) CAHCE = null
    if (CAHCE?.latitude && CAHCE?.longitude) return CAHCE



    setTimeout(() => {
      ALREADY_ASKED = false
    }, 1000)
    // Если мы пытаемся обновить экра с компаниями и у нас нет доступа к голокации - мы спрашиваем доступ
    if (STATUS.canAskAgain === false && SHOW_FORCE_ALERT && update) {
      Alert.alert('', "Чтобы мы могли показать вам ближайшие заведения, включите геолокацию",
      [
          {
            text: 'ОК',
            onPress: () => {
              SHOW_FORCE_ALERT = false
              Linking.openSettings();

            },
            style: 'cancel',
          },
      ])
    }

    if (STATUS.status == 'granted') {
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
        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        CAHCE = {}
        CAHCE.latitude = location.coords.latitude;
        CAHCE.longitude = location.coords.longitude;
        return CAHCE;
    } catch (e) {
        // Sentry.Native.captureException(e, (scope) => {
        //   scope.setTransactionName('service:geo:getUserLocation');
        //   return scope;
        // });
        console.error(e);
        return
    }
};

export const MAP_STYLE = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8ec3b9"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1a3646"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#64779e"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#334e87"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6f9ba5"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3C7680"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#304a7d"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c6675"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#255763"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b0d5ce"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3a4762"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0e1626"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#4e6d70"
        }
      ]
    }
  ]