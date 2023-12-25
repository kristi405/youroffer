import { Platform } from 'react-native';
import { Main } from './src/main'
import * as NavigationBar from 'expo-navigation-bar';
import 'expo-dev-client';
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'https://803698e536aa4528ac38b38788093389@app.glitchtip.com/5267',
  enableInExpoDevelopment: true,
  debug: true,
  tracesSampleRate: 1.0,
});

export default function App() {
  if (Platform.OS == 'android') {
    NavigationBar.setBackgroundColorAsync("black");
  }
  return (
    <Main />
  );
};

