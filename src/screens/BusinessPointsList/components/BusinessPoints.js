import React, { useState, useRef, useEffect, useCallback } from "react";
import { TouchableWithoutFeedback, StyleSheet, View, FlatList, Image, Text, RefreshControl, ActivityIndicator } from 'react-native';
import BusinessPointsStore from "../../../stores/businessPoints"
import { observer } from "mobx-react-lite"
import SegmentedControl from '@react-native-segmented-control/segmented-control';

const styles = StyleSheet.create({
  segment: {
    width: '97%',
    height: 35,
    borderWidth: 1,
    borderColor: '#434343',
  },
  textStyle: {
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 10
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 10,
    gap: 16
  },
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
  businessPoint: {
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


export const BusinessPoints = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFavoriteList, setIsFavoriteList] = useState(0)

  const flatListRef = useRef(null);

  useEffect(() => {
    init()
  }, []);

  const init = (isFavorite) => {
    setIsLoading(true)
    BusinessPointsStore.resetLists();
    setTimeout(async () => {
      await BusinessPointsStore.getList(isFavorite);
      setIsLoading(false)
    }, 400)
  }

  const handleValueChange = async (isFavorite) => {
    setIsFavoriteList(isFavorite)
    init(!!isFavorite)
  };

  const handleRefresh = () => {
    init(!!isFavoriteList)
  }

  const handleOnEndReached = useCallback(async () => {
    if (BusinessPointsStore.finishScroll || BusinessPointsStore.isLoding) return
    await BusinessPointsStore.getList(!!isFavoriteList)
  }, [])

  const Component = () => (
    <View style={{width: '100%', flex: 1, gap: 10, alignItems: 'center'}}>
      <SegmentedControl
        style={styles.segment}
        backgroundColor='black'
        tintColor='#0EA47A'
        values={['Все компании', 'Мои компании']}
        selectedIndex={isFavoriteList}
        onChange={(event) => handleValueChange(event.nativeEvent.selectedSegmentIndex)}
      />
      {isLoading ? <Loading/> : <BusinessPoints/>}
    </View >
  )

  const renderFooter = observer(() => {
    if (BusinessPointsStore.isLoding) {
      return <ActivityIndicator style={{ marginVertical: 20 }} size="large" color="white" />;
    }
    return null
  });

  const Loading = () => (
    <ActivityIndicator style={{ marginVertical: '80%' }} size="large" color="#0EA47A" />
  )

  const BusinessPoints = observer(() => (
    <View style={styles.app}>
      <FlatList
        ref={flatListRef}
        style={styles.flatList}
        data={BusinessPointsStore.list}
        numColumns={2}
        refreshControl={
          <RefreshControl
            onRefresh={handleRefresh}
            colors={['#0EA47A']}
            tintColor={'white'}
            progressViewOffset={5}
          />
        }
        renderItem={({ item }) =>  <Item item={item} navigation={navigation}/>}
        keyExtractor={(item) => item.id}
        onEndReached={() => { handleOnEndReached() }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      >
      </FlatList>
    </View >
  ));

  return <Component/>
}

const Item = ({ navigation, item }) => {
  const [company, setCompany] = useState(item)

  const openDetail = (item) => {
    navigation.navigate('CompanyProfile', {data: item})
  }

  const addToFavorite = (company) => {
    setCompany({...company, favorite: !company.favorite})
    BusinessPointsStore.addToFavorite(company.id, !company.favorite)
  }

  return (
    <TouchableWithoutFeedback onPress={() => { openDetail(company) }}>
      <View style={styles.businessPoint}>
        <View style={styles.item}>
          <Image source={{ uri: `http://31.220.77.203:8888/api/v1/file/${company.img}.${company.img_ext}` }} style={styles.icon} />
          <Text style={styles.title}>{company.name}</Text>
        </View>
        <TouchableWithoutFeedback style={styles.icon} onPress={() => {  addToFavorite(company) }}>
          <View style={styles.save}>
            <Image source={company.favorite ? require('../../../../assets/saveSelected.png') : require('../../../../assets/save.png')} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  )
}