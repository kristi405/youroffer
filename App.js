import { Platform } from 'react-native';
import { Main } from './src/main'
import * as NavigationBar from 'expo-navigation-bar';
import 'expo-dev-client';
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'https://cbb9d553fffa9e67020bf3b9e2c16c28@o4506351601647616.ingest.sentry.io/4506351603154944',
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