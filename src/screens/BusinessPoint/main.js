import React from "react";
import { StyleSheet, View, Image, Text } from 'react-native';
import { Coupon } from "../PromotionsList/components/Coupons";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export const CompanyProfile = ({ navigation, route }) => {
    const itemData = [
        {
          id: 0,
          name: (<Text style={styles.headerStyle}>Progresso</Text>),
          avatar: <Image source={require('../../../assets/avatar.png')} style={styles.avatar} />,
          image: (<Image source={require('../../../assets/pizza.png')} style={styles.imageContainer} />),
          title: (<Text style={styles.headerStyle}>Каждый 10 кофе в подарок</Text>),
          favorite: false,
          description: <Text style={styles.contentText}></Text>
        },
        {
          id: 1,
          name: (<Text style={styles.headerStyle}>BeautyFirm</Text>),
          avatar: <Image source={require('../../../assets/avatar.png')} style={styles.avatar} />,
          image: (<Image source={require('../../../assets/111.jpeg')} style={styles.imageContainer} />),
          title: (<Text style={styles.headerStyle}>Приведи подругу и получи маникюр со скидкой 50: </Text>),
          favorite: false,
          description: <Text style={styles.contentText}>Получи скидку при покупке 3 роллов в четверг и пятницу. Акция действует только при предьявлении данного купона и распространяется на все виды роллов</Text>
        },
        {
          id: 2,
          name: (<Text style={styles.headerStyle}>АЛМИ</Text>),
          avatar: <Image source={require('../../../assets/avatar.png')} style={styles.avatar} />,
          image: (<Image source={require('../../../assets/333.webp')} style={styles.imageContainer} />),
          title: (<Text style={styles.headerStyle}>При покупке от 100 рублей скидка 5%</Text>),
          favorite: false,
          description: <Text style={styles.contentText}>Получи скидку при покупке 3 роллов в четверг и пятницу. Акция действует только при предьявлении данного купона и распространяется на все виды роллов</Text>
        },
        {
          id: 3,
          name: (<Text style={styles.headerStyle}>Ташкент</Text>),
          avatar: <Image source={require('../../../assets/avatar.png')} style={styles.avatar} />,
          image: (<Image source={require('../../../assets/333.webp')} style={styles.imageContainer} />),
          title: (<Text style={styles.headerStyle}>Каждую пятницу скидка 10% на все меню</Text>),
          favorite: false,
          description: <Text style={styles.contentText}>Получи скидку при покупке 3 роллов в четверг и пятницу. Акция действует только при предьявлении данного купона и распространяется на все виды роллов</Text>
        }
    ]

    const item = route?.params?.data

    const openDetail = item => {
        navigation.navigate('CouponDetailScreen', {data: item})
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image source={item.image.props.source} style={styles.image} />
                <View style={styles.descriptionView}>
                    <Text style={styles.nameStyle}>{item.name} </Text>
                    <View style={styles.stack}>
                        <Image source={require('../../../assets/time.png')} style={styles.clock} />
                        {item.time}
                    </View>
                    <View style={styles.stack}>
                        <Image source={require('../../../assets/mapIcon.png')} style={styles.map} />
                        {item.distance}
                    </View>
                    <Text style={styles.description}>Мы специализируемся на французской кухне, у нам большая винная карта. Также по выходным мы проводим закрытые мероприятия. Тел. +375(29)1234567 </Text>
                </View>
            </View>
            <Coupon openDetail={openDetail} itemData={itemData} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 10,
        paddingTop: 5,
        alignItems: 'flex-start',
        backgroundColor: 'black',
        gap: 15,
        paddingBottom: 150
    },
    profile: {
        width: '100%',
        flexDirection: 'row',
        gap: 20,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    descriptionView: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        paddingRight: 10,
        gap: 5
    },
    description: {
        color: 'white',
        fontSize: 13,
        opacity: 0.5
    },
    stack: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    map: {
        width: 14,
        height: 22,
    },
    nameStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0EA47A',
    },
    clock: {
        width: 14,
        height: 14,
    },
    headerStyle: {
        color: 'white',
        paddingHorizontal: 10,
        paddingTop: 10,
      },
      imageContainer: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        opacity: 0.8
      },
})

const newStyles = StyleSheet.create({
    nameStyle: {
        color: 'red',
    },
});