import { StatusBar, View } from 'react-native';
import { Navigator } from './navigation/navigator'
import { observer } from 'mobx-react-lite';

export const Main = observer(() => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar style={{ color: 'black' }} barStyle="dark-content" backgroundColor="black" />
      <Navigator/>
    </View>
  );
});