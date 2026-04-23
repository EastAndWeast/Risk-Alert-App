/**
 * AppNavigator — 根导航
 * 未登录 → LoginScreen
 * 已登录 → TabNavigator（底栏四 Tab）
 */
import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import LoginScreen from '../screens/LoginScreen';
import AlertDetailScreen from '../screens/AlertDetailScreen';
import AccountProfileScreen from '../screens/AccountProfileScreen';
import SecurityScreen from '../screens/SecurityScreen';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  AlertDetail: {alertId: string};
  AccountProfile: {accountId: string};
  Security: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isLoggedIn ? (
        <Stack.Screen name="Login">
          {props => (
            <LoginScreen {...props} onLoginSuccess={() => setIsLoggedIn(true)} />
          )}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen
            name="AlertDetail"
            component={AlertDetailScreen}
            options={{
              headerShown: true,
              headerTitle: 'Alert Details',
              headerBackTitle: 'Inbox',
            }}
          />
          <Stack.Screen
            name="AccountProfile"
            component={AccountProfileScreen}
            options={{
              headerShown: true,
              headerTitle: 'Account Profile',
              headerBackTitle: 'Accounts',
            }}
          />
          <Stack.Screen
            name="Security"
            component={SecurityScreen}
            options={{
              headerShown: true,
              headerTitle: 'Security & Devices',
              headerBackTitle: 'Settings',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
