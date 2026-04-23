/**
 * TabNavigator — 底栏四 Tab
 * 复刻 Web 版的底部导航：Inbox / Stats / Accounts / Settings
 */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';

import InboxScreen from '../screens/InboxScreen';
import StatsScreen from '../screens/StatsScreen';
import AccountsScreen from '../screens/AccountsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {useTheme} from '../theme/ThemeContext';

// Lucide 图标（原生 SVG 渲染）
import {Inbox, PieChart, Users, Settings} from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primaryColor,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.glNavBg,
          borderTopColor: colors.borderColor,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 72,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarIcon: ({color, size}) => {
          const iconProps = {color, size: size ?? 22, strokeWidth: 2};
          switch (route.name) {
            case 'Inbox':
              return <Inbox {...iconProps} />;
            case 'Stats':
              return <PieChart {...iconProps} />;
            case 'Accounts':
              return <Users {...iconProps} />;
            case 'Settings':
              return <Settings {...iconProps} />;
          }
        },
      })}>
      <Tab.Screen
        name="Inbox"
        component={InboxScreen}
        options={{tabBarLabel: t('nav_inbox')}}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{tabBarLabel: t('nav_stats')}}
      />
      <Tab.Screen
        name="Accounts"
        component={AccountsScreen}
        options={{tabBarLabel: t('nav_accounts')}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{tabBarLabel: t('nav_settings')}}
      />
    </Tab.Navigator>
  );
}
