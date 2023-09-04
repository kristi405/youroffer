import React from 'react';
import { StyleSheet, View } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { Company } from "./BusinessPoint";
import { MyCompany } from "./MyBusinessPoint";
import BusinessPointsStore from "../../../stores/businessPoints"
import { useNavigation } from '@react-navigation/native';


export const SegmentsCompany = ( ) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const navigation = useNavigation();

  const handleValueChange = (index) => {
    setSelectedIndex(index)
    BusinessPointsStore.page = 1
  };

  const openDetail = item => {
    navigation.navigate('CompanyProfile', {data: item})
}

  return (
    <View style={{width: '100%', flex: 1, gap: 10, alignItems: 'center'}}>
      <SegmentedControl style={styles.segment} backgroundColor='black' tintColor='#0EA47A'
        values={['Все компании', 'Мои компании']}
        selectedIndex={selectedIndex}
        onChange={(event) => handleValueChange(event.nativeEvent.selectedSegmentIndex)}
      />
      {selectedIndex === 0 && <Company openDetail={openDetail}/>}
      {selectedIndex === 1 && <MyCompany openDetail={openDetail}/>}
    </View>
  )
}

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
})