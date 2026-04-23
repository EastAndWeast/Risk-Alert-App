/**
 * GlassCard — 核心玻璃拟态卡片组件
 * 复刻 Web 版 .alert-card / .account-card 的视觉效果
 */
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {useTheme} from '../theme/ThemeContext';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  leftAccentColor?: string; // 复刻 unread 卡片左侧蓝色竖线
  dimmed?: boolean;          // 复刻 .alert-card.read 的低透明度效果
}

export default function GlassCard({
  children,
  style,
  leftAccentColor,
  dimmed = false,
}: GlassCardProps) {
  const {colors} = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: dimmed ? 'transparent' : colors.cardBg,
          borderColor: colors.borderColor,
          borderRadius: colors.borderRadius,
          borderLeftColor: leftAccentColor ?? colors.borderColor,
          borderLeftWidth: leftAccentColor ? 3 : 1,
          opacity: dimmed ? 0.5 : 1,
          shadowColor: '#000',
        },
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
});
