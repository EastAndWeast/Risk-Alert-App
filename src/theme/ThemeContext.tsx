/**
 * 全局主题 Context
 * 持久化用户偏好到 AsyncStorage（对应 Web 版 localStorage）
 */
import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useColorScheme} from 'react-native';
import {ColorTheme, darkColors, lightColors} from './colors';

type ThemeType = 'light' | 'dark';

interface ThemeContextValue {
  theme: ThemeType;
  colors: ColorTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  colors: lightColors,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const systemTheme = useColorScheme() as ThemeType;
  const [theme, setTheme] = useState<ThemeType>('light');

  useEffect(() => {
    AsyncStorage.getItem('appTheme').then(saved => {
      if (saved === 'dark' || saved === 'light') {
        setTheme(saved);
      } else {
        setTheme(systemTheme || 'light');
      }
    });
  }, [systemTheme]);

  const toggleTheme = () => {
    const next: ThemeType = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    AsyncStorage.setItem('appTheme', next);
  };

  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{theme, colors, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
