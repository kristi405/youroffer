import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, ActivityIndicator, Keyboard, TouchableOpacity, Alert } from 'react-native';
import ContactUsStore from '../../stores/contactUs'
import { useFocusEffect } from '@react-navigation/native';
import RadioGroup from 'react-native-radio-buttons-group';
import { observer } from "mobx-react-lite"
import RegionStore from "../../stores/regions"

export const Region = observer(({ navigation }) => {
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const [regions, setRegions] = useState([]);

    useEffect(() => {
        init()
    }, []);

    const init = async () => {
        setIsLoading(true)
        await RegionStore.getRegions()
        console.log('222222', RegionStore.optionsList)
        setIsLoading(false)
    }

    const radioButtons = useMemo(() => (RegionStore.optionsList), []);

    const Loading = () => (
        <ActivityIndicator style={{ marginVertical: '80%' }} size="large" color="white" />
    )

    const Radio = () => (
        <RadioGroup
            radioButtons={radioButtons}
            onPress={setSelectedId}
            selectedId={selectedId}
        />
    )

    return (
        <View style={styles.container}>
            {isLoading ? <Loading /> : <Radio />}
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
})