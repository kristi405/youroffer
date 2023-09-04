import React, { useState, useCallback, useEffect } from "react";
import { TouchableWithoutFeedback, StyleSheet, View, FlatList, Image, Text, RefreshControl, ActivityIndicator } from 'react-native';
import BusinessPointsStore from "../../../stores/businessPoints"

export const MyCompany = ({ navigation, openDetail }) => {
    const [favoriteData, setfavoriteData] = useState([]);
    const [items, setItems] = useState(favoriteData)
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);

    const deletePromotion = (id) => {
        const newItems = [...favoriteData]
        const index = newItems.findIndex(item => item.id === id)
        const deletedItem = favoriteData[index]
        favoriteData[index].favorite = !favoriteData[index].favorite
        BusinessPointsStore.addToFavorite(deletedItem.id, deletedItem.favorite)
        setItems(newItems)
      }

    const openCompanyProfile = item => {
        navigation.navigate('CompanyProfile', { data: item })
    }

    const handleRefresh = () => {
        setIsRefreshing(true);
        fetchData()
    }

    const fetchData = () => {
        setTimeout(() => {
            BusinessPointsStore.getFavoriteBusinessPoints();
            setIsRefreshing(false);
        }, 1000);
    }

    const fetchBusinessPoints = useCallback(async () => {
        if (isLoading) {
            return
        } else {
            setIsLoading(true);
            try {
                BusinessPointsStore.getFavoriteBusinessPoints();
                setTimeout(() => {
                    const newData = BusinessPointsStore.favoriteBusinessPoint;
                    setfavoriteData(prevData => [...prevData, ...newData]);
                    setIsPageLoading(false);
                }, 1000);
            } catch (error) {
                // Handle error
            } finally {
                setIsLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        fetchBusinessPoints();
    }, []);

    return (
        <View style={styles.app}>{isPageLoading ? (
            <ActivityIndicator style={{ flex: 1 }} size="large" color="white" />
        ) : (
            <FlatList
                style={styles.flatList}
                data={favoriteData}
                numColumns={1}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        colors={['white']}
                        tintColor={'white'}
                        progressViewOffset={5}
                    />
                }
                renderItem={({ item }) =>
                    <TouchableWithoutFeedback onPress={() => { openDetail(item) }}>
                        <View style={styles.item}>
                            <Image source={{ uri: `http://192.168.0.112:8888/api/v1/file/${item.img}.${item.img_ext}` }} style={styles.imageContainer} />
                            <View style={styles.header}>
                                <Text style={styles.nameStyle}>{item.name}</Text>
                                <View style={styles.stack}>
                                    <Image source={require('../../../../assets/time.png')} style={styles.clock} />
                                    {/* <Text style={styles.time}>{item.utime}</Text> */}
                                </View>
                            </View>
                            <View style={styles.header}>
                                <View style={styles.stack}>
                                    <Image source={require('../../../../assets/star.png')} style={styles.star} />
                                    {/* {item.rating} */}
                                </View>
                                <TouchableWithoutFeedback style={styles.icon} onPress={() => { deletePromotion(item.id) }}>
                                    <View style={styles.save}>
                                        <Image source={item.favorite ? require('../../../../assets/saveSelected.png') : require('../../../../assets/save.png')} />
                                    </View>
                                </TouchableWithoutFeedback>
                                {/* <View style={styles.stack}>
                                    <Image source={require('../../../../assets/mapIcon.png')} style={styles.map} />
                                    {item.distance}
                                </View> */}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>}
                keyExtractor={(item) => item.id}
                onEndReached={fetchBusinessPoints}
                onEndReachedThreshold={0.1}
            >
            </FlatList>
        )}
        </View>
    )
}

const styles = StyleSheet.create({
    app: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingBottom: 50,
    },
    flatList: {
        width: '100%',
        flexGrow: 0,
        backgroundColor: 'black',
    },
    item: {
        flex: 1,
        flexDirection: 'column',
        height: 190,
        margin: 5,
        backgroundColor: '#1A1A1A',
        borderRadius: 10,
        gap: 5
    },
    imageContainer: {
        width: '100%',
        height: 110,
        borderRadius: 10,
        opacity: 0.8
    },
    nameStyle: {
        color: 'white',
    },
    mapText: {
        color: 'white',
        paddingLeft: 6,
        paddingTop: 9,
        opacity: 0.4
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 15,
        color: 'white'
    },
    stack: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    time: {
        color: 'white',
        paddingLeft: 5,
        paddingTop: 3,
        opacity: 0.4
    },
    clock: {
        width: 15,
        height: 15,
    },
    star: {
        width: 20,
        height: 20,
    },
    map: {
        width: 16,
        height: 24,
    },
    save: {
        alignItems: 'flex-end',
    },
    icon: {
        height: '60%',
        width: '100%',
        paddingRight: 10,
        borderRadius: 10,
    },
})