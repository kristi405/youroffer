import React, { useCallback } from "react";
import { StyleSheet, View, FlatList, Image, Text, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { observer } from "mobx-react-lite"

export const BonusCard = observer(({ navigation }) => {

    const openNewCard = async () => {
        navigation.navigate('NewCard')
    }

    const openBonusCardView = async () => {
        navigation.navigate('BonusCardView')
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatList}
                data={DATA}
                contentContainerStyle={{ paddingBottom: 20 }}
                numColumns={2}
                renderItem={({ item }) => <Item navigation={navigation} title={item.title} />}
                keyExtractor={(item) => item.id}
            >
            </FlatList>
            <TouchableWithoutFeedback onPress={openNewCard}>
                <View style={styles.addButton}>
                    <Image source={require('../../../assets/plus.png')} />
                </View>
            </TouchableWithoutFeedback >
        </View>
    )
})

const Item = ({ navigation, title }) => {

    const openBonusCardView = async () => {
        console.log('2363263727')
        navigation.navigate('BonusCardView')
        // if (!businessPointId) fromPromotionPage = true;
        // navigation.navigate('CouponDetailScreen', { data: item })
    }

    return (
        <TouchableWithoutFeedback onPress={openBonusCardView}>
            <View style={styles.item}>
                <Image style={styles.imageContainer} source={require('../../../assets/discontCard.png')} />
                <Text style={styles.title}>{title}</Text>
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
        height: 140,
        margin: 8,
        borderRadius: 10,
        justifyContent: 'space-between',
        gap: 5
    },
    title: {
        fontSize: 15,
        color: 'white',
        paddingLeft: 5,
        paddingBottom: 5
    },
    addButton: {
        backgroundColor: '#0EA47A',
        height: 50,
        width: 50,
        borderRadius: 25,
    },
})