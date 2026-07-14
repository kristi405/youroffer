import { StatusBar, View, Alert } from 'react-native';
import { Navigator } from './navigation/navigator'
import { observer } from 'mobx-react-lite';
import { COLORS } from './services/constants'
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
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <StatusBar style={{ color: COLORS.background }} barStyle="dark-content" backgroundColor="black" />
      <Navigator/>
    </View>
  ); 
});