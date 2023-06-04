import React, { useState }  from "react";
import { TouchableWithoutFeedback, StyleSheet, View, FlatList, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
  app: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50
  },
  flatList: {
    width: '100%',
    height: '100%'
  },
  item: {
    flex: 1,
    flexDirection: 'column',
  },
  coupon: {
    flexDirection: 'column',
    width: '47%',
    height: 220,
    margin: 5,
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  icon: {
  },
  save: {
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingBottom: 10
  }
})



export const Coupon = ({ openDetail, itemData }) => {
  const [items, setItems] = useState(itemData)
  const savePromotion = (id) => { 
    const newItems = [...items]
    const index = newItems.findIndex(item => item.id === id)
    itemData[index].favorite = !itemData[index].favorite
    setItems(newItems)
  }
  
  return (
    <View style={styles.app}>
      <FlatList
        style={styles.flatList}
        data={itemData}
        numColumns={2}
        renderItem= {({item}) =>
        <TouchableWithoutFeedback onPress={() => { openDetail(item) }}>
        <View style={styles.coupon}>
          <View style={styles.item}>
            {item.image}
            {item.title}
          </View>
          <TouchableWithoutFeedback style={styles.icon} onPress={() => { savePromotion(item.id) }}>
            <View style={styles.save}>
              <Image source={item.favorite ? require('../assets/saveSelected.png') : require('../assets/save.png')} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
         }
      // keyExtractor={(item) => item.id}
      > 
    </FlatList>
    </View >
  )
}
