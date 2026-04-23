/**
 * 主题颜色系统 — 完全对应 Web 版 app.css 的 CSS 变量
 * Light Mode: Vercel/Stripe Minimalist
 * Dark Mode:  Liquid Glass Luxury
 */

export interface ColorTheme {
  // 背景
  appBg: string;
  bgColor: string;
  cardBg: string;
  containerBg: string;

  // 文字
  textMain: string;
  textMuted: string;

  // 边框 & 分割
  borderColor: string;

  // 品牌色
  primaryColor: string;
  primaryHover: string;
  ctaColor: string;

  // 语义色
  dangerColor: string;
  dangerLight: string;
  successColor: string;
  warningColor: string;
  infoColor: string;

  // 导航 / Header 毛玻璃背景
  glHeaderBg: string;
  glNavBg: string;
  glSheetBg: string;
  glInputBg: string;

  // 圆角
  borderRadius: number;
}

export const lightColors: ColorTheme = {
  appBg: '#f4f4f5',
  bgColor: '#fafafa',
  cardBg: 'rgba(255, 255, 255, 0.95)',
  containerBg: '#fafafa',

  textMain: '#09090b',
  textMuted: '#71717a',

  borderColor: '#e4e4e7',

  primaryColor: '#2563eb',
  primaryHover: '#1d4ed8',
  ctaColor: '#09090b',

  dangerColor: '#ef4444',
  dangerLight: '#fef2f2',
  successColor: '#10b981',
  warningColor: '#f59e0b',
  infoColor: '#0ea5e9',

  glHeaderBg: 'rgba(255, 255, 255, 0.85)',
  glNavBg: 'rgba(255, 255, 255, 0.85)',
  glSheetBg: 'rgba(255, 255, 255, 0.96)',
  glInputBg: 'transparent',

  borderRadius: 12,
};

export const darkColors: ColorTheme = {
  appBg: '#0a0a0f',
  bgColor: '#0F172A',
  cardBg: 'rgba(255, 255, 255, 0.03)',
  containerBg: '#0F172A',

  textMain: '#F8FAFC',
  textMuted: '#94A3B8',

  borderColor: 'rgba(255, 255, 255, 0.08)',

  primaryColor: '#F59E0B',
  primaryHover: '#FBBF24',
  ctaColor: '#8B5CF6',

  dangerColor: '#ef4444',
  dangerLight: 'rgba(245, 158, 11, 0.15)',
  successColor: '#10b981',
  warningColor: '#F59E0B',
  infoColor: '#0ea5e9',

  glHeaderBg: 'rgba(15, 23, 42, 0.6)',
  glNavBg: 'rgba(15, 23, 42, 0.75)',
  glSheetBg: 'rgba(15, 23, 42, 0.85)',
  glInputBg: 'rgba(255, 255, 255, 0.05)',

  borderRadius: 16,
};
