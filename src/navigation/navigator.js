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
import { ContactUs } from '../screens/ContactUs/main';
import { Region } from '../screens/Region/main';
import { BusinessPointOnMap } from '../screens/BusinessPointOnMap/main';

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
                name="BusinessPointOnMap"
                component={BusinessPointOnMap}
                options={({ route }) => ({
                    title: route.params.name,
                    headerTintColor: '#0EA47A',
                    headerStyle: { backgroundColor: 'black' }
                })}
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
                    title: 'Акция',
                    headerTintColor: '#0EA47A',
                    headerStyle: { backgroundColor: 'black' }
                }}
            />
            <Stack.Screen
                name="QrCodeScreen"
                component={QrCodeScreen}
                options={{
                    title: 'QR code',
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
                    title: 'Профиль',
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
            <Stack.Screen
                name="Region"
                component={Region}
                options={{
                    title: 'Выберите ваш регион',
                    headerTintColor: '#0EA47A',
                    headerStyle: { backgroundColor: 'black' }
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
};