import React from "react";
import { StyleSheet, View, SafeAreaView, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Category } from "./Coupons/Category";
import { Coupon } from "./Coupons";
import { Segments } from "./Coupons/Segments";

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'black',
      paddingHorizontal: 10,
      gap: 16
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

const itemData = [
    {
      id: 0,
      name: (<Text style={styles.headerStyle}>Progresso</Text>),
      avatar: <Image source={require('../assets/avatar.png')} style={styles.avatar} />,
      image: (<Image source={require('../assets/pizza.png')} style={styles.imageContainer} />),
      title: (<Text style={styles.headerStyle}>Каждый 10 кофе в подарок</Text>),
      favorite: false,
      description: <Text style={styles.contentText}></Text>
    },
    {
      id: 1,
      name: (<Text style={styles.headerStyle}>BeautyFirm</Text>),
      avatar: <Image source={require('../assets/avatar.png')} style={styles.avatar} />,
      image: (<Image source={require('../assets/111.jpeg')} style={styles.imageContainer} />),
      title: (<Text style={styles.headerStyle}>Приведи подругу и получи маникюр со скидкой 50: </Text>),
      favorite: false,
      description: <Text style={styles.contentText}>Получи скидку при покупке 3 роллов в четверг и пятницу. Акция действует только при предьявлении данного купона и распространяется на все виды роллов</Text>
    },
    {
      id: 2,
      name: (<Text style={styles.headerStyle}>АЛМИ</Text>),
      avatar: <Image source={require('../assets/avatar.png')} style={styles.avatar} />,
      image: (<Image source={require('../assets/333.webp')} style={styles.imageContainer} />),
      title: (<Text style={styles.headerStyle}>При покупке от 100 рублей скидка 5%</Text>),
      favorite: false,
      description: <Text style={styles.contentText}>Получи скидку при покупке 3 роллов в четверг и пятницу. Акция действует только при предьявлении данного купона и распространяется на все виды роллов</Text>
    },
    {
      id: 3,
      name: (<Text style={styles.headerStyle}>Ташкент</Text>),
      avatar: <Image source={require('../assets/avatar.png')} style={styles.avatar} />,
      image: (<Image source={require('../assets/333.webp')} style={styles.imageContainer} />),
      title: (<Text style={styles.headerStyle}>Каждую пятницу скидка 10% на все меню</Text>),
      favorite: false,
      description: <Text style={styles.contentText}>Получи скидку при покупке 3 роллов в четверг и пятницу. Акция действует только при предьявлении данного купона и распространяется на все виды роллов</Text>
    },
    {
      id: 4,
      name: (<Text style={styles.headerStyle}>Dodo pizza</Text>),
      avatar: <Image source={require('../assets/avatar.png')} style={styles.avatar} />,
      image: (<Image source={require('../assets/555.png')} style={styles.imageContainer} />),
      title: (<Text style={styles.headerStyle}>Каждая третья пицца в подарок</Text>),
      favorite: false,
      description: <Text style={styles.contentText}>Получи скидку при покупке 3 роллов в четверг и пятницу. Акция действует только при предьявлении данного купона и распространяется на все виды роллов</Text>
    },
    {
      id: 5,
      name: (<Text style={styles.headerStyle}>ИП Морозова</Text>),
      avatar: <Image source={require('../assets/avatar.png')} style={styles.avatar} />,
      image: (<Image source={require('../assets/111.jpeg')} style={styles.imageContainer} />),
      title: (<Text style={styles.headerStyle}>Первый маникюр бесплатный</Text>),
      favorite: false,
      description: <Text style={styles.contentText}>Получи скидку при покупке 3 роллов в четверг и пятницу. Акция действует только при предьявлении данного купона и распространяется на все виды роллов</Text>
    },
    {
      id: 6,
      name: (<Text style={styles.headerStyle}>Продтовары</Text>),
      avatar: <Image source={require('../assets/avatar.png')} style={styles.avatar} />,
      image: (<Image source={require('../assets/333.webp')} style={styles.imageContainer} />),
      title: (<Text style={styles.headerStyle}>Скидки на алкоголь после 21.00</Text>),
      favorite: false,
      description: <Text style={styles.contentText}>Получи скидку при покупке 3 роллов в четверг и пятницу. Акция действует только при предьявлении данного купона и распространяется на все виды роллов</Text>
    },
    {
      id: 7,
      name: (<Text style={styles.headerStyle}>Суши весла</Text>),
      avatar: <Image source={require('../assets/avatar.png')} style={styles.avatar} />,
      image: (<Image source={require('../assets/pizza.png')} style={styles.imageContainer} />),
      title: (<Text style={styles.headerStyle}>Скидка 20% на все роллы на вынос </Text>),
      favorite: false,
      description: <Text style={styles.contentText}>Получи скидку при покупке 3 роллов в четверг и пятницу. Акция действует только при предьявлении данного купона и распространяется на все виды роллов</Text>
    }
  ]

export const CouponScreen = ({ navigation }) => {
    const openDetail = item => {
        navigation.navigate('CouponDetailScreen', {data: item})
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <Category style={styles.category} /> */}
            <Segments/>
            <Coupon openDetail={openDetail} itemData={itemData} />
        </SafeAreaView>
    )
}
