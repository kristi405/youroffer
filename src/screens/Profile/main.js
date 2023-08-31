import React from "react";
import { StyleSheet, View, Image, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import AuthStore from '../../stores/auth'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export const Profile = ({ navigation }) => {
    const openSettings = item => {
        if (item.id == 0) {
            navigation.navigate('LoginScreen');
            AuthStore.clearUser()
            
            // navigation.navigate('EditScreen', { data: item })
        } else if (item.id == 3) {
            navigation.navigate('Scan', { data: item })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.navigationTitle}>Мой профиль</Text>
            <FlatList
                style={styles.flatList}
                data={itemData}
                numColumns={1}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <TouchableWithoutFeedback onPress={() => { openSettings(item) }}>
                        <View style={styles.item}>
                            <View style={styles.header}>
                                {item.image}
                                {item.title}
                            </View>
                            <Image source={require('../../../assets/arrow.png')} style={styles.icon} />
                        </View>
                    </TouchableWithoutFeedback>
                }>
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
        paddingTop: 44,
        paddingHorizontal: 10,
    },
    navigationTitle: {
        fontSize: 20,
        color: '#0EA47A',
        fontWeight: '700',
        paddingLeft: 5
    },
    title: {
        fontSize: 14,
        color: 'white',
        opacity: 0.6
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
    item: {
        flexDirection: 'row',
        height: 60,
        margin: 5,
        backgroundColor: '#1A1A1A',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    image: {
        width: 24,
        height: 24,
        borderRadius: 5
    }
})

const itemData = [
    {
        id: 0,
        title: (<Text style={styles.title}>Редактировать профиль</Text>),
        image: (<Image source={require('../../../assets/editProfile.png')} style={styles.image} />),
    },
    {
        id: 1,
        title: (<Text style={styles.title}>Свяжитесь с нами</Text>),
        image: (<Image source={require('../../../assets/contactUs.png')} style={styles.image} />),
    },
    {
        id: 2,
        title: (<Text style={styles.title}>Информация о приложении</Text>),
        image: (<Image source={require('../../../assets/information.png')} style={styles.image} />),
    },
    {
        id: 3,
        title: (<Text style={styles.title}>Cканировать Qr</Text>),
        image: (<Image source={require('../../../assets/scan.png')} style={styles.image} />),
    },
]