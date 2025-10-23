import React, { useState, useEffect } from "react";
import { TouchableWithoutFeedback, StyleSheet, View, FlatList, RefreshControl, Image, Text, ActivityIndicator, Linking, TextInput } from 'react-native';
import BusinessPointsStore from "../../../stores/businessPoints"
import { observer } from "mobx-react-lite"
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { FILE_URL } from '../../../services/constants'
import { getLocation } from '../../../services/geo'
import { useFocusEffect } from '@react-navigation/native';
import { SearchBlock } from '../../../components/searchBusinessPoint'

const styles = StyleSheet.create({
  segment: {
    width: '95%',
    height: 35,
    borderWidth: 1,
    borderColor: '#434343',
    borderRadius: 10,
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
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 5,
    paddingBottom: 3,
    color: 'white'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rowInst: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -5,
    gap: 5,
    zIndex: 3, // works on ios
    elevation: 3, // works on android
  },
  column: {
    flexDirection: 'column',
    gap: 5
  },
  clock: {
    width: 14,
    height: 14,
  },
  time: {
    color: 'white',
    paddingLeft: 5,
    paddingTop: 2,
    opacity: 0.5
  },
  instText: {
    color: '#E1306C',
    fontSize: 14,
  },
  item: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: 'row',
    gap: 25
  },
  businessPoint: {
    flexDirection: 'column',
    width: '96%',
    height: 136,
    margin: 7,
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
  },
  icon: {
    height: 80,
    width: 80,
    borderRadius: 40,
    opacity: 1
  },
  map: {
    width: 26,
    height: 24,
    tintColor: '#0EA47A',
  },
  save: {
    alignItems: 'flex-end',
    flex: 1,
    paddingRight: 5,
  },
  instagramIcon: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 15,
    color: '#fff',
    paddingTop: 0,
  },
  addressText: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.8
  },
  touch: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 600
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
  },
  emptyViewInCompany: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: 'row',
  },
  mainIconBlock: {
    width: "32%",
  },
  mainInfoBlock: {
    width: "58%"
  },
  deliveryBlock: {
    flex: 1,
    width: "10%",
    alignItems: 'end',
  },
  deliveryIcon: {
    height: 30,
    width: 30,
    marginLeft: 7
  }
})


export const BusinessPoints = observer(({ navigation }) => {
  const [isFavoriteList, setIsFavoriteList] = useState(BusinessPointsStore.isFavorite ? 1 : 0)

  const handleValueChange = async (isFavorite) => {
    BusinessPointsStore.setIsFavorite(isFavorite)
    setIsFavoriteList(isFavorite)
  };

  useFocusEffect((React.useCallback(() => {
    BusinessPointsStore.setIsFavorite(0)
    setIsFavoriteList(0)
  }, [])))

  const Component = observer(() => (
    <View style={{ width: '96%', flex: 1, gap: 10, alignItems: 'center' }}>
      <SegmentedControl
        style={styles.segment}
        backgroundColor='black'
        tintColor='#0EA47A'
        values={['Все компании', 'Мои компании']}
        fontStyle={{ color:  '#0EA47A', fontSize: 14, fontWeight: '400' }}
        activeFontStyle={{color: 'black', fontSize: 14, fontWeight: '600'}}
        selectedIndex={isFavoriteList}
        onChange={(event) => handleValueChange(event.nativeEvent.selectedSegmentIndex)}
      />
      {BusinessPointsStore.isLoading
        ? <Loading />
        : <BusinessPointsList
            isFavoriteList={isFavoriteList}
            navigation={navigation}
        />
    }
    </View >
  ))

  return <Component />
})


const Loading = () => {
  return <ActivityIndicator style={{ marginVertical: '80%' }} size="large" color="#0EA47A" />
}

