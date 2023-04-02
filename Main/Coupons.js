import React from "react";
import { TouchableWithoutFeedback, StyleSheet, View, FlatList, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const styles = StyleSheet.create({
  app: {
    width: '100%'
  },
  flatList: {
    width: '100%',
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    height: 220,
    margin: 5,
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
  },
  imageContainer: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    opacity: 0.8
  },
  headerStyle: {
    color: 'white',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
})

const itemData = [
  {
    id: 0,
    name: (<Text style={styles.headerStyle}>Progresso</Text>),
    avatar: <Image source={require('../assets/avatar.png')} style={styles.avatar} />,
    image: (<Image source={require('../assets/pizza.png')} style={styles.imageContainer} />),
    title: (<Text style={styles.headerStyle}>Каждый 10 кофе в подарок</Text>),
    description: <Text style={styles.contentText}>Получи скидку при покупке 3 роллов в четверг и пятницу. Акция действует только при предьявлении данного купона и распространяется на все виды роллов</Text>
  },
  {
    id: 1,
    name: (<Text style={styles.headerStyle}>BeautyFirm</Text>),
    avatar: <Image source={require('../assets/avatar.png')} style={styles.avatar} />,
    image: (<Image source={require('../assets/111.jpeg')} style={styles.imageContainer} />),
    title: (<Text style={styles.headerStyle}>Приведи подругу и получи маникюр со скидкой 50: </Text>),
    description: <Text style={styles.contentText}>Получи скидку при покупке 3 роллов в четверг и пятницу. Акция действует только при предьявлении данного купона и распространяется на все виды роллов</Text>
  },
  {
    id: 2,
    name: (<Text style={styles.headerStyle}>АЛМИ</Text>),
    avatar: <Image source={require('../assets/avatar.png')} style={styles.avatar} />,
    image: (<Image source={require('../assets/333.webp')} style={styles.imageContainer} />),
    title: (<Text style={styles.headerStyle}>При покупке от 100 рублей скидка 5%</Text>),
    description: <Text style={styles.contentText}>Получи скидку при покупке 3 роллов в четверг и пятницу. Акция действует только при предьявлении данного купона и распространяется на все виды роллов</Text>
  },
  {
    id: 3,
    name: (<Text style={styles.headerStyle}>Ташкент</Text>),
    avatar: <Image source={require('../assets/avatar.png')} style={styles.avatar} />,
    image: (<Image source={require('../assets/444.jpg')} style={styles.imageContainer} />),
    title: (<Text style={styles.headerStyle}>Каждую пятницу скидка 10% на все меню</Text>),
    description: <Text style={styles.contentText}>Получи скидку при покупке 3 роллов в четверг и пятницу. Акция действует только при предьявлении данного купона и распространяется на все виды роллов</Text>
  },
  {
    id: 4,
    name: (<Text style={styles.headerStyle}>Dodo pizza</Text>),
    avatar: <Image source={require('../assets/avatar.png')} style={styles.avatar} />,
    image: (<Image source={require('../assets/555.png')} style={styles.imageContainer} />),
    title: (<Text style={styles.headerStyle}>Каждая третья пицца в подарок</Text>),
    description: <Text style={styles.contentText}>Получи скидку при покупке 3 роллов в четверг и пятницу. Акция действует только при предьявлении данного купона и распространяется на все виды роллов</Text>
  },
  {
    id: 5,
    name: (<Text style={styles.headerStyle}>ИП Морозова</Text>),
    avatar: <Image source={require('../assets/avatar.png')} style={styles.avatar} />,
    image: (<Image source={require('../assets/111.jpeg')} style={styles.imageContainer} />),
    title: (<Text style={styles.headerStyle}>Первый маникюр бесплатный</Text>),
    description: <Text style={styles.contentText}>Получи скидку при покупке 3 роллов в четверг и пятницу. Акция действует только при предьявлении данного купона и распространяется на все виды роллов</Text>
  },
  {
    id: 6,
    name: (<Text style={styles.headerStyle}>Продтовары</Text>),
    avatar: <Image source={require('../assets/avatar.png')} style={styles.avatar} />,
    image: (<Image source={require('../assets/333.webp')} style={styles.imageContainer} />),
    title: (<Text style={styles.headerStyle}>Скидки на алкоголь после 21.00</Text>),
    description: <Text style={styles.contentText}>Получи скидку при покупке 3 роллов в четверг и пятницу. Акция действует только при предьявлении данного купона и распространяется на все виды роллов</Text>
  },
  {
    id: 7,
    name: (<Text style={styles.headerStyle}>Суши весла</Text>),
    avatar: <Image source={require('../assets/avatar.png')} style={styles.avatar} />,
    image: (<Image source={require('../assets/pizza.png')} style={styles.imageContainer} />),
    title: (<Text style={styles.headerStyle}>Скидка 20% на все роллы на вынос </Text>),
    description: <Text style={styles.contentText}>Получи скидку при покупке 3 роллов в четверг и пятницу. Акция действует только при предьявлении данного купона и распространяется на все виды роллов</Text>
  }
]

export const Coupon = ({ openDetail }) => {
  return (
    <View style={styles.app}>
      <FlatList
        style={styles.flatList}
        data={itemData}
        numColumns={2}
        renderItem={({ item }) =>
          <TouchableWithoutFeedback onPress={() => { openDetail(item) }}>
            <View style={styles.item}>
              {item.image}
              {item.title}
            </View>
          </TouchableWithoutFeedback>
        }
      // keyExtractor={(item) => item.id}
      >
      </FlatList>
    </View>
  )
}
