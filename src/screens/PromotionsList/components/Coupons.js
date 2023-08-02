import React, { useState }  from "react";
import { TouchableWithoutFeedback, StyleSheet, View, FlatList, Image, Text, RefreshControl } from 'react-native';
import PromotionStore from "../../../stores/promotion"
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
    height: '60%',
    width: '90%',
  },
  title: {
    fontSize: 15,
    color: '#fff',
    paddingLeft: 10,
  },
  save: {
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingBottom: 10
  }
})



export const Coupon = ({ openDetail, itemData }) => {
  const [items, setItems] = useState(itemData)
  const [isRefreshing, setIsRefreshing] = useState(false);
  const savePromotion = (id) => {
    const newItems = [...items]
    const index = newItems.findIndex(item => item.id === id)
    itemData[index].favorite = !itemData[index].favorite
    setItems(newItems)
  }

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData()
  }

  const fetchData = () => {
    setTimeout(() => {
      PromotionStore.getList();
      setIsRefreshing(false);
    }, 2000);
  }

  return (
    <View style={styles.app}>
      <FlatList
        style={styles.flatList}
        data={itemData}
        numColumns={2}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={['white']}
            tintColor={'white'}
            progressViewOffset={5}
          />
        }
        renderItem= {({item}) =>
        <TouchableWithoutFeedback onPress={() => { openDetail(item) }}>
        <View style={styles.coupon}>
          <View style={styles.item}>
            <Image source={item.img} style={styles.icon} />
            <Text style={styles.title}>{item.name}</Text>
          </View>
          <TouchableWithoutFeedback style={styles.icon} onPress={() => { savePromotion(item.id) }}>
            <View style={styles.save}>
              <Image source={item.favorite ? require('../../../../assets/saveSelected.png') : require('../../../../assets/save.png')} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
         }
      keyExtractor={(item) => item.id}
      >
    </FlatList>
    </View >
  )
}
