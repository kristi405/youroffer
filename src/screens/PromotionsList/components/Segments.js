import React from 'react';
import { StyleSheet, View } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { Coupon } from "./Coupons";

export const Segments = ({navigation}) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const handleValueChange = (index) => {
      setSelectedIndex(index)
    };

    return (
        <SegmentedControl style={styles.segment} backgroundColor = 'black' tintColor='#0EA47A'
        values={['Все акции', 'Мои акции']}
        selectedIndex={selectedIndex}
        onChange={(event) => handleValueChange(event.nativeEvent.selectedSegmentIndex)}
      />
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