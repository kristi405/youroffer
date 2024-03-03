import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import UserStore from '../../stores/user'

export const ManagerScreen = ({ navigation }) => {
    const [managers, setManagers] = useState();

    useFocusEffect(
        React.useCallback(() => {
            UserStore.getUser().then(user => {
                if (user?.managers?.length) {
                    setManagers(user.managers)
                } else {
                    openSettings()
                }
            })
        }, [])
    );


    const openSettings = item => {
        navigation.navigate('Scan')
    }

    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    style={styles.flatList}
                    data={managers}
                    numColumns={1}
                    keyExtractor={(item) => item.id_waiter}
                    renderItem={({ item }) =>
                        <TouchableWithoutFeedback onPress={() => { openSettings(item) }}>
                            <View style={styles.item}>
                                <View style={styles.header}>
                                    <Text style={styles.title}>{item.manager_name}</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    }>
                </FlatList>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
        paddingTop: 40,
        paddingBottom: 10,
        paddingHorizontal: 15,
        justifyContent: 'space-between'
    },
    navigationTitle: {
        fontSize: 25,
        color: '#0EA47A',
        fontWeight: '700',
        paddingLeft: 10,
        paddingBottom: 10
    },
    title: {
        fontSize: 19,
        color: 'white',
        opacity: 0.5
    },
    flatList: {
        width: '100%',
        flexGrow: 0,
        backgroundColor: 'black',
        paddingTop: 15,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    logout: {
        width: 23,
        height: 23,
        borderRadius: 5,
        tintColor: 'white',
        backgroundColor: '#0EA47A'
    },
    item: {
        flexDirection: 'row',
        height: 55,
        margin: 5,
        backgroundColor: '#1A1A1A',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 10,
    },
})