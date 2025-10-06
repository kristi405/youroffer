import React, {useEffect, useMemo} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Linking, TextInput, Keyboard, SafeAreaView } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import MapView from "react-native-map-clustering";
import { Marker } from 'react-native-maps';
import { useState } from 'react';
import Modal from 'react-native-modal';
import BusinessPointsStore from "../../stores/businessPoints";
import { MAP_STYLE, getLocation } from '../../services/geo'
import { getRegion } from '../../services/auth'
import { FILE_URL } from '../../services/constants'
import { observer } from "mobx-react-lite"
import { useFocusEffect } from '@react-navigation/native';

export const Map = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <MapComponent navigation={navigation}/>
        </SafeAreaView>
    )
}

let CURRENT_COORD;
const MapComponent = observer(({ navigation }) => {
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
    }


    const openDetail = (item) => {
        setIsModalVisible(false)
        setSelectedBp(null)
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

    // 1) Берём только валидные точки
    const markers = useMemo(() => {
        return BusinessPointsStore.all
            ?.map(bp => {
                const lat = Number(bp.lat);
                const lng = Number(bp.lng);
                if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
                return { ...bp, lat, lng };
            }) || [];
    }, [BusinessPointsStore.all]);

    const mapKey = useMemo(() => {
        return markers?.map(m => `${m.id}:${m.lat}:${m.lng}`)?.join("|") || 'empty';
    }, [markers]);

    return (
        <View style={styles.mapContainer}>
            <MapView
                key={mapKey}
                mapType="standard"
                userInterfaceStyle="dark"
                style={styles.map}
                showsUserLocation={ CURRENT_COORD?.latitude ?  true : false }
                customMapStyle={MAP_STYLE}
                tracksViewChanges={false}
                region={{
                    latitude: CURRENT_COORD ? CURRENT_COORD?.latitude : regionCoord.latitude,
                    longitude: CURRENT_COORD ? CURRENT_COORD?.longitude : regionCoord.longitude,
                    latitudeDelta: 0.15,
                    longitudeDelta: 0.15,
                }}
                onPress={Keyboard.dismiss}
                clusterColor="red"
                clusterRadius={80}
                minimumClusterSize={2}>
                    {markers?.map((bp) => {
                        const lat = parseFloat(bp.lat);
                        const lng = parseFloat(bp.lng);

                        if (isNaN(lat) || isNaN(lng)) return null;

                        return (<Marker
                            key={`${bp.id}-${bp.lat}-${bp.lng}`}
                            coordinate={{ latitude:lat, longitude: lng }}
                            pinColor='red'
                            onPress={() => {
                                setSelectedBp(bp)
                                setIsModalVisible(true)
                            }}
                            tracksViewChanges={true}
                        />)
                        })}
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
                                    <TouchableOpacity style={styles.buttonStyle} onPress={() => openDetail(selectedBp)}>
                                        <Text style={styles.showPromotionText}>Все акции</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonAdditionalBlock}>
                                    {
                                        selectedBp.instagram?.trim()
                                        ?   <TouchableWithoutFeedback style={styles.instagramBtn} onPress={() => {openInstagram(selectedBp.instagram)}}>
                                                <View  >
                                                    <Image source={require('../../../assets/instagram3.png')} style={styles.instagramIcon} />
                                                </View>
                                            </TouchableWithoutFeedback>
                                        : null
                                    }
                                    {
                                        selectedBp.delivery_url?.trim()
                                        ?   <TouchableWithoutFeedback style={styles.instagramBtn} onPress={() => {openDelivery(selectedBp.delivery_url)}}>
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

const Filters = () => {
    const [isFavoriteList, setIsFavoriteList] = useState(0)

    useFocusEffect((React.useCallback(() => {
        BusinessPointsStore.setIsFavorite(0)
        setIsFavoriteList(0)
    }, [])))

    const handleValueChange = async (isFavorite) => {
      BusinessPointsStore.setIsFavorite(isFavorite)
      setIsFavoriteList(isFavorite)
    };

    const Component = () => (
      <View  style={styles.filtersContainer} >
        <SegmentedControl
          style={styles.segment}
          backgroundColor='black'
          tintColor='#0EA47A'
          values={['Все компании', 'Мои компании']}
          selectedIndex={isFavoriteList}
          onChange={(event) => handleValueChange(event.nativeEvent.selectedSegmentIndex)}
        />
      </View >
    )

    return <Component />
}

// const SearchBlock = () => {
//     const [searchString, setSearchString] = useState("")
//     let timer;
//     const onSearchHandler = (text) => {
//         setSearchString(text)
//         clearTimeout(timer)
//         timer = setTimeout(() => {
//             BusinessPointsStore.setSearchString(text?.trim())
//         }, 600)
//     }

//     useFocusEffect((React.useCallback(() => {
//         setSearchString("")
//     }, [])))

//     return (
//       <View style={{
//         marginTop: 10,
//         width: "95%"
//       }}>
//         <TextInput
//           placeholder="Поиск"
//           placeholderTextColor="#A9A9A9"
//           cursorColor="#A9A9A9"
//           onChangeText={onSearchHandler}
//           autoCorrect={false}
//           value={searchString}
//           style={{
//             height: 40,
//             backgroundColor: "#1A1A1A",
//             borderRadius: 10,
//             paddingHorizontal: 10,
//             borderWidth: 0.5,
//             color: '#A9A9A9',
//             borderColor: "#808080",
//             width: "100%"
//           }}
//         />

//       </View>
//     );
// }

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flexDirection: "column",
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
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
    filtersContainer: {
        paddingTop: 10,
        height: "10%",
        flex: 1,
        gap: 10,
        width: '96%',
        flexDirection: 'column',
        alignItems: 'center'
    },
    //  <View style={{ width: '96%', flex: 1, gap: 10, alignItems: 'center' }}>
    mapContainer: {
        height: "100%",
    },
    map: {
        height: "100%",
    },
    segment: {
        width: '95%',
        height: 35,
        borderWidth: 1,
        borderColor: '#434343'
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
        marginTop: 10
    },
    instagramBtn: {
        marginTop: 40,
        marginLeft: 10,
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





