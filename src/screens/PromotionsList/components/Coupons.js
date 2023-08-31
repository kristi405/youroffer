import React, { useState, useCallback, useEffect } from "react";
import { TouchableWithoutFeedback, StyleSheet, View, FlatList, Image, Text, RefreshControl, ActivityIndicator } from 'react-native';
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
    width: '100%',
    paddingRight: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 15,
    color: '#fff',
    paddingLeft: 10,
    paddingTop: 10,
  },
  save: {
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingBottom: 10
  }
})



export const Coupon = ({ openDetail}) => {
  const [data, setData] = useState([]);
  const [items, setItems] = useState(data)
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const savePromotion = (id) => {
    const newItems = [...data]
    const index = newItems.findIndex(item => item.id === id)
    data[index].favorite = !data[index].favorite
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

  const fetchItems = useCallback(async () => {
    if (isLoading) {
      return
    } else {
    setIsLoading(true);
    
    try {
      PromotionStore.getList();
      setTimeout(() => {
        const newData = PromotionStore.list;
        setData(prevData => [...prevData, ...newData]);
        setIsLoading(false);
      }, 2000);

    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const renderFooter = () => {
    if (!isLoading) return null;
    return <ActivityIndicator style={{ marginVertical: 20 }} size="large" color="white" />;
  };

  return (
    <View style={styles.app}>
      <FlatList
        style={styles.flatList}
        data={data}
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
        renderItem={({ item }) =>
          <TouchableWithoutFeedback onPress={() => { openDetail(item) }}>
            <View style={styles.coupon}>
              <View style={styles.item}>
                <Image source={{ uri: `http://192.168.0.112:8888/api/v1/file/${item.img}.${item.img_ext}` }} style={styles.icon} />
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
        onEndReached={fetchItems}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      >
      </FlatList>
    </View >
  )
}
