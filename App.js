import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LoginScreen } from './registration/loginScreen';
import { CodeScreen } from './registration/CodeScreen';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { CreateUserScreen } from './registration/createUserScreen';
import { TabBar } from './Main/TabBar';
import { CouponDetailScreen } from './Main/CouponDetailScreen';
import { QrCodeScreen } from './Main/qrCodeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="CodeScreen" component={CodeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} options={{headerShown: false}}/>
        <Stack.Screen name="CouponScreen" component={TabBar} options = {{headerShown: false}}/>
        <Stack.Screen name="CouponDetailScreen" component={CouponDetailScreen} options={{title: 'MyCoupon',
        headerTitleStyle:{color: '#0EA47A'}, headerTintColor: 'white', headerStyle:{backgroundColor: 'black'}}}/>
        <Stack.Screen name="QrCodeScreen" component={QrCodeScreen} options={{title: 'QR code', 
        headerTitleStyle:{color: '#0EA47A'}, headerTintColor: 'white', headerStyle:{backgroundColor: 'black'}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};