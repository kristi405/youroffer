import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { observer } from "mobx-react-lite"
import RegionStore from "../../stores/regions"
import BusinessPointsStore from '../../stores/businessPoints'
import { setRegion, getRegion } from "../../services/auth"
import { setFirstInit } from '../../services/globals'
import { subscribeToTopic } from '../../services/fcm'

export const Region = observer(({ navigation }) => {
    const [selectedRegionId, setSelectedRegionId] = useState();
    const [loading, setLoading] = useState(false);
    const [curregion, setCurregion] = useState();

    useEffect(() => {
        init()
    }, []);

    const init = async () => {
        setLoading(true)
        const currentRegion = await getRegion()
        setCurregion(currentRegion)
        setSelectedRegionId(currentRegion?.id)
        await RegionStore.getRegions()
        setLoading(false)
    }

    const LoadingView = () => (
        <ActivityIndicator style={{ marginVertical: '50%' }} size="large" color="white" />
    )

    const selectRegion = async (item) => {
        setFirstInit()
        await setRegion(item)
        setLoading(true)
        setTimeout(async () => {
            await RegionStore.saveRegion(item.id)
            setSelectedRegionId(item?.id)
            if (!curregion) {
                navigation.replace('CouponScreen', { screen: 'Акции' })
            }
            setCurregion(item)
            setLoading(false)
            BusinessPointsStore.getAll()
            subscribeToTopic()
        }, 500)
    }

    const RegionList = () => (
        <View style={styles.container}>
            <ScrollView>
                {RegionStore.activeList.map((item) => {
                    return (
                        <TouchableWithoutFeedback key={item?.id} onPress={() => { selectRegion(item) }}>
                            <View style={[styles.item, { backgroundColor: item?.id === selectedRegionId ? '#0EA47A' : '#1A1A1A' }]}>
                                <View style={styles.header}>
                                    <Text style={styles.title}>{item.name}</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </ScrollView>
        </View>
    )

    return (
        <View style={styles.container}>
            {loading ? <LoadingView /> : <RegionList />}
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
        paddingTop: 3,
        paddingBottom: 10,
        paddingHorizontal: 10,
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