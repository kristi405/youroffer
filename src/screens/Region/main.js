import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, FlatList, TouchableWithoutFeedback } from 'react-native';
import { observer } from "mobx-react-lite"
import RegionStore from "../../stores/regions"
import BusinessPointsStore from '../../stores/businessPoints'
import {setRegion, getRegion} from "../../services/auth"

export const Region = observer(({ navigation }) => {
    const [selectedRegionId, setSelectedRegionId] = useState();
    const [loading, setLoading] = useState(false);
    const flatListRef = useRef(null);

    useEffect(() => {
        init()
    }, []);

    const init = async () => {
        setLoading(true)
        const currentRegion = await getRegion()
        setSelectedRegionId(currentRegion?.id)
        await RegionStore.getRegions()
        setLoading(false)
    }

    const LoadingView = () => (
        <ActivityIndicator style={{ marginVertical: '50%' }} size="large" color="white" />
    )

    const selectRegion = async (item, index) => {
        await setRegion(item)
        setLoading(true)
        setTimeout(async () => {
            await RegionStore.saveRegion(item.id)
            setSelectedRegionId(item?.id)
            navigation.navigate('Profile')
            setLoading(false)
            BusinessPointsStore.getAll()
        }, 500)

    }

    const RegionList = () => (
        <View style={styles.container}>
            <SafeAreaView>
                <FlatList
                    ref={flatListRef}
                    style={styles.flatList}
                    data={RegionStore.activeList}
                    numColumns={1}
                    initialNumToRender={15}
                    keyExtractor={(item) => item.id}
                    extraData={selectedRegionId}
                    renderItem={({ item, index }) =>
                        <TouchableWithoutFeedback onPress={() => { selectRegion(item, index) }}>
                            <View style={[styles.item, {backgroundColor: item?.id === selectedRegionId ? '#0EA47A' : '#1A1A1A'}]}>
                                <View style={styles.header}>
                                    <Text style={styles.title}>{item.name}</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    }>
                </FlatList>
            </SafeAreaView>
        </View>
    )

    return (
        <View style={styles.container}>
            { loading ? <LoadingView /> : <RegionList /> }
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 100,
        gap: 10,
        alignItems: 'center'
    },
    text: {
        color: '#FFF'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
        paddingTop: 0,
        paddingBottom: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    flatList: {
        width: '100%',
        flexGrow: 0,
        backgroundColor: 'black',
        paddingTop: 0,
    },
    title: {
        fontSize: 19,
        color: 'white',
        opacity: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    item: {
        flexDirection: 'row',
        height: 55,
        margin: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 10,
    }
})