import { Platform } from 'react-native';
import { Main } from './src/main'
import * as NavigationBar from 'expo-navigation-bar';
import 'expo-dev-client';

export default function App() {
  if (Platform.OS == 'android') {
    NavigationBar.setBackgroundColorAsync("black");
  }
  return (
    <Main />
  );
};