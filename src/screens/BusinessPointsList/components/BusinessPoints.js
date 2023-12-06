import React, { useState, useRef, useEffect, useCallback } from "react";
import { TouchableWithoutFeedback, StyleSheet, View, FlatList, Image, Text, RefreshControl, ActivityIndicator } from 'react-native';
import BusinessPointsStore from "../../../stores/businessPoints"
import { observer } from "mobx-react-lite"
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { FILE_URL } from '../../../services/constants'

const styles = StyleSheet.create({
  segment: {
    width: '95%',
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
    backgroundColor: 'black',
    paddingHorizontal: 10,
    gap: 16
  },
  app: {
    width: '100%',
    height: '100%',
    paddingBottom: 40
  },
  flatList: {
    width: '100%',
    height: '100%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 5,
    paddingBottom: 7,
    color: 'white'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clock: {
    width: 15,
    height: 15,
  },
  time: {
    color: 'white',
    paddingLeft: 5,
    paddingTop: 3,
    opacity: 0.5
  },
  item: {
    flex: 1,
    flexDirection: 'column',
  },
  businessPoint: {
    flexDirection: 'column',
    width: '97%',
    height: 200,
    margin: 5,
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
  },
  icon: {
    height: '60%',
    width: '100%',
    paddingRight: 10,
    borderRadius: 10,
    opacity: 0.8
  },
  map: {
    width: 16,
    height: 24,
    tintColor: '#0EA47A',
  },
  save: {
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 15,
    color: '#fff',
    paddingTop: 10,
  },
  touch: {
    paddingHorizontal: 10,
    paddingVertical: 10
  }
})


export const BusinessPoints = observer(({ navigation }) => {
  const [isFavoriteList, setIsFavoriteList] = useState(0)
  const [list, setList] = useState([])

  const handleValueChange = async (isFavorite) => {
    setIsFavoriteList(isFavorite)
    if (isFavorite) {
      setList(BusinessPointsStore.favoriteList())
    } else {
      setList(BusinessPointsStore.all)
    }
  };

  useEffect(() => {
    handleValueChange(isFavoriteList)
  }, [BusinessPointsStore.isLoading]);

  const Component = observer(() => (
    <View style={{ width: '97%', flex: 1, gap: 10, alignItems: 'center' }}>
      <SegmentedControl
        style={styles.segment}
        backgroundColor='black'
        tintColor='#0EA47A'
        values={['Все компании', 'Мои компании']}
        selectedIndex={isFavoriteList}
        onChange={(event) => handleValueChange(event.nativeEvent.selectedSegmentIndex)}
      />
      {BusinessPointsStore.isLoading ? <Loading /> : <BusinessPoints />}
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
        numColumns={1}
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
      >
      </FlatList>
    </View >
  );

  return <Component />
})

const Item = ({ navigation, item }) => {
  const [company, setCompany] = useState(item)

  const openDetail = (item) => {
    navigation.navigate('CompanyProfile', { data: item })
  }

  const addToFavorite = (company) => {
    company.favorite = !company.favorite
    setCompany({ ...company })
    BusinessPointsStore.addToFavorite(company.id, company.favorite)
  }

  return (
    <TouchableWithoutFeedback onPress={() => { openDetail(company) }}>
      <View style={styles.businessPoint}>
        <View style={styles.item}>
          <Image source={{ uri: `${FILE_URL}${company.img}.${company.img_ext}` }} style={styles.icon} />
          <View style={styles.header}>
            <Text style={styles.title}>{company.name}</Text>
            {/* <View style={styles.row}>
              <Image source={require('../../../../assets/time.png')} style={styles.clock} />
              <Text style={styles.time}> 9:00 - 22:00</Text>
            </View> */}
          </View>
        </View>

        <View style={styles.header}>
          <View style={styles.row}>
            <Image source={require('../../../../assets/mapIcon.png')} style={styles.map} />
            <Text style={styles.time}>{company.dist ? company.dist + ' метров' : ''}</Text>
          </View>
          <View style={styles.save}>
            <TouchableWithoutFeedback style={styles.save} onPress={() => { addToFavorite(company) }}>
              <View style={styles.touch}>
                <Image source={company.favorite ? require('../../../../assets/saveSelected.png') : require('../../../../assets/save.png')} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}