const BusinessPointsList = observer(({ isFavoriteList, navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const EmptyComponent = () => {
    if (isFavoriteList) {
      return (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>Чтобы добавить в "Мои компании"</Text>
          <View style={styles.emptyRow}>
            <Text style={styles.emptyText}>нажмите на иконку</Text>
            <Image source={require('../../../../assets/save.png')} />
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.emptyViewInCompany}>
          <Text style={styles.emptyText}>Нет доступных компаний</Text>
          <Text style={styles.emptyText}>Для загрузки сделайте свайп вниз</Text>
          <Text></Text>
          <Image style={styles.emptyImg} source={require('../../../../assets/swipe-down.png')} />
        </View>
      )
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true);
    await getLocation(true)
    await BusinessPointsStore.getAll()
    setRefreshing(false);
  }

  return (
    <View style={styles.app}>
      <FlatList
        ListEmptyComponent={EmptyComponent}
        contentContainerStyle={{ paddingBottom: 60 }}
        style={styles.flatList}
        data={BusinessPointsStore.all || []}
        numColumns={1}
        renderItem={({ item }) => <Item item={item} navigation={navigation} key={item.id} />}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            onRefresh={handleRefresh}
            refreshing={refreshing}
            colors={['#0EA47A']}
            tintColor={'white'}
            progressViewOffset={5}
          />
        }
      >
      </FlatList>
    </View >
  );
})

const Item = ({ navigation, item }) => {
  if (!item || !item.id) return null
  const [company, setCompany] = useState(item)
  let workTime = '-'

  if (item.start_time && item.end_time) {
    const [start_h, start_m] = item.start_time.split(':')
    const [end_h, end_m] = item.end_time.split(':')
    workTime = `${start_h}:${start_m} - ${end_h}:${end_m}`
  }

  const openDetail = (item) => {
    navigation.navigate('CompanyProfile', { data: item })
  }

  let timer;
  const addToFavorite = (company) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      company.favorite = !company.favorite
      setCompany({ ...company })
      BusinessPointsStore.addToFavorite(company.id, company.favorite)
    }, 200)
  }


  const openInstagram = async (url) => {
    url = url.trim();
    instagram = url.split('?')[0];
    instagram = instagram.replace("https://", '')
    instagram = instagram.replace("www.", '')
    instagram = instagram.replace("instagram.com/", '')
    instagram = instagram.replace("/", '')
    if (instagram) {
        try {
            await Linking.openURL(`instagram://user?username=${instagram}`)
        } catch (e) {
            await Linking.openURL(url)
        }
    }
  };

  const openDelivery = async (url) => {
    url = url?.trim();
    await Linking.openURL(url);
  }

  const cutAddress = (address) => {
    if (address?.length > 30) {
      return `${address.slice(0, 30)} ..`
    }

    return address.slice(0, 30)
  }

  return (
    <TouchableWithoutFeedback onPress={() => { openDetail(company) }}>
      <View style={styles.businessPoint}>
        <View style={styles.marginWrapper}>
          <View style={styles.mainIconBlock}>
            <Image source={{ uri: `${FILE_URL}${company.img}.${company.img_ext}` }} style={styles.icon} />
          </View>
          <View style={styles.mainInfoBlock}>
            <View style={styles.column}>
              <Text style={styles.title}>{company.name}</Text>
              <Text style={styles.addressText}>{ cutAddress(company.address) }</Text>
              <View style={styles.row}>
                <Image source={require('../../../../assets/time.png')} style={styles.clock} />
                <Text style={styles.time}>{workTime}</Text>
              </View>
              {/* {
                company.instagram?.trim() ? <TouchableWithoutFeedback onPress={() => {openInstagram(company.instagram)}}>
                  <View style={styles.rowInst}>
                    <Image source={require('../../../../assets/instagram3.png')} style={styles.instagramIcon} />
                    <Text style={styles.instText}>Instagram</Text>
                  </View>
                </TouchableWithoutFeedback> : null
              } */}
            </View>
          </View>
            {
              company.delivery_url?.trim() ? <View style={styles.deliveryBlock}><TouchableWithoutFeedback onPress={() => {openDelivery(company.delivery_url)}}>
              <Image source={require('../../../../assets/delivery.png')} style={styles.deliveryIcon} />
            </TouchableWithoutFeedback></View> : null
            }

        </View>

        <View style={styles.header}>
          <View style={styles.row}>
            <Image source={require('../../../../assets/mapIcon.png')} style={styles.map} />
            <Text style={styles.time}>{company.dist ? company.dist / 1000 + ' км' : 'нет доступа'}</Text>
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