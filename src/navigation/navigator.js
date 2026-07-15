import { LoginScreen } from '../screens/Login/main';
import { Registration } from '../screens/Registration/main';
import { CodeScreen } from '../screens/Pin/main';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateUserScreen } from '../screens/CreateUser/main'
import { TabBar } from './tabBar';
import { CouponDetailScreen } from '../screens/Promotion/main';
import { QrCodeScreen } from '../screens/QrCode/main';
import { CompanyProfile } from '../screens/BusinessPoint/main'
import { EditScreen } from '../screens/EditUser/main';
import { OnboardingScreen } from '../screens/Onboarding/main';
import { ContactUs } from '../screens/ContactUs/main';
import { ForBusiness } from '../screens/ForBusiness/main';
import { Region } from '../screens/Region/main';
import { BusinessPointOnMap } from '../screens/BusinessPointOnMap/main';
import { NewCard } from '../screens/BonusCard/components/NewCard';
import { BonusCardView } from '../screens/BonusCard/components/BonusCardView';
import { COLORS } from '../services/constants'

const Stack = createNativeStackNavigator();

const navigationTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: COLORS.black,
        card: COLORS.black,
    },
};

export const Navigator = () => {
  return (
    <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: COLORS.black } }}>
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
                    headerTintColor: COLORS.white,
                    headerStyle: { backgroundColor: 'black' },
                    headerBackTitleVisible: false,
                    animation: 'none'
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
                name="BonusCard"
                component={TabBar}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CouponDetailScreen"
                component={CouponDetailScreen}
                 options={({ route }) => {  
                    return { 
                        title: 'Твой купон',
                        headerTintColor: COLORS.white,
                        headerStyle: { backgroundColor: 'black' },
                        headerBackTitleVisible: false,
                        animation: 'none',
                    }
                }}               
            />
            <Stack.Screen
                name="QrCodeScreen"
                component={QrCodeScreen}
                options={{
                    title: 'QR code',
                    headerTintColor: COLORS.white,
                    headerStyle: { backgroundColor: 'black' },
                    headerBackTitleVisible: false,
                    animation: 'none',
                }}
            />
            <Stack.Screen
                name="NewCard"
                component={NewCard}
                options={{
                    title: 'Добавьте новую карту',
                    headerTintColor: COLORS.white,
                    headerStyle: { backgroundColor: 'black' },
                    headerBackTitleVisible: false,
                    animation: 'none',
                }}
            />
            <Stack.Screen
                name="BonusCardView"
                component={BonusCardView}
                options={({ route }) => ({
                    title: route.params.name || 'Бонусная карта',
                    headerTintColor: COLORS.white,
                    headerStyle: { backgroundColor: 'black' },
                    headerBackTitleVisible: false,
                    animation: 'none',
                })}
            />
            <Stack.Screen
                name="CompanyScreen"
                component={TabBar}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CompanyProfile"
                component={CompanyProfile}
                options={({ route }) => {  
                    return { 
                        title:'Профиль компании',
                        headerTintColor: COLORS.white,
                        headerStyle: { backgroundColor: 'black' },
                        headerBackTitleVisible: false,
                        animation: 'none',
                    }
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
                    headerTintColor: COLORS.white,
                    headerStyle: { backgroundColor: 'black' },
                    headerBackTitleVisible: false,
                    animation: 'none',
                }}
            />
            <Stack.Screen
                name="ContactUs"
                component={ContactUs}
                options={{
                    title: 'Контакты',
                    headerTintColor: COLORS.white,
                    headerStyle: { backgroundColor: 'black' },
                    headerBackTitleVisible: false,
                    animation: 'none',
                }}
            />
            <Stack.Screen
                name="ForBusiness"
                component={ForBusiness}
                options={{
                    title: 'Для бизнеса',
                    headerTintColor: COLORS.white,
                    headerStyle: { backgroundColor: 'black' },
                    headerBackTitleVisible: false,
                    animation: 'none',
                }}
            />
            <Stack.Screen
                name="Region"
                component={Region}
                options={{
                    title: 'Выберите регион',
                    headerTintColor: COLORS.white,
                    headerStyle: { backgroundColor: 'black' },
                    headerBackTitleVisible: false,
                    animation: 'none',
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
};