import React, { useCallback, useState } from "react";
import { StyleSheet, View, FlatList, Image, Text, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { observer } from "mobx-react-lite"
import { useFocusEffect } from '@react-navigation/native';
import BonusCardStore from '../../stores/bonusCard'
import { FILE_URL } from '../../services/constants'
import { NEED_TO_RELOAD_BONUS_CARDS_LIST, setNeedToReloadBonusCardsLisr } from '../../services/globals'
import * as Brightness from 'expo-brightness';

let IS_NEED_UPDATE = true
export const BonusCard = observer(({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const setBrightness = async () => {         
        try {
            const brightness = await Brightness.getSystemBrightnessAsync()            
            await Brightness.setBrightnessAsync(brightness)            
        } catch (e) {
            console.log(e)
        }        
    }    

    const handler = useCallback(() => {
        setBrightness()  
        if (!NEED_TO_RELOAD_BONUS_CARDS_LIST) return;
        setLoading(true)      
        BonusCardStore.getUserList()
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
        setNeedToReloadBonusCardsLisr(false)
    }, [])
    useFocusEffect(handler);

    const openNewCard = async () => {        
        navigation.navigate('NewCard')
    } 

    const List = () => {        
        if (BonusCardStore.loading) {
            return <ActivityIndicator style={{ marginVertical: '80%' }} size="large" color="#0EA47A" />
        } else {
            return <FlatList
                style={styles.flatList}
                data={BonusCardStore.userList}
                contentContainerStyle={{ paddingBottom: 20 }}
                numColumns={2}
                renderItem={({ item }) => <Item navigation={navigation} item={item} />}
                keyExtractor={(item) => item.id}
            >
            </FlatList>
        }
    }
 
    return (
        <View style={styles.container}>
            <List />
            <TouchableWithoutFeedback onPress={openNewCard}>
                <View style={styles.addButton}>
                    <Image source={require('../../../assets/plus.png')} />
                </View>
            </TouchableWithoutFeedback >
        </View>
    )
})

const Item = ({ navigation, item }) => {
    const openBonusCardView = async () => {         
        navigation.navigate('BonusCardView', { data: item, name: item.name })     
    }

    return (
        <TouchableWithoutFeedback onPress={openBonusCardView}>
            <View style={styles.item}>
                <Image source={
                    item?.img 
                    ? { uri: `${FILE_URL}${item?.img}.${item?.img_ext}`}
                    : require('../../../assets/discontCard.png')} 
                    style={styles.imageContainer} 
                />
                
                <Text style={styles.title}>{item.name || 'бонусная карта'}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
};

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Остров чистоты',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

const styles = StyleSheet.create({
    flatList: {
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 5,
        paddingTop: 50,
        paddingBottom: 30,
        alignItems: 'center',
        backgroundColor: 'black',
        gap: 15,
    },
    imageContainer: {
        width: '100%',
        height: 110,
        borderRadius: 10,
    },
    item: {
        backgroundColor: '#1A1A1A',
        flexDirection: 'column',
        width: '46%',
        height: 145,
        margin: 8,
        borderRadius: 10,
        justifyContent: 'space-between',
        gap: 5
    },
    title: {
        fontSize: 14,
        color: 'white',
        paddingLeft: 10,
        paddingBottom: 8
    },
    addButton: {
        backgroundColor: '#0EA47A',
        height: 50,
        width: 50,
        borderRadius: 25,
    },
})