/**
 * i18n 初始化 — 基于 react-i18next
 * 从 AsyncStorage 读取用户上次选择的语言
 */
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './en.json';
import zh from './zh.json';

export const LANGUAGES = {en: 'English', zh: '简体中文'};

export function initI18n() {
  // 同步读取（首次无法异步，用默认值）
  const savedLang =
    (AsyncStorage.getItem as any)._hasItem?.('appLang') ? 'en' : 'en';

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: savedLang,
    fallbackLng: 'en',
    resources: {
      en: {translation: en},
      zh: {translation: zh},
    },
    interpolation: {escapeValue: false},
  });

  // 异步修正：从 AsyncStorage 获取实际语言并切换
  AsyncStorage.getItem('appLang').then(lang => {
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  });
}

export async function switchLanguage(lang: 'en' | 'zh') {
  await AsyncStorage.setItem('appLang', lang);
  await i18n.changeLanguage(lang);
}

export default i18n;
