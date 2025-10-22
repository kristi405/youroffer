import { StatusBar, View, Alert } from 'react-native';
import { Navigator } from './navigation/navigator'
import { observer } from 'mobx-react-lite';
// import NetInfo from '@react-native-community/netinfo';

// NetInfo.addEventListener(state => {
//   if (!state.isConnected) {
//     Alert.alert('', "Нет соединения с интернетом",
//     [
//       {
//         text: 'ОК',
//       },
//     ])
//   }
// });

export const Main = observer(() => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar style={{ color: 'black' }} barStyle="dark-content" backgroundColor="black" />
      <Navigator/>
    </View>
  );
});