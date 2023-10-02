import { Main } from './src/main'
import * as NavigationBar from 'expo-navigation-bar';

export default function App() {
  NavigationBar.setBackgroundColorAsync("black");
  return (
    <Main/>
  );
};