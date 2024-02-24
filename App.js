import { Platform } from 'react-native';
import { useEffect } from 'react';
import { Main } from './src/main'
import * as NavigationBar from 'expo-navigation-bar';
import 'expo-dev-client';
import * as Sentry from 'sentry-expo';
import * as Updates from 'expo-updates';

Sentry.init({
  dsn: 'https://803698e536aa4528ac38b38788093389@app.glitchtip.com/5267',
  enableInExpoDevelopment: true,
  debug: false
});

export default function App() {
  if (Platform.OS == 'android') {
    NavigationBar.setBackgroundColorAsync("black");
  }

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        alert(`Готово новое обновление`);
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Ошибка при загрузке обновления: ${error}`);
    }
  }

  useEffect(() => { onFetchUpdateAsync() }, []);

  return (
    <Main />
  );
};

