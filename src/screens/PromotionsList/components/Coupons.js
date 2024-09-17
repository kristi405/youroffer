import React, { useState, useRef, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { TouchableWithoutFeedback, StyleSheet, View, FlatList, Image, Text, RefreshControl, ActivityIndicator } from 'react-native';
import PromotionStore from "../../../stores/promotion"
import { observer } from "mobx-react-lite"
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { FILE_URL } from '../../../services/constants'
import { FIRST_INIT, setFirstInit } from '../../../services/globals'

const styles = StyleSheet.create({
  segment: {
    width: '96%',
    height: 35,
    borderWidth: 1,
    borderColor: '#434343',
  },
  headerView: {
    flexDirection: 'row',
    paddingTop: 10,
    gap: 8,
    paddingHorizontal: 10,
    width: '95%',
    alignItems:'center'
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10
  },
  textStyle: {
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 10
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    paddingHorizontal: 10,
    gap: 16
  },
  app: {
    width: '100%',
    height: '100%',
    alignContent: 'center',
    paddingBottom: 40
  },
  flatList: {
    width: '100%',
    height: '100%',
  },
  item: {
    flex: 1,
    flexDirection: 'column',
  },
  coupon: {
    flexDirection: 'column',
    width: '47%',
    height: 230,
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
    fontSize: 13,
    color: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
  },
  businessPointsName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0EA47A',
    paddingRight: 15
  },
  save: {
    alignItems: 'flex-end',
  },
  touch: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  hidden: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    opacity: 0
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 600
  },
  emptyViewInCompany: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImg: {
    height: 35,
    width: 35,
    opacity: 0.6
  },
  emptyText: {
    color: '#fff',
    fontSize: 16
  },
  emptyRow: {
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 10
  },
  emptyTextWithIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

//Переменная означает что мы перешли на экран акции
// для того чтобы не перезгружать страницу и чтобы не потерялась прокрутка
let fromPromotionPage = false

export const Coupons = ({ navigation, isCompanyPromotions, businessPointId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFavoriteList, setIsFavoriteList] = useState(0)

  const flatListRef = useRef(null);
  useFocusEffect(
    React.useCallback(() => {
      init(PromotionStore.isFavoriteBlock)
    }, [])
  );

  const init = async (isFavorite) => {
    if (fromPromotionPage && !businessPointId)  {
      fromPromotionPage = false;
      return;
    }

    if (businessPointId) {
      fromPromotionPage = false;
    }

    if (FIRST_INIT) {
      setFirstInit()
    } else {
      setIsLoading(true)
      PromotionStore.resetLists();
      await PromotionStore.getList(isFavorite, businessPointId);
      setIsLoading(false)
    }
  }

  const handleValueChange = async (isFavorite) => {
    setIsFavoriteList(isFavorite)
    PromotionStore.isFavoriteBlock = !!isFavorite
    init(!!isFavorite)
  };

  const handleRefresh = () => {
    init(!!isFavoriteList)
  }

  const handleOnEndReached = useCallback(async () => {
    if (PromotionStore.finishScroll || PromotionStore.isLoding) return
    await PromotionStore.getList(!!isFavoriteList, businessPointId)
  }, [])

  const Component = () => (
    <View style={{ width: '100%', flex: 1, gap: 10, alignItems: 'center' }}>
      {!isCompanyPromotions ?
        <SegmentedControl
          enabled={!isLoading}
          style={styles.segment}
          backgroundColor='black'
          tintColor='#0EA47A'
          values={['Все акции', 'Мои акции']}
          selectedIndex={isFavoriteList}
          onChange={(event) => {
            if (isLoading) return;
            setIsLoading(true)
            handleValueChange(event.nativeEvent.selectedSegmentIndex)
          }
          }
        /> : null}
      {isLoading ? <Loading /> : <Coupons />}
    </View >
  )

  const renderFooter = observer(() => {
    if (PromotionStore.isLoding) {
      return <ActivityIndicator style={{ marginVertical: 20 }} size="large" color="white" />;
    }
    return null
  });

  const Loading = () => (
    <ActivityIndicator style={{ marginVertical: '80%' }} size="large" color="#0EA47A" />
  )

  const EmptyComponent = () => {
    if (isFavoriteList) {
      return (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>Чтобы добавить в "Мои акции"</Text>
          <View style={styles.emptyRow}>
            <Text style={styles.emptyText}>нажмите на иконку</Text>
            <Image source={require('../../../../assets/save.png')} />
          </View>
        </View >
      )
    } else {
      return (
        <View style={styles.emptyViewInCompany}>
          <Text style={styles.emptyText}>Нет доступных акций</Text>
          <Text style={styles.emptyText}>Для загрузки сделайте свайп вниз</Text>
          <Text></Text>
          <Image style={styles.emptyImg} source={require('../../../../assets/swipe-down.png')} />
        </View>
      )
    }

  }

  const Coupons = observer(() => {
    return <View style={styles.app}>
      <FlatList
        ref={flatListRef}
        style={styles.flatList}
        data={PromotionStore.list}
        ListEmptyComponent={EmptyComponent}
        contentContainerStyle={{ paddingBottom: 20 }}
        numColumns={2}
        refreshControl={
          <RefreshControl
            onRefresh={handleRefresh}
            colors={['#0EA47A']}
            tintColor={'white'}
            progressViewOffset={5}
          />
        }
        renderItem={({ item }) => <Item item={item} navigation={navigation} businessPointId={businessPointId} />}
        keyExtractor={(item) => item.id}
        onEndReached={() => { handleOnEndReached() }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      >
      </FlatList>
    </View >
  });

  return <Component />
}

const Item = ({ navigation, item, businessPointId }) => {
  const [offer, setOffer] = useState(item)

  const openDetail = (item) => {
    if (!businessPointId) fromPromotionPage = true;
    navigation.navigate('CouponDetailScreen', { data: item })
  }

  let timer;
  const addToFavorite = (offer) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      setOffer({ ...offer, favorite: !offer.favorite })
      PromotionStore.addToFavorite(offer.id, !offer.favorite)
    }, 200)
  }

  const AddToFavoriteView = ({offer}) => {
    if (offer.type === 'present') return (
      <TouchableWithoutFeedback >
        <View style={styles.hidden}>
          <Image source={offer.favorite ? require('../../../../assets/saveSelected.png') : require('../../../../assets/save.png')} />
        </View>
      </TouchableWithoutFeedback>
    )

    return (
      <TouchableWithoutFeedback onPress={() => { addToFavorite(offer) }}>
        <View style={styles.touch}>
          <Image source={offer.favorite ? require('../../../../assets/saveSelected.png') : require('../../../../assets/save.png')} />
        </View>
      </TouchableWithoutFeedback>
    )
  } 

  return (
    <TouchableWithoutFeedback onPress={() => { openDetail(offer) }}>
      <View style={styles.coupon}>
        <View style={styles.item}>
          <Image source={{ uri: `${FILE_URL}${offer.img}.${offer.img_ext}` }} style={styles.icon} />
          <View style={styles.headerView}>
            <Image source={{ uri: `${FILE_URL}${offer.business_points[0].img}.${offer.business_points[0].img_ext}` }} style={styles.avatar} />
            <Text style={styles.businessPointsName}>{offer.business_points[0].name}</Text>
          </View>
          <Text style={styles.title}>{offer.name}</Text>
        </View>
        <View style={styles.save}>
          <AddToFavoriteView offer={offer} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}