import { LoginScreen } from '../screens/Login/main';
import { Registration } from '../screens/Registration/main';
import { CodeScreen } from '../screens/Pin/main';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateUserScreen } from '../screens/CreateUser/main'
import { TabBar } from './tabBar';
import { CouponDetailScreen } from '../screens/Promotion/main';
import { QrCodeScreen } from '../screens/QrCode/main';
import { CompanyProfile } from '../screens/BusinessPoint/main'
import { EditScreen } from '../screens/EditUser/main';
import { OnboardingScreen } from '../screens/Onboarding/main';
import { ContactUs } from '../screens/ContactUs/main'

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="OnboardingScreen"
                component={OnboardingScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Registration"
                component={Registration}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CodeScreen"
                component={CodeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CreateUserScreen"
                component={CreateUserScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CouponScreen"
                component={TabBar}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CouponDetailScreen"
                component={CouponDetailScreen}
                options={{
                    title: 'MyCoupon',
                    headerTitleStyle: { color: '#0EA47A' },
                    headerTintColor: '#0EA47A',
                    headerStyle: { backgroundColor: 'black' }
                }}
            />
            <Stack.Screen
                name="QrCodeScreen"
                component={QrCodeScreen}
                options={{
                    title: 'QR code',
                    headerTitleStyle: { color: '#0EA47A' },
                    headerTintColor: '#0EA47A',
                    headerStyle: { backgroundColor: 'black' }
                }}
            />
            <Stack.Screen
                name="CompanyScreen"
                component={TabBar}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CompanyProfile"
                component={CompanyProfile}
                options={{
                    title: '',
                    headerTintColor: '#0EA47A',
                    headerStyle: { backgroundColor: 'black' }
                }}
            />
            <Stack.Screen
                name="Profile"
                component={TabBar}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditScreen"
                component={EditScreen}
                options={{
                    title: 'Редактировать',
                    headerTintColor: '#0EA47A',
                    headerStyle: { backgroundColor: 'black' }
                }}
            />
            <Stack.Screen
                name="ContactUs"
                component={ContactUs}
                options={{
                    title: 'Контакты',
                    headerTintColor: '#0EA47A',
                    headerStyle: { backgroundColor: 'black' }
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
};