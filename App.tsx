/**
 * Risk Alert RN — 主入口
 * 统一处理：主题 Context、i18n 初始化、Firebase 推送初始化
 */
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {ThemeProvider, useTheme} from './src/theme/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import {initI18n} from './src/i18n';
import {PushService} from './src/services/PushService';

// 初始化 i18n（同步执行，避免首帧闪烁）
initI18n();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 2,
    },
  },
});

function AppContent(): React.JSX.Element {
  const {theme, colors} = useTheme();

  useEffect(() => {
    // 初始化推送通道（Android Notification Channel + iOS 权限请求）
    PushService.init();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.appBg}
      />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
