import { StatusBar, Text, View, StyleSheet } from 'react-native';
import { Navigator } from './navigation/navigator'
import MainStore from './stores/main'
import AnimatedLoader from "react-native-animated-loader";
import { observer } from 'mobx-react-lite';

export const Main = observer(() => {
  return (
    <View style={{ flex: 1, paddingTop: 0, backgroundColor: 'black' }}>
      <StatusBar style={{ color: 'black' }} barStyle="dark-content" backgroundColor="black" />
      <Navigator/>
    </View>
  );
});

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200,
  },
});