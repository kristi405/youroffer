import { StatusBar, Text, View, StyleSheet } from 'react-native';
import { Navigator } from './navigation/navigator'
import { observer } from 'mobx-react-lite';

export const Main = observer(() => {
  return (
    <View style={{ flex: 1, paddingTop: 0, backgroundColor: 'black' }}>
      <StatusBar style={{ color: 'black' }} barStyle="dark-content" backgroundColor="black" />
      <Navigator/>
    </View>
  );
});