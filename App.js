import { Platform, Alert } from 'react-native';
import { useEffect } from 'react';
import { Main } from './src/main'
import * as NavigationBar from 'expo-navigation-bar';
import 'expo-dev-client';
// import * as Sentry from 'sentry-expo';
import * as Updates from 'expo-updates';

// Sentry.init({
//   dsn: 'https://803698e536aa4528ac38b38788093389@app.glitchtip.com/5267',
//   enableInExpoDevelopment: false,
//   debug: false
// });


export default function App() {
  if (Platform.OS == 'android') {
    NavigationBar.setBackgroundColorAsync("black");
  }

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (!update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
        Alert.alert('', "Пожалуйста, не выключайте приложение, идет обновление",
        [
            {
                text: 'ОК',
                onPress: () => {},
                style: 'cancel',
            },
        ])
      }
    } catch (error) {
      // Sentry.Native.captureException(error, (scope) => {
      //   scope.setTransactionName('onFetchUpdateAsync');
      //   return scope;
      // });
    }
  }

  useEffect(() => { onFetchUpdateAsync() }, []);

  return (
    <Main />
  );
};

