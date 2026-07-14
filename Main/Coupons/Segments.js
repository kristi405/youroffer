import React from 'react';
import { StyleSheet } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

export const Segments = ({event}) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0)
   
    return (
        <SegmentedControl style={styles.segment} backgroundColor = 'black' tintColor='#0EA47A'
        values={['Все акции', 'Мои акции']}
        selectedIndex={selectedIndex}
        // onChange = {setSelectedIndex({selectedIndex: 1})}
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
    }
  })