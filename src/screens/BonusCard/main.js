import React, { useCallback } from "react";
import { StyleSheet, View, FlatList, Image, Text, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { observer } from "mobx-react-lite"

export const BonusCard = observer(({ navigation }) => {

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatList}
                data={DATA}
                contentContainerStyle={{ paddingBottom: 20 }}
                numColumns={2}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={(item) => item.id}
            >
            </FlatList>
            <TouchableWithoutFeedback >
                <View style={styles.addButton}>
                    <Image source={require('../../../assets/plus.png')} />
                </View>
            </TouchableWithoutFeedback>
            {/* <Barcode
                value="123456789999"
                options={{ format: 'UPC', background: 'lightblue' }}
                rotation={-5}
            /> */}
        </View>
    )
})

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
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
    item: {
        backgroundColor: '#f9c2ff',
        flexDirection: 'column',
        width: '46%',
        height: 110,
        margin: 8,
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 32,
    },
    addButton: {
        backgroundColor: '#0EA47A',
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    box: {
        width: 100,
        height: 100,
    }
})