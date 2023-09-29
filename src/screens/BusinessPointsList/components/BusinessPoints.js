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


export const BusinessPoints = observer(({ navigation }) => {
  const [isFavoriteList, setIsFavoriteList] = useState(0)
  const [list, setList] = useState([])

  const handleValueChange = async (isFavorite) => {
    setIsFavoriteList(isFavorite)
    if (isFavorite) {
      setList(BusinessPointsStore.favorite)
    } else {
      setList(BusinessPointsStore.all)
    }
  };

  useEffect(() => {
    handleValueChange(isFavoriteList)
  }, [BusinessPointsStore.isLoading]);

  const Component = observer(() => (
    <View style={{width: '100%', flex: 1, gap: 10, alignItems: 'center'}}>
      <SegmentedControl
        style={styles.segment}
        backgroundColor='black'
        tintColor='#0EA47A'
        values={['Все компании', 'Мои компании']}
        selectedIndex={isFavoriteList}
        onChange={(event) => handleValueChange(event.nativeEvent.selectedSegmentIndex)}
      />
      {BusinessPointsStore.isLoading ? <Loading/> : <BusinessPoints/>}
    </View >
  ))

  const Loading = () => (
    <ActivityIndicator style={{ marginVertical: '80%' }} size="large" color="#0EA47A" />
  )

  const BusinessPoints = () => (
    <View style={styles.app}>
      <FlatList
        style={styles.flatList}
        data={list}
        numColumns={2}
        renderItem={({ item }) =>  <Item item={item} navigation={navigation}/>}
        keyExtractor={(item) => item.id}
      >
      </FlatList>
    </View >
  );

  return <Component/>
})

const Item = ({ navigation, item }) => {
  const [company, setCompany] = useState(item)

  const openDetail = (item) => {
    // navigation.navigate('CompanyProfile', {data: item})
  }

  const addToFavorite = (company) => {
    company.favorite = !company.favorite
    setCompany({...company})
    BusinessPointsStore.addToFavorite(company.id, company.favorite)
  }

  return (
    <TouchableWithoutFeedback onPress={() => { openDetail(company) }}>
      <View style={styles.businessPoint}>
        <View style={styles.item}>
          <Image source={{ uri: `http://31.220.77.203:8888/api/v1/file/${company.img}.${company.img_ext}` }} style={styles.icon} />
          <Text style={styles.title}>{company.name} {company.dist} {company.favorite} </Text>
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