import React, { useState, useCallback, useEffect } from "react";
import { TouchableWithoutFeedback, StyleSheet, View, FlatList, Image, Text, RefreshControl, ActivityIndicator } from 'react-native';
import PromotionStore from "../../../stores/promotion"
import { observer } from "mobx-react-lite"

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


export const Coupon = observer(({ openDetail }) => {
  const [items, setItems] = useState(PromotionStore.list)
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageMaxAmountReached, setIsPageMaxAmountReached] = useState(PromotionStore.currentList.length == 10);

  const savePromotion = (id) => {
    const newItems = [...PromotionStore.list]
    const index = newItems.findIndex(item => item.id === id)
    const favoriteItem = PromotionStore.list[index]
    favoriteItem.favorite = !favoriteItem.favorite
    PromotionStore.addToFavorite(favoriteItem.id, favoriteItem.favorite)
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
    }, 1000);
  }

  const fetchItems = useCallback(async () => {
    // console.log('11111111', PromotionStore.currentList.length == 10)
    // setIsPageMaxAmountReached(PromotionStore.currentList.length == 10)
    if (!isPageMaxAmountReached) {
      console.log('33333333')
      return
    } else {
    setIsLoading(true);
      try {
        await PromotionStore.getList()
        const isReached = PromotionStore.currentList.length == 10
        setIsPageMaxAmountReached(isReached)
        console.log('11111111', isReached)
        console.log('22222222', isPageMaxAmountReached)
      } catch (error) {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => { }, []);

  const renderFooter = () => {
    if (isLoading) {
      return <ActivityIndicator style={{ marginVertical: 20 }} size="large" color="white" />;
    }
    return null;
  };

  return (
    <View style={styles.app}>
      <FlatList
        style={styles.flatList}
        data={PromotionStore.list}
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
                <Image source={{ uri: `http://31.220.77.203:8888/api/v1/file/${item.img}.${item.img_ext}` }} style={styles.icon} />
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
})
