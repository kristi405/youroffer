import { Text, View } from 'react-native';
import { LoginScreen } from './registration/loginScreen';
import { CodeScreen } from './registration/CodeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateUserScreen } from './registration/createUserScreen';
import { TabBar } from './Main/TabBar';
import { CouponDetailScreen } from './Main/CouponDetailScreen';
import { QrCodeScreen } from './Main/qrCodeScreen';
import { CompanyProfile } from './Main/CompanyProfile';
import { StatusBar } from 'react-native';
import { EditScreen } from './Profile/EditScreen';
import { Scan } from './Profile/Scan';

const Stack = createNativeStackNavigator();

export default function App() {
  console.log('11111111')
  return (
    <View style={{ flex: 1, paddingTop: 0, backgroundColor: 'black' }}>
      <StatusBar style={{ color: 'black' }} barStyle="dark-content" backgroundColor="black" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CodeScreen" component={CodeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CouponScreen" component={TabBar} options={{ headerShown: false }} />
          <Stack.Screen name="CouponDetailScreen" component={CouponDetailScreen} options={{
            title: 'MyCoupon',
            headerTitleStyle: { color: '#0EA47A' }, headerTintColor: '#0EA47A', headerStyle: { backgroundColor: 'black' }
          }} />
          <Stack.Screen name="QrCodeScreen" component={QrCodeScreen} options={{
            title: 'QR code',
            headerTitleStyle: { color: '#0EA47A' }, headerTintColor: '#0EA47A', headerStyle: { backgroundColor: 'black' }
          }} />
          <Stack.Screen name="CompanyScreen" component={TabBar} options={{ headerShown: false }} />
          <Stack.Screen name="CompanyProfile" component={CompanyProfile} options={{
            title: '', headerTintColor: '#0EA47A',
            headerStyle: { backgroundColor: 'black' }
          }} />
          <Stack.Screen name="Profile" component={TabBar} options={{ headerShown: false }} />
          <Stack.Screen name="EditScreen" component={EditScreen} options= {{ title: 'Редактировать', headerTintColor: '#0EA47A',
            headerStyle: { backgroundColor: 'black' }}} />
            <Stack.Screen name="Scan" component={Scan} options= {{ title: 'Сканировать ', headerTintColor: '#0EA47A',
            headerStyle: { backgroundColor: 'black' }}} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};