import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, FlatList, TouchableWithoutFeedback, Linking } from 'react-native';
import { getUser } from '../../services/auth'
import Constants from "expo-constants"

export const Profile = ({ navigation }) => {
    const [id, setId] = useState('')
    const [instagram, setInstagram] = useState('');

    useEffect(() => {
        getUser().then((user) => {
            setId(user.number)
            setInstagram(user?.settings?.instagram)
        })
    })

    const openSettings = item => {
        if (item.id == 0) {
            navigation.navigate('EditScreen')
        } else if (item.id == 1) {
            navigation.navigate('ForBusiness')
        } else if (item.id == 2) {
            navigation.navigate('ContactUs')
        } else if (item.id == 3) {
            navigation.navigate('Region')
        }  else if (item.id == 4) {
            openInstagram()
        }
    }

    const openInstagram = async () => {
        tempInstagram = instagram.trim();
        tempInstagram = tempInstagram.split('?')[0];
        tempInstagram = tempInstagram.replace("https://", '')
        tempInstagram = tempInstagram.replace("www.", '')
        tempInstagram = tempInstagram.replace("instagram.com/", '')
        tempInstagram = tempInstagram.replace("/", '')
        if (tempInstagram) {
            try {
                await Linking.openURL(`instagram://user?username=${tempInstagram}`)
            } catch (e) {
                await Linking.openURL(instagram)
            }
        }
    };

    // const openInstagram = async () => {
    //     try {
    //         await Linking.openURL('instagram://user?username=myoffersapp')
    //     } catch (e) {
    //         await Linking.openURL('https://www.instagram.com/myoffersapp/')
    //     }
    // };
    Object.keys(Constants?.expoConfig).forEach(key => {
        console.log(key,  Constants.expoConfig[key])
    });

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.navigationTitle}>Мой профиль</Text>
                <TouchableWithoutFeedback>
                    <View style={styles.item}>
                        <Text style={styles.idStyle}>Ваш ID: {id}</Text>
                        <Text style={styles.versionStyle}>Версия: {Constants.expoConfig.version}</Text>
                    </View>
                </TouchableWithoutFeedback>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 40,
        backgroundColor: 'black',
        paddingTop: 50,
        paddingBottom: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    idStyle: {
        fontSize: 20,
        color: 'white',
        opacity: 0.6,
        fontWeight: '700',
    },
    versionStyle: {
        fontSize: 12,
        color: 'white',
        opacity: 0.6,
        fontWeight: '700',
    },
    navigationTitle: {
        fontSize: 20,
        color: '#0EA47A',
        fontWeight: '700',
        paddingLeft: 10,
        paddingBottom: 10
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
        height: 55,
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
        borderRadius: 5,
    },
    logout: {
        width: 23,
        height: 23,
        borderRadius: 5,
        tintColor: 'white',
        backgroundColor: '#0EA47A'
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
        title: (<Text style={styles.title}>ДЛЯ БИЗНЕСА</Text>),
        image: (<Image source={require('../../../assets/information.png')} style={styles.image} />),
    },
    {
        id: 2,
        title: (<Text style={styles.title}>Свяжитесь с нами</Text>),
        image: (<Image source={require('../../../assets/contactUs.png')} style={styles.image} />),
    },
    {
        id: 3,
        title: (<Text style={styles.title}>Изменить регион</Text>),
        image: (<Image source={require('../../../assets/cell.png')} style={styles.image} />),
    },
    {
        id: 4,
        title: (<Text style={styles.title}>Подпишись на нас  😉🙏👻</Text>),
        image: (<Image source={require('../../../assets/instagram3.png')} style={styles.image} />),
    }
]