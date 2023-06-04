import React from "react";
import { TouchableWithoutFeedback, StyleSheet, View, FlatList, Image, Text } from 'react-native';
import { Segments } from "./Coupons/Segments";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export const CompanyScreen = ({navigation})=> {
    const openCompanyProfile = item => {
        navigation.navigate('CompanyProfile', {data: item})
    }
    
    return (
        <View style={styles.app}>
            <Segments/>
            <FlatList
                style={styles.flatList}
                data={itemData}
                numColumns={1}
                renderItem={({ item }) =>
                    <TouchableWithoutFeedback onPress={() => {openCompanyProfile(item)}}>
                        <View style={styles.item}>
                            {item.image}
                            <View style={styles.header}>
                                {item.name}
                                <View style={styles.stack}>
                                    <Image source={require('../assets/time.png')} style={styles.clock} />
                                    {item.time}
                                </View>
                            </View>
                            <View style={styles.header}>
                                <View style={styles.stack}>
                                    <Image source={require('../assets/star.png')} style={styles.star} />
                                    {item.rating}
                                </View>
                                <View style={styles.stack}>
                                    <Image source={require('../assets/mapIcon.png')} style={styles.map} />
                                    {item.distance}
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>}>
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    app: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 44,
        backgroundColor: 'black',
    },
    flatList: {
        width: '100%',
        flexGrow: 0,
        backgroundColor: 'black',
        paddingTop: 15,
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
    }
})

const itemData = [
    {
        id: 0,
        name: (<Text style={styles.nameStyle}>Progresso</Text>),
        image: (<Image source={require('../assets/pizza.png')} style={styles.imageContainer} />),
        time: (<Text style={styles.time}>12:00 - 23.00</Text>),
        rating: (<Text style={styles.mapText}>4.8</Text>),
        distance: (<Text style={styles.mapText}>300 м</Text>),
    },
    {
        id: 1,
        name: (<Text style={styles.nameStyle}>BeautyFirm</Text>),
        image: (<Image source={require('../assets/111.jpeg')} style={styles.imageContainer} />),
        time: (<Text style={styles.time}>9:00 - 19.00</Text>),
        rating: (<Text style={styles.mapText}>4.8</Text>),
        distance: (<Text style={styles.mapText}>800 м</Text>),
    },
    {
        id: 2,
        name: (<Text style={styles.nameStyle}>АЛМИ</Text>),
        image: (<Image source={require('../assets/333.webp')} style={styles.imageContainer} />),
        time: (<Text style={styles.time}>9:00 - 24.00</Text>),
        rating: (<Text style={styles.mapText}>4.8</Text>),
        distance: (<Text style={styles.mapText}>1 км</Text>),
    },
    {
        id: 3,
        name: (<Text style={styles.nameStyle}>Ташкент</Text>),
        image: (<Image source={require('../assets/333.webp')} style={styles.imageContainer} />),
        time: (<Text style={styles.time}>14:00 - 02.00</Text>),
        rating: (<Text style={styles.mapText}>4.8</Text>),
        distance: (<Text style={styles.mapText}>1,2 км</Text>),
    },
    {
        id: 4,
        name: (<Text style={styles.nameStyle}>Dodo pizza</Text>),
        image: (<Image source={require('../assets/555.png')} style={styles.imageContainer} />),
        time: (<Text style={styles.time}>10:00 - 23.00</Text>),
        rating: (<Text style={styles.mapText}>4.8</Text>),
        distance: (<Text style={styles.mapText}>2 км</Text>),
    },
    {
        id: 5,
        name: (<Text style={styles.nameStyle}>ИП Морозова</Text>),
        image: (<Image source={require('../assets/111.jpeg')} style={styles.imageContainer} />),
        time: (<Text style={styles.time}>9:00 - 18.00</Text>),
        rating: (<Text style={styles.mapText}>4.8</Text>),
        distance: (<Text style={styles.mapText}>3 км</Text>),
    },
    {
        id: 6,
        name: (<Text style={styles.nameStyle}>Продтовары</Text>),
        image: (<Image source={require('../assets/333.webp')} style={styles.imageContainer} />),
        time: (<Text style={styles.time}>9:00 - 22.00</Text>),
        rating: (<Text style={styles.mapText}>4.8</Text>),
        distance: (<Text style={styles.mapText}>5 м</Text>),
    },
    {
        id: 7,
        name: (<Text style={styles.nameStyle}>Суши весла</Text>),
        image: (<Image source={require('../assets/pizza.png')} style={styles.imageContainer} />),
        time: (<Text style={styles.time}>11:00 - 23.00</Text>),
        rating: (<Text style={styles.mapText}>4.8</Text>),
        distance: (<Text style={styles.mapText}>7 км</Text>),
    }
]

